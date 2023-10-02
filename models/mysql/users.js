const {sequelize} = require("../../config/mysql");
const {DataTypes} = require("sequelize");

const User = sequelize.define(
    "users",
    {   
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        }, 
        age: {
            type: DataTypes.NUMBER,
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
        },
        password:{
            type:DataTypes.STRING,
        },
        role:{
            type : DataTypes.ENUM(["user", "admin"]),
        },
    },
    {
        timestamps: true,
    }

); //define un modelo

User.find = User.findAll;
User.findById = User.findByPk;

module.exports = User;