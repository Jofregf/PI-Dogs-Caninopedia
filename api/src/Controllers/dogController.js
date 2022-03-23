const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

//! Traigo las razas desde la Api
// const getApi = async () => {
//   const apiUrl = await axios.get(URL);
//   const apiInfo = apiUrl.data.map((dog) => {
//     return {
//       id: dog.id,
//       name: dog.name,
//       temperament: [dog.temperament]
//         .join()
//         .split(",")
//         .map((temp) => temp.trim()),
//       weight_min: parseInt(dog.weight.metric.slice(0, 2).trim()),
//       weight_max: parseInt(dog.weight.metric.slice(4).trim()),
//       height_min: parseInt(dog.height.metric.slice(0, 2).trim()),
//       height_max: parseInt(dog.height.metric.slice(4).trim()),
//       life_span_min: parseInt(dog.life_span.slice(0, 2).trim()),
//       life_span_max: parseInt(dog.life_span.slice(4).trim()),
//       image: dog.image.url,
//       origen: [dog.origin].join().split(',').map((elem) => elem.trim()),
//       breed_group: dog.breed_group,
//     };
//   });
//   // console.log(apiInfo)
//   return apiInfo;
// };
const getApi = () => {
  return axios.get(URL)
  .then((response) => {
    const apiInfo = response.data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        temperament: [dog.temperament]
        .join()
        .split(",")
        .map((temp) => temp.trim()),
        weight_min: parseInt(dog.weight.metric.slice(0, 2).trim()),
        weight_max: parseInt(dog.weight.metric.slice(4).trim()),
        height_min: parseInt(dog.height.metric.slice(0, 2).trim()),
        height_max: parseInt(dog.height.metric.slice(4).trim()),
        life_span_min: parseInt(dog.life_span.slice(0, 2).trim()),
        life_span_max: parseInt(dog.life_span.slice(4).trim()),
        image: dog.image.url,
        origen: [dog.origin].join().split(',').map((elem) => elem.trim()),
        breed_group: dog.breed_group,
      }
    })
    return apiInfo
  })
  .catch((error) => {
    console.log(error)
  })
}

//! Traigo las razas desde la Base de Datos

const getDB = async () => {
  let breedsDB = await Dog.findAll({include: Temperament});
  let result = breedsDB.map (breed => {
    return {
      id: breed.id,
      name: breed.name,
      height_min: breed.height_min,
      height_max: breed.height_max,
      weight_min: breed.weight_min,
      weight_max: breed.weight_max,
      life_span_min: breed.life_span_min,
      life_span_max: breed.life_span_max,
      image: breed.image,
      temperament: breed.dataValues.temperaments.map(temp => temp.name).concat(),

    }
  })
  return result;
}

//! Concateno las razas de la base de datos con la Api
const getAllInfo = async () => {
  let breedsApi = await getApi();
  let breedsDB = await getDB();
  let totalInfo = breedsDB.concat(breedsApi);
  return totalInfo;
};

//! Traigo todas las razas o las buscadas por nombre(uso el otro endpoint)

const getAllBreeds = async (req, res, next) => {
  const { name } = req.query;
  //console.log('getallbreeds')
  try {
    if (name) {
      const nameBD = await Dog.findAll({
        where: {
          name: name,
        },
        include: {
          model: Temperament,
        },
      });
      // console.log(nameBD, 'nombre bd')

      if (nameBD.length !== 0) {
        const respDB = nameBD.map((resp) => {
          return {
            id: resp.id,
            name: resp.name,
            temperament: resp.temperaments.map(
              (temperament) => temperament.name
            ),
            weight_min: resp.weight_min,
            weight_max: resp.weight_max,
            height_min: resp.height_min,
            height_max: resp.height_max,
            life_span_min: resp.life_span_min,
            life_span_max: resp.life_span_max,
            image: resp.image,
          };
        });
        //console.log(respDB, 'respuesta db')
        return res.status(200).json(respDB);
      } else {
        const nameQuery = (
          await axios.get(
            `https://api.thedogapi.com/v1/breeds/search?q=${name}&&api_key=${API_KEY}`
          )
        ).data;
        let imageName = nameQuery.map((image) => image.name);
        // console.log(imageId, 'imageid')
        const apiUrl = (await axios.get(URL)).data;
        // console.log(apiUrl, 'soy la url')
        let imageNameMap = imageName.map((elem) => {
          return (variable = apiUrl.find((cosas) => {
            if (
              cosas.name.toLowerCase() === elem.toLowerCase() &&
              elem.toLowerCase() === name.toLowerCase()
            )
              return cosas;
          }));
        });
        //console.log(imageIdMap, 'imageIDMAP')
        let filterName = imageNameMap.filter((sacar) => {
          return sacar != undefined;
        });
        // console.log(filtrado, 'filtrado')
        // console.log(filterById, 'filter')

        const selectName = filterName.map((sel) => {
          return {
            id: sel.id,
            name: sel.name,
            temperament: [sel.temperament]
              .join()
              .split(",")
              .map((temp) => temp.trim()),
            weight_min: parseInt(sel.weight.metric.slice(0, 2).trim()),
            weight_max: parseInt(sel.weight.metric.slice(4).trim()),
            height_min: parseInt(sel.height.metric.slice(0, 2).trim()),
            height_min: parseInt(sel.height.metric.slice(4).trim()),
            life_span_min: parseInt(sel.life_span.slice(0, 2).trim()),
            life_span_max: parseInt(sel.life_span.slice(4).trim()),
            image: sel.image.url,
          };
        });
        //console.log(selectName, 'soy el map')
        selectName.length
          ? res.status(200).json(selectName)
          : res.status(404).send({msg:"No existe el nombre"});
      }
    } else {
      try {
        const getAllBreeds = await getAllInfo();
        return res.json(getAllBreeds);
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error)
  }
};

//! Traigo las razas por su ID

const getBreedById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("busqueda x id");
    const allBreed = await getAllInfo();
    if (id) {
      let dogId = await allBreed.filter((breed) =>
        id.length > 6 ? breed.id === id : breed.id === parseInt(id)
      );
      dogId.length
        ? res.status(200).json(dogId)
        : res.status(404).send({msg: "Raza no encontrada"});
    }
  } catch (error) {
    next(error);
  }
};

//! Realizo el post de una raza

const postBreed = async (req, res, next) => {
  const {
          name,
          temperament,
          weight_min,
          weight_max,
          height_min,
          height_max,
          life_span_min,
          life_span_max,
          image,
          
        } = req.body;
    try {
      if(name && height_min && height_max && weight_min && weight_max &&life_span_min && life_span_max && temperament && image) {
      const createBreed = await Dog.create ({
        name,
        weight_min: parseInt(weight_min),
        weight_max: parseInt(weight_max),
        height_min: parseInt(height_min),
        height_max: parseInt(height_max),
        life_span_min: parseInt(life_span_min),
        life_span_max: parseInt(life_span_max),
        image,
      })
      //console.log(temperament)
        temperament.map(async elem => {
          const findTemperament = await Temperament.findAll({
            where: {
              name:elem,
            }
          })
          createBreed.addTemperament(findTemperament)
        })
          res.status(200).send(createBreed)
        } else {
          res.status(404).send({msg: 'No puede crearse la raza'})
        }
    } catch (error) {
      next(error);
    }
  }

const alphabeticOrder = async (req, res, next) => {
  const { alpha } = req.query;
  try {
    const allBreeds = await getAllInfo();
    let ordenBreeds = [];
    if (alpha === "asc") {
      // console.log (alpha, 'asc')
      ordenBreeds = allBreeds.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        return 0;
      });
    }
    if (alpha === "desc") {
      // console.log (alpha, 'desc')
      ordenBreeds = allBreeds.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }
    // console.log(ordenBreeds, 'respjson')
    res.json(ordenBreeds);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBreeds,
  postBreed,
  getBreedById,
  getAllInfo,
  alphabeticOrder,
};
