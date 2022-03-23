const express = require('express');
const router = express.Router();

const {getTemperament, getBreedByTemperament, getOrigen, filterOrigen} = require('../Controllers/temperamentController');

router.get('/', getTemperament);
router.get('/dogs', getBreedByTemperament)
// router.get('/origen', getOrigen)
// router.get('/filterorigen', filterOrigen)

module.exports = router;