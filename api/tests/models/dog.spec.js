const { Dog, Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' })
        .then(() => done('should not have been created'))
        .catch(() => done());
      });
      it('should not be created without a required fields completed', function (done) {
        Dog.create ({
          height_min: 'PESO',
        })
        .then(() => done('should not have been created'))
        .catch(() => done());
      });
    });
  });
});

describe('Temperament model', () => {
  beforeEach(async function() {
    await Temperament.sync({force : true});
  });
  it('should not be created without a required fields complete', function (done) {
    Temperament.create({id:'22'})
    .then(() => done('should not have been created'))
    .catch(() => done());
  });
  it('Error without name', function (done) {
    Temperament.create({description:'Feliz'})
    .then(() => done('should not have been created'))
    .catch(() => done());
  })
});