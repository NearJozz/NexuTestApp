// tests/routes.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { app, server }= require('../app.js');

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

});
 


