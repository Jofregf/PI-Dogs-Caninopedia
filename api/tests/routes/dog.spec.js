/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
        "id": "1ed796af-065a-4c83-9690-6daaeeb76121",
        "name": "Cachi",
        "height_min": 20,
        "height_max": 25,
        "weight_min": 15,
        "weight_max": 18,
        "life_span_min": 10,
        "life_span_max": 15,
        "image": "https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/6124cf315cafe8c3101f8bab/perro-slide_0.jpg",
        "temperament": [
            "Adventurous",
            "Happy"
        ]
};
const dog2 = {
  "name": "Cachi",
  "height_min": 20,
  "height_max": 25,
  "weight_min": 15,
  "weight_max": 18,
  "life_span_min": 10,
  "life_span_max": 15,
  "image": "https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/6124cf315cafe8c3101f8bab/perro-slide_0.jpg",
  "temperament": [
      "Adventurous",
      "Happy"
  ]
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs:id', () => {
    it('should get 200', () =>
      agent.get('/dogs/1ed796af-065a-4c83-9690-6daaeeb76121').expect(200).timeout(1000)
    );
  });
  describe('GET /temperament', () => {
    it('should get 200', () =>
      agent.get('/temperament').expect(200).timeout(10000)
    );
  });
  describe('POST /dogs:id', () => {
    it('should get 200', () => 
      agent.post('/dog').send(dog2).expect(200).timeout(1000)
    );
  });
});
