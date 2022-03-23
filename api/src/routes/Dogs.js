const express = require('express');
const router = express.Router();
const {getAllBreeds, postBreed, getBreedById, alphabeticOrder} = require('../Controllers/dogController');


router.get('/:id', getBreedById);
router.get('/', getAllBreeds);
router.get('/breeds/orden', alphabeticOrder)
router.post('/', postBreed);




module.exports = router;

