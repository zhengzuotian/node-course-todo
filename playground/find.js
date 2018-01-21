// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const mydb = db.db('ToDoApp');
  //console.log(mydb);

  // mydb.collection('Todos').find({_id: new ObjectID('5a650c1f7edd4d188c150c15')}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });


  mydb.collection('Users').find({name: 'Simon'}).count().then((count) => {
    console.log(`count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch data', err);
  });


  // mydb.collection('Todos').insertOne({
  //   text: 'Walk the dog',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo');
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });


  // mydb.collection('Users').insertOne({
  //   name: 'Simon',
  //   age: 33,
  //   location: 'Laval'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert users', err);
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // });

  //db.close();
});
