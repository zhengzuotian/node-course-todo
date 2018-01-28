var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo(req.body);

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/', (req, res) => {
  res.status(200).send('Welcome');
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send(todos);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)){
    return res.status(404).send(id + ' not valid');
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send(id + ' not found');
    }

    res.status(200).send(todo);
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log('Started on port', port);
});

module.exports = {app};
