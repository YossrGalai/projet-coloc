const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

// ADD reservation
router.post('/:logementId', async (req, res) => {
  const logementId = req.params.logementId;
  const { cin, role , date_debut} = req.body;  // récupérer les infos envoyées depuis Angular
   console.log('Payload reçu :', req.body); // Vérifier les données

  if (!cin || !role || !date_debut) {
    return res.status(400).send({ message: 'CIN ou rôle manquant' });
  }

  try {
    const connection = await getConnection();
    const sql = `INSERT INTO reservation (ID_LOGEMENT, CIN_COLOCATAIRE, ROLE_COLOCATAIRE,DATE_DEBUT) 
                 VALUES (:id_logement, :cin, :role , TO_DATE(:date_debut, 'YYYY-MM-DD'))`;
    await connection.execute(sql, { id_logement: logementId, cin, role, date_debut }, { autoCommit: true });
    
    await connection.close();
    res.send({ message: "Réservation ajoutée !" });
  } catch (err) {
    console.error("Erreur réservation :", err);
    res.status(500).send(err);
  }
});

// DELETE reservation
router.delete('/:logementId', async (req, res) => {
  const logementId = req.params.logementId;
  const { cin } = req.body;  // pour supprimer la réservation uniquement de l'utilisateur connecté
  console.log('logementId:', logementId, 'cin:', cin);


  try {
    const connection = await getConnection();
    const sql = `DELETE FROM reservation WHERE ID_LOGEMENT = :id_logement AND CIN_COLOCATAIRE = :cin`;
    await connection.execute(sql, { id_logement: logementId, cin }, { autoCommit: true });
    // Après avoir supprimé la réservation
    await connection.execute(
   `UPDATE logement SET reserve = 'N' WHERE ID_LOGEMENT = :id_logement`,
    { id_logement: logementId },
    { autoCommit: true }
);
    await connection.close();
    res.send({ message: "Réservation annulée !" });
  } catch (err) {
    console.error("Erreur annulation :", err);
    res.status(500).send(err);
  }
});
module.exports = router;


