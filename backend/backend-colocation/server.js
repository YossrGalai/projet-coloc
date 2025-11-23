const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Import des routes
const colocataireRoutes = require('./routes/colocataireRoutes');
const proprietaireRoutes = require('./routes/proprietaireRoutes');
const logementRoutes = require('./routes/logementRoutes');
const utilisateurRoutes = require('./routes/utilisateurRoutes');

// Utilisation des routes
app.use('/api/colocataires', colocataireRoutes);
app.use('/api/proprietaires', proprietaireRoutes);
app.use('/api/logements', logementRoutes);
app.use('/api/utilisateur', utilisateurRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

