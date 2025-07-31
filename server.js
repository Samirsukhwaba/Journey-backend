require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('@googlemaps/google-maps-services-js');

const app = express();
app.use(cors());
const PORT = 3000;
const mapsClient = new Client({});

app.get('/journey', async (req, res) => {
    try {
        const response = await mapsClient.directions({
            params: {
                origin: req.query.from,
                destination: req.query.to,
                key: process.env.Maps_API_KEY, // Uses your secret key from .env
                mode: 'driving',
            },
        });
        const route = response.data.routes[0].legs[0];
        res.json([{ mode: 'Driving', time: route.duration.text, distance: route.distance.text }]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
