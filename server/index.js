const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pdfExtractRoute = require('./routes/pdfExtract');

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api', pdfExtractRoute);

app.get("/", (req, res) => {
  res.send("API de décodage de CV en ligne...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));