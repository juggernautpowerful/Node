const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const db = require('./repository.js');
const psw = require('../libs/password');

let login = '';
let hash = '';
let salt = '';
let password = {};

rl.question('Login: ', answer => {
  login = answer;
  rl.question('Password: ', answer => {
    password = psw.setPassword(answer);
    hash = password.hash;
    salt = password.salt;
    console.log({email:login, hash:hash, salt:salt})
    rl.close();
  });
});

rl.on('close', () => {
  db.saveUser( {email:login, hash:hash, salt:salt} );
});