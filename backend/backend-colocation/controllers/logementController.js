const oracledb = require('oracledb');
const { getConnection }= require('../db/connection');

exports.getAllLogements = async (req, res) => {
  /*let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      `SELECT 
      ID_LOGEMENT,
      TITRE,
      ADRESSE,
      VILLE,
      PRIX,
      NB_CHAMBRES,
      SUPERFICIE,
      DESCRIPTION,
      PHOTO,
      TYPE,
      TRIM(RESERVE) AS RESERVE,
      CIN_PROPRIETAIRE,
      ROLE_PROPRIETAIRE
    FROM logement`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log(result.rows);
    res.status(200).json(result.rows);

  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) await connection.close();
  }*/
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute("SELECT * FROM logement ");
    const logements = result.rows.map(row => ({
  id: row[0],
  titre: row[1],
  adresse: row[2],
  ville: row[3],
  prix: row[4],
  chambres: row[5],
  superficie: row[6],
  description: row[7],
  photo: row[8],
  type: row[9],
  reserve: row[10] === 'Y',
  proprietaireId: row[11],
  proprietaireType: row[12]
}));

    res.json(logements);
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  } finally {
    if (connection) await connection.close();
  }
};


exports.deleteLogement = async (req, res) => {
  let connection;
  try {
    const id = req.params.id;
    connection = await getConnection();
    await connection.execute(
      'DELETE FROM logement WHERE id_logement = :id',
      [id],
      { autoCommit: true }
    );
    res.status(200).json({ message: 'Logement supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) await connection.close();
  }
};