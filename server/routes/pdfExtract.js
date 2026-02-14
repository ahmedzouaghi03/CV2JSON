const express = require('express');
const fs = require('fs');
const path = require('path');
const PDFParser = require("pdf2json");
const router = express.Router();

router.get('/extract', (req, res) => {
    const pdfPath = path.join(__dirname, '../pdfs/cv_english.pdf');
    
   
    if (!fs.existsSync(pdfPath)) {
        return res.status(404).json({ error: "Fichier PDF introuvable au chemin spécifié." });
    }

    const pdfParser = new PDFParser(this, 1); 
    pdfParser.on("pdfParser_dataError", errData => {
        console.error(errData.parserError);
        res.status(500).json({ error: "Erreur lors de l'analyse du PDF" });
    });

    
    pdfParser.on("pdfParser_dataReady", pdfData => {
        const extractedText = pdfParser.getRawTextContent();
        console.log("Texte extrait avec succès !");
        res.json({ text: extractedText });
    });

    pdfParser.loadPDF(pdfPath);
});

module.exports = router;