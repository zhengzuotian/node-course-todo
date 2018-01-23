// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const mydb = db.db('ToDoApp');

  // deleteMany

  // mydb.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete data', err);
  // });

  // deleteOne
  // mydb.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete data', err);
  // });

  // findOneAndDelete
  // mydb.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete data', err);
  // });

  mydb.collection('Users').findOneAndDelete({_id: new ObjectID('5a63ffddb09a062ad8f9cc49')}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete data', err);
  });

  //db.close();
});
