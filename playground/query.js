const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var todoId = '5a6949273b85e130e88d2570';
var userId = '5a67f67c4b663228a47d3599';

if (!ObjectID.isValid(todoId)) {
  return console.log('Tod ID not valid');
}

if (!ObjectID.isValid(userId)) {
  return console.log('User ID not valie');
}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });


Todo.findById(todoId).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
}).catch((e) => {
  console.log(e);
});


User.findById(userId).then((user) => {
  if (!user) {
    return console.log('User ID not found');
  }
  console.log('User by ID', user);
}).catch((e) => {
  console.log(e);
});

//mongoose.connection.close();
