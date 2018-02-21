const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'my@example.com',
  password: 'useronepass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]},{
    _id: userTwoId,
    email: 'my2@example.com',
    password: 'usertwopass'
}];

const todos = [{
  text: 'First text todo 1',
  _id: new ObjectID(),
  _creator: userOneId
},{
  text: 'Second test todo 2',
  _id: new ObjectID(),
  completed: true,
  completedAt: new Date(),
  _creator: userTwoId
}];

// const populateTodos = (done) => {
//   Todo.remove({}).then(() => {
//     return Todo.insertMany(todos);
//   }).then(() => done());
// }

const populateTodos = (done) => {
  console.log(new Date());
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
    console.log(new Date());
  }).then(() => {
    console.log(new Date());
    done();
  });
};


// const populateUsers = (done) => {
//   User.remove({}).then(() => {
//     var userOne = new User(users[0]).save();
//     var userTwo = new User(users[1]).save();
//     return Promise.all([userOne, userTwo]);
//   }).then(() => done());
// }

const populateUsers = (done) => {
  console.log(new Date());
  Todo.remove({}).then(() => {
    Todo.insertMany(users);
    console.log(new Date());
  }).then(() => {
    console.log(new Date());
    done();
  });
};

module.exports = {todos, populateTodos, users, populateUsers}
