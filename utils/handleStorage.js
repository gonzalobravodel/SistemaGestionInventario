const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage);
    },
    filename: function (req, file, cb){
        //TODO: mi-objeto.png 
        const ext = file.originalname.split(".").pop(); //TODO ["mi-objeto","png"] puede haber varios puntos, pero la extension siempre es el ultimo valor
        const filename = `file-${Date.now()}.${ext}`; //Devuelve la fecha solo con los numeros
        cb(null,filename);
    },
});
//


//
const uploadMiddleware = multer({storage});
//
module.exports = uploadMiddleware;