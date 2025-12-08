const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');

// INSERT logement
router.post('/', async (req, res) => {
  try {
    const { titre, adresse, ville, prix, nbchambres, superficie, type, description, image } = req.body;

    const connection = await oracledb.getConnection({
      user: "C##emnaa",
      password: "000000",
      connectString: "localhost:1521/orcl"
    });

    await connection.execute(
      `INSERT INTO LOGEMENT (TITRE, ADRESSE, VILLE, PRIX, nb_chambres, SUPERFICIE, TYPE, DESCRIPTION, IMAGE)
       VALUES (:titre, :adresse, :ville, :prix, :nbchambres, :superficie, :type, :description, :image)`,
      { titre, adresse, ville, prix, nbchambres, superficie, type, description, image },
      { autoCommit: true }
    );

    res.status(200).send({ message: "Logement ajouté ✔" });
    connection.close();

  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

