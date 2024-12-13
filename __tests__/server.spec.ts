import app from '../src/server.js';
import request from 'supertest';

describe("Bateria de test de servidor", () => {

    test("Servidor en endpoint /", async () => {

        return await request(app)
            .get('/')
            .expect(200)
            .expect("Content-Type", /text/)
            .then(response => {
                expect(response.text).toBe("Hola mundo al usuario guret");
            });
    });

});