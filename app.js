require("dotenv").config(); //para que use las variables de entorno
const express = require("express") //para requerir la libreria express
const cors = require("cors") //para requerir la libreria cors
//const swaggerUi = require("swagger-ui-express");
//const openApiConfiguration = require("./docs/swagger");
const dbConnectNoSql = require('./config/mongo') //requiere el archivo mongo.js de config
const {dbConnectMySql} = require('./config/mysql');
const app = express() //nos ayudará a levantar el servicio web
//const ENGINE_DB = process.env.ENGINE_DB; //para especificar el motor de db

/*
* Se definen los usos para la app
*  Se indica que use cors
*  Se indica que use express con JSON
*  Se indica que los recursos públicos/estáticos se sacan de la carpeta storage
*/

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

/**
*Se define el puerto reservado para la app
*/
const port = process.env.PORT || 2000;
const NODE_ENV = process.env.NODE_ENV;

/**
* Definir ruta para la documentación
*/
//app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(openApiConfiguration));


/**
* Aquí se invocan las rutas
*/
app.use("/api", require("./routes")); //invoca a las rutas

if(NODE_ENV !== 'test'){
    app.listen(port);
};


dbConnectNoSql();
dbConnectMySql();

module.exports = app;