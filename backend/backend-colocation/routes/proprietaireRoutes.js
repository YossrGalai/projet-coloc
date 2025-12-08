const express = require('express');
const router = express.Router();
const proprietaireController = require('../controllers/proprietaireController');

router.get('/', proprietaireController.getAllProprietaires);
router.delete('/:id', proprietaireController.deleteProprietaire);

module.exports = router;
