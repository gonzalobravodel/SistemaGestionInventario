const mongoose = require("mongoose");
require("dotenv").config(); //para que use las variables de entorno

const dbConnectNoSql = async () => {
    try {
        const DB_URI = process.env.DB_URI;
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error('*** ERROR DE CONEXIÓN ***', error);
    }
};

module.exports = dbConnectNoSql; //exportamos solamente el módulo dbConnect