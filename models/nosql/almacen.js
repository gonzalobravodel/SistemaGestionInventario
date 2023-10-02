const mongoose = require("mongoose")


const AlmacenScheme = new mongoose.Schema(
    {
        objeto:{
            type:String,
        }, 
        cantidad: {
            type: Number,
        },
        propiedades: {
            tipo: {
                type:String,
            },
            receta: {
                type: Boolean,
            },
        },
        descripcion: {
            type : String,
        },
        objetoId: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps: true, //TODO createdAt, updatedAt
        versionKey: false
    }
);

/*
Implementar método propio con relación a storage
*/

AlmacenScheme.statics.findAllData = function() {
    const joinData = this.aggregate([ //TODO Almacen
        {
            $lookup: {
                from: "storages", //TODO Almacen --> storages
                localField: "objetoId", //TODO Almacen.objetoId
                foreignField: "_id", //TODO Almacen._id
                as: "elemento" //TODO Alias!
            },
        },{
            $unwind: "$elemento"
        }//para que la propiedad venga directamente dentro de un objeto y no en otra ventana
    ]);
    return joinData;
}


AlmacenScheme.statics.findOneData = function(id) {
    const joinData = this.aggregate([ //TODO Almacen
    {
        $match: {
            _id: mongoose.Types.ObjectId(id)
        } 
    },    
    {
            $lookup: {
                from: "storages", //TODO Almacen --> storages
                localField: "objetoId", //TODO Almacen.objetoId
                foreignField: "_id", //TODO Almacen._id
                as: "elemento" //TODO Alias!
            },
        },{
            $unwind: "$elemento"
        }//para que la propiedad venga directamente dentro de un objeto y no en otra ventana
        
    ]);
    return joinData;
}


module.exports = mongoose.model("almacen", AlmacenScheme)
