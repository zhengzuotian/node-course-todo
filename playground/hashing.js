const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log('salt', salt);
    console.log('hash', hash);
  })
});

var hashedPassword = '$2a$10$cYqceOv53Pwz3J7H5jw/ve7Gu311d6ZqPOEzlaAPcwt/bgy9lsGY.';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})

/*
var data = {
  id: 10
}

var token = jwt.sign(data, '123abc');
console.log(token);

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTUxNzM2NDkxM30.D5vRLxfzL2-klj2R2Pv3fxWNSB92CEjSnzPM9SP3s44';
var decoded = jwt.verify(token, '123abc');
console.log(decoded);
*/
/*

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(SHA256(message));
console.log('hash', hash);

var data = {
  id: 4
}

var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

console.log(JSON.stringify(data));

if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Do not trust!');
}
*/
