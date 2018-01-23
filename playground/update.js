// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const mydb = db.db('ToDoApp');


  // mydb.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a63fc0917179b0ec4c3dceb'
  // )}, {
  //   $set: {completed: true}
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete data', err);
  // });

  mydb.collection('Users').findOneAndUpdate({
    name:'Simon'
  }, {
    $inc: {
      age: 20
    },
    $set: {
      name: 'Jen'
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete data', err);
  });

  //db.close();
});
