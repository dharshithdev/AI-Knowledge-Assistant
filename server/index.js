const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000; 

app.use(cors());
app.use(express.json());

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || "http://127.0.0.1:8000";

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