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

// Utilisation des routes
app.use('/api/colocataires', colocataireRoutes);
app.use('/api/proprietaires', proprietaireRoutes);
app.use('/api/logements', logementRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

