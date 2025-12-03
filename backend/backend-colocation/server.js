console.log("🔥 AUTH ROUTES CHARGÉES");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Import des routes
const colocataireRoutes = require('./routes/colocataireRoutes');
const proprietaireRoutes = require('./routes/proprietaireRoutes');
const logementRoutes = require('./routes/logementRoutes');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const authRoutes = require('./routes/auth'); 

app.use('/api', authRoutes); 
app.use('/api/colocataires', colocataireRoutes);
app.use('/api/proprietaires', proprietaireRoutes);
app.use('/api/logements', logementRoutes);
app.use('/api/utilisateur', utilisateurRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Serveur Node.js démarré sur http://localhost:${PORT}`);
});

