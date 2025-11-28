const oracledb = require('oracledb');

async function connect() {
  try {
    return await oracledb.getConnection({
      user: "system",
      password: "123", 
      connectString: "localhost:1522/orcl1" 
    });
  } catch (err) {
    console.error("Erreur de connexion à Oracle :", err);
    throw err;
  }
}

module.exports = connect;

