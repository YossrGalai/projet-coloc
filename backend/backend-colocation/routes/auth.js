// routes/auth.js
const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const { getConnection } = require("../db/connection"); // connexion Oracle

console.log("🔥 Auth routes chargées");


// route POST login propriétaire

router.post("/se-connecter/proprietaire", async (req, res) => {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
        return res.status(400).json({ success: false, message: "Email et mot de passe obligatoires" });
    }

    try {
        const connection = await getConnection();

        const result = await connection.execute(
            `SELECT * FROM utilisateur 
             WHERE email = :email AND mot_de_passe = :mot_de_passe AND role = 'proprietaire'`,
            { email, mot_de_passe },
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // <-- Important pour obtenir un objet
        );

        await connection.close();

        if (result.rows.length > 0) {
            const user = result.rows[0];
            res.json({
                success: true,
                data: {
                    cin: user.CIN,
                    nom: user.NOM,
                    prenom: user.PRENOM,
                    email: user.EMAIL,
                    telephone: user.TELEPHONE,
                    date_naissance: user.DATE_NAISSANCE
                    ? user.DATE_NAISSANCE.toLocaleDateString('fr-CA') 
                    : null,
                    role: user.ROLE.toLowerCase(),
                    date_inscription: user.DATE_INSCRIPTION,
                    //photo:user.PHOTO
                }
            });
        } else {
            res.json({ success: false, message: "Email ou mot de passe incorrect" });
        }
    } catch (err) {
        console.error("Erreur serveur:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});


// route POST login colocataire

router.post("/se-connecter/profil", async (req, res) => {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
        return res.status(400).json({ success: false, message: "Email et mot de passe obligatoires" });
    }

    try {
        const connection = await getConnection();

        const result = await connection.execute(
            `SELECT * FROM utilisateur 
             WHERE email = :email AND mot_de_passe = :mot_de_passe AND role = 'colocataire'`,
            { email, mot_de_passe },
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // <-- Important pour obtenir un objet
        );

        await connection.close();

        if (result.rows.length > 0) {
            const user = result.rows[0];
            res.json({
                success: true,
                data: {
                    cin: user.CIN,
                    nom: user.NOM,
                    prenom: user.PRENOM,
                    email: user.EMAIL,
                    telephone: user.TELEPHONE,
                    date_naissance: user.DATE_NAISSANCE
                     ? user.DATE_NAISSANCE.toLocaleDateString('fr-CA') 
                        : null,
                    role: user.ROLE.toLowerCase(),
                    date_inscription: user.DATE_INSCRIPTION
                }
            });
        } else {
            res.json({ success: false, message: "Email ou mot de passe incorrect" });
        }
    } catch (err) {
        console.error("Erreur serveur:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// mettre a jour le profil propriétaire
router.put("/proprietaire/:cin", async (req, res) => {
  try {
    const { cin } = req.params;
    const { nom, prenom, email, telephone, date_naissance } = req.body;

    if (!nom || !prenom || !email || !telephone || !date_naissance) {
      return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires" });
    }

    const cinNumber = Number(cin);

    const connection = await getConnection();

    // Forcer le format YYYY-MM-DD pour Oracle
    const formattedDate = new Date(date_naissance).toISOString().slice(0, 10);

    // Update avec bind sécurisé
    const result = await connection.execute(
      `UPDATE utilisateur
       SET nom = :nom,
           prenom = :prenom,
           email = :email,
           telephone = :telephone,
           date_naissance = TO_DATE(:date_naissance, 'YYYY-MM-DD')
       WHERE cin = :cin AND LOWER(role) = 'proprietaire'`,
      { nom, prenom, email, telephone, date_naissance: formattedDate, cin: cinNumber },
      { autoCommit: true }
    );

    await connection.close();

    if (result.rowsAffected > 0) {
      return res.json({ success: true, message: "Profil mis à jour avec succès !" });
    } else {
      return res.status(404).json({ success: false, message: "Propriétaire introuvable ou aucune modification" });
    }
  } catch (err) {
    console.error("Erreur serveur:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// mettre a jour le profil colocataire
router.put("/colocataire/:cin", async (req, res) => {
  try {
    const { cin } = req.params;
    const { nom, prenom, email, telephone, date_naissance } = req.body;

    if (!nom || !prenom || !email || !telephone || !date_naissance) {
      return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires" });
    }

    const cinNumber = Number(cin);

    const connection = await getConnection();

    // Forcer le format YYYY-MM-DD pour Oracle
    const formattedDate = new Date(date_naissance).toISOString().slice(0, 10);

    // Update avec bind sécurisé
    const result = await connection.execute(
      `UPDATE utilisateur
       SET nom = :nom,
           prenom = :prenom,
           email = :email,
           telephone = :telephone,
           date_naissance = TO_DATE(:date_naissance, 'YYYY-MM-DD')
       WHERE cin = :cin AND LOWER(role) = 'colocataire'`,
      { nom, prenom, email, telephone, date_naissance: formattedDate, cin: cinNumber },
      { autoCommit: true }
    );

    await connection.close();

    if (result.rowsAffected > 0) {
      return res.json({ success: true, message: "Profil mis à jour avec succès !" });
    } else {
      return res.status(404).json({ success: false, message: "Colocataire introuvable ou aucune modification" });
    }
  } catch (err) {
    console.error("Erreur serveur:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

//charger reservation colocataire

router.get("/colocataire/:cin/reservations", async (req, res) => {
    const cin = Number(req.params.cin);
    if (isNaN(cin)) {
        return res.status(400).json({
            success: false,
            message: "Paramètre CIN invalide"
        });
    }

    try {
        const connection = await getConnection();

        const result = await connection.execute(
            `SELECT 
                l.titre AS logement,
                r.date_debut AS date_reservation,
                r.statut
             FROM reservation r
             JOIN logement l ON r.id_logement = l.id_logement
             WHERE r.cin_colocataire = :cin
               AND r.role_colocataire = 'colocataire'
             ORDER BY r.date_debut DESC`,
            { cin },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        await connection.close();

        res.json({
            success: true,
            data: result.rows.map(r => ({
                logement: r.LOGEMENT,
                date: r.DATE_RESERVATION 
                    ? r.DATE_RESERVATION.toLocaleDateString('fr-CA')
                    : null,
                statut: r.STATUT
            }))
        });

    } catch (err) {
        console.error("Erreur serveur:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// recuperer les logements d'un propriétaire
router.get("/proprietaire/:cin/logements", async (req, res) => {
    const cin = Number(req.params.cin);

    try {
        const connection = await getConnection();

        const result = await connection.execute(
            `SELECT titre, prix, photo
             FROM logement
             WHERE cin_proprietaire = :cin
               AND role_proprietaire = 'proprietaire'
             ORDER BY id_logement DESC`,
            { cin },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        await connection.close();

        // Retour JSON
        res.json({
            success: true,
            data: result.rows.map(l => ({
                titre: l.TITRE,
                prix: l.PRIX,
                image: l.PHOTO
            }))
        });

    } catch (err) {
        console.error("Erreur serveur:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// recuperer les demandes de reservation en attente pour un proprietaire
router.get("/proprietaire/:cin/reservations", async (req, res) => {
    const cin = Number(req.params.cin);

    try {
        const connection = await getConnection();

        const result = await connection.execute(
            `SELECT 
                l.titre AS logement,
                r.date_debut,
                r.date_fin,
                r.id_reservation
             FROM reservation r
             JOIN logement l ON r.id_logement = l.id_logement
             WHERE l.cin_proprietaire = :cin
               AND l.role_proprietaire = 'proprietaire'
               AND r.statut = 'en_attente'
             ORDER BY r.date_debut DESC`,
            { cin },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        await connection.close();

        res.json({
            success: true,
            data: result.rows.map(r => ({
                id_reservation: r.ID_RESERVATION,
                logement: r.LOGEMENT,
                date_debut: r.DATE_DEBUT 
                    ? r.DATE_DEBUT.toLocaleDateString('fr-CA') 
                    : null,
                date_fin: r.DATE_FIN 
                    ? r.DATE_FIN.toLocaleDateString('fr-CA') 
                    : null
            }))
        });

    } catch (err) {
        console.error("Erreur serveur:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// modifier le statut d'une reservation
router.put("/reservation/:id/statut", async (req, res) => {
    const id_reservation = Number(req.params.id);
    const { statut } = req.body; // 'acceptée' ou 'refusée'

    let connection;

    try {
        connection = await getConnection();

        // demarrer la transaction
        await connection.execute(`BEGIN NULL; END;`);

        // mettre à jour le statut de la reservation
        await connection.execute(
            `UPDATE reservation
             SET statut = :statut
             WHERE id_reservation = :id_reservation`,
            { statut, id_reservation }
        );

        // Si accepte, mettre à jour le logement associe
        if(statut === 'acceptée') {
            await connection.execute(
                `UPDATE logement l
                 SET l.reserve = 'Y'
                 WHERE l.id_logement = (
                     SELECT r.id_logement
                     FROM reservation r
                     WHERE r.id_reservation = :id_reservation
                 )`,
                { id_reservation }
            );
        }

        // commit final
        await connection.commit();
        await connection.close();

        res.json({ success: true, message: "Statut et réservation mis à jour !" });

    } catch (err) {
        console.error("Erreur serveur:", err);

        if(connection) {
            try { await connection.rollback(); } catch(e) { console.error(e); }
        }

        res.status(500).json({ success: false, message: err.message });
    }
});


// POST /api/logement
router.post("/logement", async (req, res) => {
    const {
        titre,
        adresse,
        ville,
        prix,
        nb_chambres,
        superficie,
        type,
        description,
        image,
        cin_proprietaire
    } = req.body;

    try {
        const connection = await getConnection();

        await connection.execute(
            `INSERT INTO logement (
                titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire
            ) VALUES (
                :titre, :adresse, :ville, :prix, :nb_chambres, :superficie, :description, :photo, :type, 'N', :cin_proprietaire, 'proprietaire'
            )`,
            {
                titre,
                adresse,
                ville,
                prix,
                nb_chambres,
                superficie,
                description,
                photo: image,
                type,
                cin_proprietaire
            },
            { autoCommit: true } 
        );

        await connection.close();

        res.json({ success: true, message: "Logement ajouté avec succès !" });
    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

//  Ajouter une réservation
router.post("/reservation", async (req, res) => {
  const {
    Cin,
    date_debut,
    date_fin,
    message,
  } = req.body;

  try {
    const connection = await getConnection();

    await connection.execute(
      `INSERT INTO reservation (
        cin_colocataire,
        role_colocataire,
        id_logement,
        date_debut,
        date_fin,
        statut
      ) VALUES (
        :cin,
        'colocataire',
        1,  -- ⚠️ À remplacer : ID logement choisi
        TO_DATE(:date_debut, 'YYYY-MM-DD'),
        TO_DATE(:date_fin, 'YYYY-MM-DD'),
        'en_attente'
      )`,
      {
        cin: Cin,
        date_debut,
        date_fin
      },
      { autoCommit: true }
    );

    await connection.close();

    res.json({ success: true, message: "Réservation ajoutée !" });

  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ success: false, message: err.message });
  }
});


module.exports = router;
