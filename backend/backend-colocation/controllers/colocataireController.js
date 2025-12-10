const { getConnection }= require('../db/connection');
const oracledb = require('oracledb');



exports.getAllColocataires = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      `SELECT * FROM utilisateur WHERE role = 'colocataire'`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  } finally {
    if (connection) await connection.close();
  }
};

exports.deleteColocataire = async (req, res) => {
  const id = req.params.id;
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `DELETE FROM utilisateur WHERE id_utilisateur = :id AND role = 'colocataire'`,
      [id],
      { autoCommit: true }
    );
    res.status(200).json({ message: "Colocataire supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  } finally {
    if (connection) await connection.close();
  }
};

// ---- updateReserve ----
exports.updateReserve = async (req, res) => {
  const { id } = req.params;       // ID du logement
  const { reserve } = req.body;    // "Y" ou "N"
  console.log("id:", id, "reserve:", reserve);

  let connection;
  try {
    connection = await getConnection();
    
    await connection.execute(
      `UPDATE logement SET reserve = :reserve WHERE ID_LOGEMENT = :id`,
      { reserve, id },
      { autoCommit: true }
    );

    res.json({ message: 'Réserve mise à jour', reserve });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur update reserve' });
  } finally {
    if (connection) connection.close();
  }
};
