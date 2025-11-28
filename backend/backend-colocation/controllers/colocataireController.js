const connect = require('../db/connection');

exports.getAll = async (req, res) => {
  let connection;
  try {
    connection = await connect();
    const result = await connection.execute("SELECT * FROM logement ");
    const logements = result.rows.map(row => ({
  id: row[0],
  titre: row[1],
  adresse: row[2],
  ville: row[3],
  prix: row[4],
  chambres: row[5],
  superficie: row[6],
  photo: row[7],
  type: row[8],
  reserve: row[9] === 'Y',
  proprietaireId: row[10],
  proprietaireType: row[11],
  description: row[12]
}));
    res.json(logements);
 
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};



// ---- updateReserve ----
exports.updateReserve = async (req, res) => {
  const { id } = req.params;       // ID du logement
  const { reserve } = req.body;    // "Y" ou "N"
  console.log("id:", id, "reserve:", reserve);

  let connection;
  try {
    connection = await connect();
    
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
