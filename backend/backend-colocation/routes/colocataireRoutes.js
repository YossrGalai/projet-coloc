
const express = require('express');
const router = express.Router();
const colocataireController = require('../controllers/colocataireController');

router.get('/', colocataireController.getAll);
router.patch('/reserve/:id', colocataireController.updateReserve);
module.exports = router;

