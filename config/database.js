<<<<<<< HEAD
const mongoose =require("mongoose");
const dbConnection =()=>{
    mongoose
    .connect(process.env.DB_URI)
    .then((conn)=>{
        console.log(`Database Connected: ${conn.connection.host}`);
    })
    .catch((err)=>{
        console.log(`Database Error: ${err}`);
        process.exit(1);
    })
};
module.exports =dbConnection;
=======
const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
        console.log(`Datebase Connected Sucessfully`);
    })
    .catch((err) => {
        console.log(`Database Error ${err}`);
        process.exit(1);
    })
};

module.exports = dbConnection;
>>>>>>> d0c141c8d225d3fef45d5b85350d26a93912523d
