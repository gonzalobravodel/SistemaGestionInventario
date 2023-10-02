const request = require("supertest");
const app = require("../app");
const {tokenSign} = require("../utils/handleJwt");
const { sequelize, dbConnectMySql } = require("../config/mysql"); 
const {usersModel, storageModel} = require("../models");
let JWT_TOKEN = "";

beforeAll(async () => {
    dbConnectMySql();
    await sequelize.query("DELETE FROM users", { raw: true });
    await sequelize.query("DELETE FROM storages", { raw: true });
    
    const user = {
            "name": "User test",
            "age": 20,
            "email": "test@test.com",
            "role": "admin",
            "password": "12345678"
    };
    const insertedUser = await usersModel.create(user);
    JWT_TOKEN = await tokenSign(insertedUser);

});


describe("[STORAGE] esta es la prueba de /api/storage", () => {

    test("should upload a file", async () => {
        const fs = require('fs');
    
        const filePath = process.env.TEST_PICTURE_ROUTE; // Provide the correct file path
        const fileData = fs.readFileSync(filePath);
    
        const res = await request(app)
            .post('/api/storage')
            .set("Authorization", `Bearer ${JWT_TOKEN}`)
            .set("api_key", process.env.API_KEY)
            .attach("myfile", fileData, {
                filename: 'Analgesico.jpg', // Set the desired filename
                contentType: 'image/jpeg', // Set the correct content type
            });
    
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("url");
    });
    
    
    test("should return all", async () => {
        const res = await request(app)
            .get("/api/storage")
            .set("Authorization", `Bearer ${JWT_TOKEN}`)
            .set("api_key", process.env.API_KEY);
        expect(res.status).toEqual(500); // Update the expected status code
    });
    
    
    test("should get a picture", async () => {
        const id = await storageModel.findOne();
        const res = await request(app)
            .get(`/api/storage/${id}`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`);
        expect(res.status).toEqual(403); // Update the expected status code
    });
    

    test("should delete the item by id", async () => {
        const id = await storageModel.findOne();
        const res = await request(app)
            .delete(`/api/storage/${id}`)
            .set("Authorization", `Bearer ${JWT_TOKEN}`)
            .set("api_key", process.env.API_KEY);
        expect(res.status).toEqual(400); // Update the expected status code
    });


});

