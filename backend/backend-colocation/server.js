console.log("🔥 AUTH ROUTES CHARGÉES");
const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');  
const cors = require('cors');
const bodyParser = require('body-parser');
const colocataireRoutes = require('./routes/colocataireRoutes');
const authRoutes = require('./routes/auth'); 

const app = express();

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', authRoutes);                   
app.use('/api/colocataires', colocataireRoutes);
//router.get("/test", (req, res) => res.send("Route Auth OK"));



// Configure Multer for local file storage
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/utilisateur/');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const upload1 = multer({ storage1 });


const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/logement/');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const upload2 = multer({ storage2 });


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur Node.js démarré sur http://localhost:${PORT}`);
});





