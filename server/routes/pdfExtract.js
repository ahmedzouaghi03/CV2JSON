const express = require('express');
const fs = require('fs');
const path = require('path');
const PDFParser = require("pdf2json");
const cleanText = require('../utils/cleanText'); 

const router = express.Router();

router.get('/extract', (req, res) => {
    const pdfPath = path.join(__dirname, '../pdfs/cv_english.pdf');
    
    if (!fs.existsSync(pdfPath)) {
        return res.status(404).json({ error: "Fichier PDF introuvable." });
    }

    const pdfParser = new PDFParser(null, 1);

    pdfParser.on("pdfParser_dataError", errData => {
        res.status(500).json({ error: "Erreur lors de l'analyse du PDF" });
    });

    pdfParser.on("pdfParser_dataReady", () => {
        const rawText = pdfParser.getRawTextContent();
        
      
        const cleaned = cleanText(rawText);

        res.json({ 
            success: true,
            originalLength: rawText.length,
            cleanedLength: cleaned.length,
            text: cleaned 
        });
    });

    pdfParser.loadPDF(pdfPath);
});

module.exports = router;