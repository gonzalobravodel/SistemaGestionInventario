const mongoose = require("mongoose")

const UserScheme = new mongoose.Schema(
    {
        name:{
            type:String,
        }, 
        age: {
            type: Number,
        },
        email:{
            type: String,
            unique: true,
        },
        password:{
            type:String,
            select: false //Para que no muestre la pw al hacer consultas del usuario
        },
        role:{
            type : String , default:"user",
        },
    },
    {
        timestamps: true, //TODO createdAt, updatedAt
        versionKey: false,
    }
);

module.exports = mongoose.model("users", UserScheme)