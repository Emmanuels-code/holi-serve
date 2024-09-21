// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// We Load holidays data from the JSON file
const holidaysFilePath = path.join(__dirname, 'holidays.json');
let holidaysData = {};

// Read the holidays JSON file and parse it into the holidaysData object
fs.readFile(holidaysFilePath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading holidays.json file:', err);
        process.exit(1);
    }
    holidaysData = JSON.parse(data);
});

// Route to get the holiday for a specific date
app.get('/holiday', (req, res) => {
    const date = req.query.date;

    // Validate the date / request proper formatting
    if (!date) {
        return res.status(400).json({ error: 'Please provide a date in the format YYYY-MM-DD.' });
    }

    // Check if the date exists in the holidaysData
    const holiday = holidaysData[date];

    if (holiday) {
        res.json({ date: date, holiday: holiday });
    } else {
        res.json({ date: date, holiday: 'No public holiday on this date.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
