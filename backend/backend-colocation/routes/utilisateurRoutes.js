const express = require('express');
const router = express.Router();
const { getConnection }= require('../db/connection');

router.delete('/:cin/:role', async (req, res) => {
  const { cin, role } = req.params;
  console.log('DELETE reçu pour:', cin, role);

  try {
    const db = await getConnection();
    console.log('Connexion OK, suppression de', cin, role);
    const result = await db.execute(
      `DELETE FROM utilisateur WHERE cin = :cin AND role = :role`,
      { cin: Number(cin), role }
    );
    console.log('Rows affected:', result.rowsAffected);
    await db.commit(); 
    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET tous les colocataires
router.get('/colocataires', async (req, res) => {
  try {
    const db = await getConnection();
    const result = await db.execute(
      `SELECT * FROM utilisateur WHERE role = 'colocataire'`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// GET tous les propriétaires
router.get('/proprietaires', async (req, res) => {
  try {
    const db = await getConnection();
    const result = await db.execute(
      `SELECT * FROM utilisateur WHERE role = 'proprietaire'`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});



module.exports = router;
