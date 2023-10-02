const request = require("supertest");
const app = require("../app");
const { sequelize, dbConnectMySql  } = require("../config/mysql"); 
const dbConnectNoSql = require('../config/mongo')
const { tokenSign } = require("../utils/handleJwt");
const { almacenModel, storageModel, usersModel } = require("../models"); // Asumiendo que almacenModel es un modelo de MongoDB
require("dotenv").config(); //para que use las variables de entorno

let STORAGE_ID = "";
let JWT_TOKEN = "";

beforeAll(async () => {
  dbConnectMySql();
  dbConnectNoSql();
  await sequelize.query("DELETE FROM users", { raw: true });
  await sequelize.query("DELETE FROM storages", { raw: true });

  // Eliminar todos los documentos de la colección almacen en MongoDB
  await almacenModel.deleteMany({});

  // Crear un usuario en MySQL usando el método 'create'
  const userToInsert = {
      "name": "User test",
      "age": 20,
      "email": "test@test.com",
      "role": "admin",
      "password": "test123"
  };

  const insertedUser = await usersModel.create(userToInsert);

  // Crear un elemento de almacenamiento en MySQL usando el método 'create'
  const storageToInsert = {
      "url": "http://localhost:2001/file-test.jpg",
      "filename": "file-test.jpg"
  };

  await storageModel.create(storageToInsert);

  // Crear un elemento de almacenamiento en MongoDB
  const storage = await almacenModel.create(storageToInsert);
  STORAGE_ID = storage._id.toString();

  // Obtener el usuario de MySQL para crear un token JWT
  const user = await usersModel.findOne({ where: { email: "test@test.com" } });


  JWT_TOKEN = await tokenSign(user);

});




describe("[ALMACEN] esta es la prueba de /api/almacen", () => {

  test("should register a medicine with error handling", async () => {
      const res = await request(app)
        .post("/api/almacen")
        .set("Authorization", `Bearer ${JWT_TOKEN}`)
        .set("api_key", `${process.env.API_KEY}`)
        .send(
          {
            "objeto": "Aspirina",
            "cantidad": 150,
            "propiedades": {
              "tipo": "Analgésico",
              "receta": false,
            },
            "descripcion": "Analgésico, antipirético y antiinflamatorio utilizado para aliviar el dolor y reducir la fiebre.",
            "objetoId": `${STORAGE_ID}`
          }
        );
        const { body } = res;

        expect(res.statusCode).toEqual(201);
        expect(body).toHaveProperty("data");
        expect(body.data).toHaveProperty("objeto");
        expect(body.data).toHaveProperty("propiedades");
        expect(body.data).toHaveProperty("descripcion");
  });

  // Las pruebas relacionadas con usersModel y storageModel utilizan consultas SQL
  test("should return all medicines", async () => {
    const res = await request(app)
    .get("/api/almacen")
    .set("Authorization", `Bearer ${JWT_TOKEN}`)
    .set("api_key", process.env.API_KEY)
    const { body } = res;

    expect(res.statusCode).toEqual(200);
    expect(body).toHaveProperty("data");
  });

  test("should return a medicine", async () => {
    const { _id } = await almacenModel.findOne({});
    id = _id.toString();

    const res = await request(app)
    .get(`/api/almacen/?id=${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`)
    .set("api_key", process.env.API_KEY)
    const { body} = res;

    expect(res.statusCode).toEqual(200);
    expect(body).toHaveProperty("data");
  });

  test("should delete a medicine", async () => {
    
    const { _id } = await almacenModel.findOne({});
    id = _id.toString();

    const res = await request(app)
    .delete(`/api/almacen/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`)
    .set("api_key", process.env.API_KEY)
    const { body } = res;

    expect(res.statusCode).toEqual(200);
    expect(body).toHaveProperty("data");

  });

});
