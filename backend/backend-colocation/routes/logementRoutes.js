const express = require('express');
const router = express.Router();
const { getAllLogements, deleteLogement } = require('../controllers/logementController');

router.get('/', getAllLogements);
router.delete('/:id', deleteLogement);

// Update logement reserve status
router.put("/:id/reserve", async (req, res) => {
  const logementId = req.params.id;
  const reserve = req.body.reserve; // 'Y' or 'N'

  try {
    await connection.execute(
      `UPDATE logement SET RESERVE = :reserve WHERE ID_LOGEMENT = :id`,
      { reserve, id: logementId },
      { autoCommit: true }
    );

    res.json({ success: true });

  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ success: false, error: err });
  }
});


module.exports = router;
