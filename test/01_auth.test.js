const request = require("supertest");
const app = require("../app");
const {usersModel} = require("../models");
const { sequelize, dbConnectMySql  } = require("../config/mysql");

beforeAll(async () => {
    dbConnectMySql();
    await sequelize.query("DELETE FROM users", { raw: true });
});

describe("[AUTH] esta es la prueba de /api/auth", () => {
    test("esto deberia de retornar 404 en el log in", async () =>{
        const response = await request(app)
        .get('/api/auth/login')
        .send(
            {
                "email": "prueba92@test.com",
                "password": "HolaPw;9)"
            }
        )

        expect(response.statusCode).toEqual(404)
    });
    
    test("esto deberia de retornar 200 en el register", async () => {
        const response = await request(app)
            .post('/api/auth/register') // Change to POST request for registration
            .send({
                "name": "Prueba Test",
                "age": 20,
                "password": "HolaPw;9)",
                "email": "pruebatesting@testing.com",
                "role": "admin"
            });

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("token");
        expect(response.body.data).toHaveProperty("user");
    });

    test("esto deberia de retornar 409 en el register", async () =>{
        const response = await request(app)
        .post('/api/auth/register')
        .send(
            {
                "name": "Pruega Test",
                "age": 20,
                "password": "HolaPw;9)",
                "email": "pruebatesting@testing.com",
                "role": "admin"
            }
        )

        expect(response.statusCode).toEqual(409)
    });
})
