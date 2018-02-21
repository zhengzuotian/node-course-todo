const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//   console.log(result);
// });


Todo.findByIdAndRemove('5a6d23af8a4a2c516bd8265f').then((todo) => {
  console.log(todo);
});
