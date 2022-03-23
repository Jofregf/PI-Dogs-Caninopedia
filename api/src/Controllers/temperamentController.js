const axios = require('axios');
const {Temperament} = require ('../db')
const {API_KEY} = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
const {getAllInfo} = require('./dogController')

//! Obtencion de los temperamentos
const getTemperament = async (req, res, next) => {
    const allData = (await axios.get(URL)).data;
    try {
        let everyTemperament = allData.map((breed) => breed.temperament ? breed.temperament : "No info").map((dog) => dog?.split(', '));
        // console.log(everyTemperament)
        let eachTemperament = [...new Set(everyTemperament.flat())];
        // console.log(eachTemperament)
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

//! Filtro de razas por temperamentos
const getBreedByTemperament = async (req, res) => {
    const dato = req.query.temperament;
    const temperament = dato.charAt(0).toUpperCase() + dato.slice(1);
    // console.log(temperament, 'buscoxtemperamento')
    const allBreeds = await getAllInfo();
    const breedSearch = allBreeds.filter((breed) => {
        if (temperament === 'All') {
            //console.log(temperament, allBreeds, 'Controler')
            return allBreeds;
        }else if (breed.temperament) {
            
            return (breed.temperament).includes(temperament)
        };
    });
    //console.log(breedSearch)
    res.status(200).json(breedSearch)
};

// const getOrigen = async (req, res, next) => {
//     const allData = (await axios.get(URL)).data
//     try {
//         const everyOrigen = allData.map((dog) => {
//             if(!dog.origin) {
//                 return 'no dato'
//             } else {
//                 return dog.origin
//             }
//         })
//         const eachOrigin = [...new Set(everyOrigen.flat())]
//         //console.log(eachOrigin)
//         const result = eachOrigin.join().split(',').map((elem) => elem.trim())
//         return res.status(200).json(result.sort())
//     } catch (error) {
//         next(error);
//     }
// }

// const filterOrigen = async (req, res, next) => {
//     const {origen} = req.query
//     //console.log(origen)
//     try {
//         const allData = await getAllInfo();
//         const filter = allData.filter((dog) => {
//             if(origen === 'all') {
//                 return allData;
//             } else if(dog.origen.length > 0) {
//                 console.log(dog.origen, 'aca')
//                 return (dog.origen).includes(origen)
//             }
//         })
//         console.log(filter, 'soy')
//         res.status(200).json(filter)
//     } catch (error) {
//         next(error)
//     }
// }
module.exports = {
    getTemperament,
    getBreedByTemperament,
    // getOrigen,
    // filterOrigen,
}