const axios = require('axios');
const {Temperament} = require ('../db')
const {API_KEY} = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
const {getAllInfo} = require('./dogController')

const getTemperament = async (req, res, next) => {
    const allData = (await axios.get(URL)).data;
    try {
        let everyTemperament = allData.map((breed) => breed.temperament ? breed.temperament : "No info").map((dog) => dog?.split(', '));
        let eachTemperament = [...new Set(everyTemperament.flat())];
        eachTemperament.forEach((temp) => {
            if(temp) {
                Temperament.findOrCreate({
                    where: { name: temp}
                });
            };
        });
        eachTemperament = await Temperament.findAll();
        res.status(200).json(eachTemperament);
    } catch (error) {
        next(error);
    }
}

const getBreedByTemperament = async (req, res) => {
    const dato = req.query.temperament;
    const temperament = dato.charAt(0).toUpperCase() + dato.slice(1);
    const allBreeds = await getAllInfo();
    const breedSearch = allBreeds.filter((breed) => {
        if (temperament === 'All') {
            return allBreeds;
        }else if (breed.temperament) {
            
            return (breed.temperament).includes(temperament)
        };
    });
    res.status(200).json(breedSearch)
};

module.exports = {
    getTemperament,
    getBreedByTemperament,
    // getOrigen,
    // filterOrigen,
}