const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000; 

// Middleware
app.use(cors());
app.use(express.json());

// The "Bridge" Route
app.post('/api/ask', async (req, res) => {
    try {
        const { question } = req.body;

        // Sending the question to the Python Brain (Port 8000)
        const response = await axios.post('http://127.0.0.1:8000/ask', {
            question: question
        });

        // Sending the answer back to your React app
        res.json(response.data);
    } catch (error) {
        console.error("❌ AI Service Error:", error.message);
        res.status(500).json({ error: "Could not connect to the AI brain." });
    }
});

app.listen(PORT, () => {
    console.log(`🛡️ Gateway Server running on http://localhost:${PORT}`);
});