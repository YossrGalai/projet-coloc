const oracledb = require('oracledb');

 async function getConnection() {
  try {
    return await oracledb.getConnection({
      user: "C##emnaa",
      password: "000000",  
      connectString: "localhost:1521/XE" 
    });
  } catch (err) {
    console.error("Erreur de connexion à Oracle :", err);
    throw err;
  }
}

module.exports = { getConnection };

