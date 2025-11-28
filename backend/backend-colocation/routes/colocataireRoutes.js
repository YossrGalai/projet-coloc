const express = require('express');
const router = express.Router();
const colocataireController = require('../controllers/colocataireController');

router.get('/', colocataireController.getAllColocataires);
router.delete('/:id', colocataireController.deleteColocataire);

module.exports = router;


