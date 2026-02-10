const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const upload = multer({ storage: multer.memoryStorage() });

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || "http://127.0.0.1:8000";

// --- NEW UPLOAD ROUTE ---
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log(`📂 Received file: ${req.file.originalname}. Forwarding to Python...`);

        // Prepare the file to be sent to Python using FormData
        const form = new FormData();
        form.append('file', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        const response = await axios.post(`${PYTHON_SERVICE_URL}/upload`, form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("❌ Upload Error:", error.message);
        res.status(500).json({ error: "Failed to process PDF in the AI Brain." });
    }
});

app.post('/api/ask', async (req, res) => {
    try {
        const { question } = req.body;

        const response = await axios.post(`${PYTHON_SERVICE_URL}/ask`, {
            question: question
        });

        res.json(response.data);
    } catch (error) {
        console.error(`❌ AI Service Error at ${PYTHON_SERVICE_URL}:`, error.message);
        res.status(500).json({ error: "Could not connect to the AI brain." });
    }
});

app.listen(PORT, () => {
    console.log(`🛡️ Gateway Server running on http://localhost:${PORT}`);
});