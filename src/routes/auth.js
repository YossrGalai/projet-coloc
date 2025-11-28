router.post('/login/proprietaire', async (req, res) => {
  const { email, password } = req.body;

  const result = await connection.execute(`
    SELECT cin, nom, prenom, email, telephone, date_naissance
    FROM PROPRIETAIRE
    WHERE email = :email AND mot_de_passe = :password
  `, { email, password });

  if (result.rows.length === 0)
    return res.status(401).send({ message: "Compte propriétaire introuvable" });

  const u = result.rows[0];
  res.send({
    role: "proprietaire",
    cin: u[0],
    nom: u[1],
    prenom: u[2],
    email: u[3],
    tel: u[4],
    datenaissance: u[5]
  });
});



router.post('/login/colocataire', async (req, res) => {
  const { email, password } = req.body;

  const result = await connection.execute(`
    SELECT CIN, NOM, PRENOM, EMAIL, TEL, DATE_NAISS
    FROM COLOCATAIRE
    WHERE EMAIL = :email AND MOTDEPASSE = :password
  `, { email, password });

  if (result.rows.length === 0)
    return res.status(401).send({ message: "Compte colocataire introuvable" });

  const u = result.rows[0];
  res.send({
    role: "colocataire",
    cin: u[0],
    nom: u[1],
    prenom: u[2],
    email: u[3],
    tel: u[4],
    datenaissance: u[5]
  });
});
