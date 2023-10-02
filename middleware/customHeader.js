require("dotenv").config(); //para que use las variables de entorno

const customHeader = (req, res, next) => {
  try {
      const apiKey = req.headers.api_key;
      if (apiKey.replace("Bearer ","") === process.env.API_KEY) {
          return next(); // Usar return para detener la ejecución del middleware
      } else {
          res.status(403);
          res.send({ error: "API_KEY_NO_ES_CORRECTA" });
          console.log("key incorrecta")
      }
  } catch (error) {
      console.error("Error en customHeader:", error); // Registrar el error en la consola
      res.status(500).send({ error: "ALGO_OCURRIO_EN_EL_CUSTOM_HEADER" });
  }
};

module.exports = customHeader;
