const {sequelize} = require("../../config/mysql");
const {DataTypes} = require("sequelize");
const Storage = require("./storage") //referencia al archivo storage de mysql


const Almacen = sequelize.define(
    "almacens",
    {   
       objeto:{
            type:DataTypes.STRING,
            allowNull: false,
        }, 
        cantidad: {
            type: DataTypes.NUMBER,
        },
        descripcion:{
            type: DataTypes.STRING,
        },
        objeto_id:{
            type:DataTypes.STRING,
        }
    },
    {
        timestamps: true,
    }

); //define un modelo


/*
* Implementando el modelo personalizado para que se reconozca la lógica de mysql y nosql
*/

Almacen.findAllData = function() {
    Almacen.belongsTo(Storage,{
        foreignKey:'objetoId',
        as: 'picture' //para que se le asigne el alias de picture a los valores que devuelve
    });

    return Almacen.findAll({include: 'picture'}); //es un método nativo de sequalize para que incluya toda la relacion que tiene con el storage y lo busque
}

//Para busqueda singular

Almacen.findOneData = function(id) {
    Almacen.belongsTo(Storage,{
        foreignKey:'objetoId',
        as: 'picture' 
    });

    return Almacen.findOne({where: {id}, include: 'picture'}); 
}

module.exports = Almacen;