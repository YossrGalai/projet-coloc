console.log("🔥 AUTH ROUTES CHARGÉES");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const colocataireRoutes = require('./routes/colocataireRoutes');
const authRoutes = require('./routes/auth'); 

const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', authRoutes);                   
app.use('/api/colocataires', colocataireRoutes);
//router.get("/test", (req, res) => res.send("Route Auth OK"));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur Node.js démarré sur http://localhost:${PORT}`);
});





