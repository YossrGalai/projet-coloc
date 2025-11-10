const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const colocataireRoutes = require('./routes/colocataireRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/colocataires', colocataireRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur Node.js démarré sur http://localhost:${PORT}`);
});

