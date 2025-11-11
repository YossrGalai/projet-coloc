const connect = require('../db/connection');

exports.getAll = async (req, res) => {
  let connection;
  try {
    connection = await connect();
    const result = await connection.execute('SELECT * FROM reservation');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};
