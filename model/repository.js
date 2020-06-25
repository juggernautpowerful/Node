const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('model/db.json');
const db = low(adapter);

db.defaults({ products: [], user: {email:"", hash:"", salt:""}, skills: {} }).write();

const getUser = () => db.getState().user;
const getProducts = () => db.getState().products;
const getSkills = () => db.getState().skills;
const addProducts = ({src ,name, price }) =>
  db
    .get("products")
    .push({ 
      src,
      name,
      price,
     
    })
    .write();

    const saveUser = ({ email, hash, salt }) =>{
        console.log({ email, hash, salt })
    db.set("user", { email, hash, salt }).write();}
  const saveSkills = ({ age, concerts, cities, years }) =>
    db.set("skills", { age, concerts, cities, years }).write();
  
  module.exports = {
    getUser,
    getProducts,
    addProducts,
    saveUser,
    getSkills,
    saveSkills
  };    