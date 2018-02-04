// npm i expect mocha nodemon supertest --save-dev
// npm run test-watch

const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');


// const todos = [{
//   text: 'First text todo 1',
//   _id: new ObjectID()
// },{
//   text: 'Second test todo 2',
//   _id: new ObjectID(),
//   completed: true,
//   completedAt: new Date()
// }];
//
// beforeEach((done) => {
//   console.log(new Date());
//   Todo.remove({}).then(() => {
//     Todo.insertMany(todos);
//     console.log(new Date());
//   }).then(() => {
//     console.log(new Date());
//     done();
//   });
// });

beforeEach(populateTodos);
beforeEach(populateUsers);



describe('POST /todos', () => {
  it('should not create todo with invalid body data 0', (done) => {
    var text = '  ';
    console.log('should not create todo with invalid body data 0-1', new Date());
    request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .end(done);
  });


  it('should not create todo with invalid body data', (done) => {
    var text = '  ';
    console.log('should not create todo with invalid body data 1', new Date());
    request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
          console.log('should not create todo with invalid body data 2', new Date());
        Todo.find({text}).then((todos) => {
          console.log('should not create todo with invalid body data 3', new Date());
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => {
          console.log(e);
        });
      });
  });

  it('should create a new todo', (done) => {
    var text = 'Test todo text';
    console.log('should create a new todo 1', new Date());
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        console.log('should create a new todo 2', new Date());
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log('should create a new todo 3', new Date());
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => {
          console.log(e);
        });
      });
  });

});


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    console.log('sshould get all todos 1', new Date());
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        console.log('sshould get all todos 2', new Date());
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
});


describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get('/todos/'+hexId)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});


describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      })
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if todo not valid', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });
});



describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var body = {
      completed: true,
      text: "test with supertest"
    };
    request(app)
      .patch(`/todos/${hexId}`)
      .send(body)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(body.text);
        expect(res.body.completed).toBe(body.completed);
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();
    var body = {
      completed: false,
      text: "test to set not completed"
    };
    request(app)
      .patch(`/todos/${hexId}`)
      .send(body)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(body.text);
        expect(res.body.completedAt).toNotExist();
      })
      .end(done);
  });
});


describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString())
        expect(res.body.email).toBe(users[0].email)
      })
      .end(done);
  })

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .end(done);
  })
});


describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'dsdsdsfs@exmple.com'
    var password = 'df2323!';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          done(err);
        }
        done();
      });
  });

  it('should return validation error if request invalid', (done) => {
    var email = 'dsdsdsfs@exmple.com'
    var password = 'df3!';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end((err) => {
        if (err) {
          done(err);
        }
        done();
      });
  });

  it('should not create user if email in use', (done) => {
    var email = users[0].email;
    var password = 'df23de23!';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
