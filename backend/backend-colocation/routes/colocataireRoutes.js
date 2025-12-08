
const express = require('express');
const router = express.Router();
const colocataireController = require('../controllers/colocataireController');

router.get('/', colocataireController.getAllColocataires);
router.patch('/reserve/:id', colocataireController.updateReserve);
module.exports = router;

