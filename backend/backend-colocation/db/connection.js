const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getConnection() {
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

module.exports = {getConnection};

