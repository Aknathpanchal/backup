const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const SignPDF = require('./SignPDF');  // Adjust the path as necessary

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload-and-sign', upload.fields([{ name: 'pdf' }, { name: 'pfx' }]), async (req, res) => {
    try {
        const pdfFilePath = req.files['pdf'][0].path;
        const pfxFilePath = req.files['pfx'][0].path;
        const password = req.body.password;

        // Ensure paths are correct
        if (!pdfFilePath || !pfxFilePath) {
            throw new Error('PDF or PFX file missing');
        }

        const signer = new SignPDF(pdfFilePath, pfxFilePath, password);
        const signedPdf = await signer.signPDF();

        res.setHeader('Content-Disposition', 'attachment; filename=signed_output.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(signedPdf);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to process files.');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
