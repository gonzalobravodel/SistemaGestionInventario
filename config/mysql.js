const { Sequelize } = require("sequelize");
require("dotenv").config(); //para que use las variables de entorno

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
//const port = process.env.SQL_PORT;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        dialect: "mysql",
        host,
    }    
);

const dbConnectMySql = async() =>{
    try{
          await sequelize.authenticate();
    }catch(e){
        console.log("Error connecting to MySql", e);
    }

};

module.exports = {sequelize, dbConnectMySql}