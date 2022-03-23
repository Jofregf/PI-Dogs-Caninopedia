const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const getBreeds = require('./Dogs')
const getTemperament = require('./Temperament')
const postBreed = require('./Dogs')



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', getBreeds);
router.use('/dog', postBreed)
router.use('/temperament', getTemperament);



module.exports = router;
