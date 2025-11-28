const express = require('express');
const router = express.Router();
const { getAllLogements, deleteLogement } = require('../controllers/logementController');

router.get('/', getAllLogements);
router.delete('/:id', deleteLogement);

module.exports = router;
