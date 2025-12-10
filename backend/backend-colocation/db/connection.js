const oracledb = require('oracledb');

 async function getConnection() {
  try {
    return await oracledb.getConnection({
      user: "C##emnaa",
      password: "000000", 
      connectString: "localhost:1521/XE"
      /*user: "system",
      password: "yossr2004", 
      connectString: "localhost:1521/XE"*/
      /*user: "system",
      password: "123", 
      connectString: "localhost:1522/orcl1" */

    });
  } catch (err) {
    console.error("Erreur de connexion à Oracle :", err);
    throw err;
  }
}

module.exports = { getConnection };

