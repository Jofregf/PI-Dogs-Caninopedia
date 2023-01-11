const { Router } = require('express');

const router = Router();

const getBreeds = require('./Dogs')
const getTemperament = require('./Temperament')
const postBreed = require('./Dogs')

router.use('/dogs', getBreeds);
router.use('/dog', postBreed)
router.use('/temperament', getTemperament);



module.exports = router;
