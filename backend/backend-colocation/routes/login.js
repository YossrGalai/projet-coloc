const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');
const bcrypt = require('bcrypt'); // si tu hashes les mdp

router.post('/login', async (req, res) => {
  const { email, mot_de_passe } = req.body;
  try {
    const db = await getConnection();
    const result = await db.execute(
      `SELECT * FROM utilisateur WHERE email = :email AND role = 'admin'`,
      [email],
      { outFormat: db.OBJECT }
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    const admin = result.rows[0];

    // si mot de passe hashé
    // const match = await bcrypt.compare(mot_de_passe, admin.MOT_DE_PASSE);

    if (mot_de_passe !== admin.MOT_DE_PASSE) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Auth réussi
    res.json({ message: 'Connexion réussie', admin: { cin: admin.CIN, nom: admin.NOM } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
