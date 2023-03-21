const mongoose = require("mongoose");
const dbconnect = () => {
  //const uri = 'mongodb+srv://billal:bill@cluster0.yjbtjm4.mongodb.net/ecomdb?retryWrites=true&w=majority'
  const uri = "mongodb://localhost:27017/e-comdb";
  mongoose.connect(uri).then((conn) => {
    console.log(`DataBase Connected : ${conn.connection.host}`);
  });
};
module.exports = dbconnect;
