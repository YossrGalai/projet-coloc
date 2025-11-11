const oracledb = require('oracledb');

async function connect() {
  try {
    return await oracledb.getConnection({
      user: "system",
      password: "yossr2004", 
      connectString: "localhost:1521/XE" 
    });
  } catch (err) {
    console.error("Erreur de connexion à Oracle :", err);
    throw err;
  }
}

module.exports = connect;

