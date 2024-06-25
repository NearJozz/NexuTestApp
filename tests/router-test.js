// tests/routes.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { app, server }= require('../app.js'); // Asumiendo que tu archivo principal de la aplicación es server.js

require('dotenv').config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close()
});

describe('GET /brands', () => {
    it('should get all brands', async () => {
        const response = await request(app).get('/brands');
        console.log(response)
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
    });
});


describe('POST /brands/:id/models', () => {
    it('should create a new model for a specific brand', async () => {
        // Insertar una marca ficticia para probar la ruta
        let random=new Date().getTime()
        const Brand = mongoose.model('Brand');
        const brand = await Brand.findOne({});
        console.log(brand)
        const newModel = {
            name: 'Test Model'+random,
            average_price: 100000,
            brand_name: brand.name
        };

        const response = await request(app)
            .post(`/brands/${brand._id}/models`)
            .send(newModel);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newModel);
    });

    it('should return 400 if brand is not found', async () => {
        const response = await request(app)
            .post('/brands/invalid-id/models')
            .send({ name: 'Test Model', average_price: 100000, brand_name: 'Nonexistent Brand' });

        expect(response.status).toBe(400);
    });
/* 
    it('should return 400 if model name is not unique within the brand', async () => {
        // Insertar una marca ficticia para probar la ruta
        const Brand = mongoose.model('Brand');
        const brand = await Brand.create({ name: 'Test Brand' });

        // Insertar un modelo con el mismo nombre antes de la prueba
        const Model = mongoose.model('Model');
        await Model.create({ name: 'Existing Model', average_price: 200000, brand_name: brand.name });

        const duplicateModel = {
            name: 'Existing Model',
            average_price: 150000,
            brand_name: brand.name
        };

        const response = await request(app)
            .post(`/brands/${brand._id}/models`)
            .send(duplicateModel);

        expect(response.status).toBe(400);
    }); */
});
 
// Agregar más pruebas para las otras rutas como PUT y GET /models

