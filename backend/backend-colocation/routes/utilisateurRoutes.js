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

// POST pour ajouter un utilisateur
router.post('/inscription', async (req, res) => {
  console.log('Requête reçue :', req.body);

  try {
    let { cin, nom, prenom, email, mot_de_passe, role, telephone, date_naissance } = req.body;

    // validation simple
    if (!cin || !nom || !prenom || !email || !mot_de_passe || !role) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }
    if (isNaN(Number(cin))) {
      return res.status(400).json({ message: 'CIN invalide' });
    }

    cin = Number(cin);

    const db = await getConnection();
   
    // vérifier CIN+role
    const check = await db.execute(
      `SELECT * FROM utilisateur WHERE cin = :cin AND role = :role`,
      { cin, role }
    );
    if (check.rows.length > 0) {
      return res.status(409).json({ message: 'Cette CIN existe déjà pour ce rôle' });
    }

    // vérifier email
    const emailCheck = await db.execute(
      `SELECT * FROM utilisateur WHERE email = :email`,
      { email }
    );
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }

    // insertion
    console.log({
      cin, nom, prenom, email, mot_de_passe, role, telephone, date_naissance
    });

    if (!cin || isNaN(Number(cin))) return res.status(400).json({ message: 'CIN invalide' });
    if (!email.includes('@')) return res.status(400).json({ message: 'Email invalide' });

    await db.execute(
      `INSERT INTO utilisateur
      (cin, nom, prenom, email, mot_de_passe, role, telephone, date_naissance)
      VALUES (:cin, :nom, :prenom, :email, :mot_de_passe, :role, :telephone, TO_DATE(:date_naissance,'YYYY-MM-DD'))`,
      {
        cin,
        nom,
        prenom,
        email,
        mot_de_passe,
        role,
        telephone: telephone || null,
        date_naissance: date_naissance || null
      }
    );

    await db.commit();
    res.status(201).json({ message: 'Utilisateur ajouté avec succès' });

  } catch (err) {
    console.error('Erreur serveur :', err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
