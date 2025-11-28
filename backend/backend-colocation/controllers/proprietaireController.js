const oracledb = require('oracledb');
const { getConnection }= require('../db/connection');

exports.getAllProprietaires = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      `SELECT * FROM utilisateur WHERE role = 'proprietaire'`,
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

exports.deleteProprietaire = async (req, res) => {
  const id = req.params.id;
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `DELETE FROM utilisateur WHERE id_utilisateur = :id AND role = 'proprietaire'`,
      [id],
      { autoCommit: true }
    );
    res.status(200).json({ message: "Propriétaire supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  } finally {
    if (connection) await connection.close();
  }
};