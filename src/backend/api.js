const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const buildPath = path.join(__dirname, 'data.json'); 
app.use(express.static(buildPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/countries', (req, res) => {
  fs.readFile(buildPath, (error, data) => {
    if (error) {
      console.error('Error reading JSON file:', error); 
      return res.status(500).json({ error: 'Error reading JSON file', details: error.message });
    }

    const countries = JSON.parse(data);
    res.json(countries);
  });
});

app.get('/api/countries/:countryName', (req, res) => {
  const countryName = req.params.countryName;
  fs.readFile(buildPath, (error, data) => {
    if (error) {
      console.error('Error reading JSON file:', error);
      return res.status(500).json({ error: 'Error reading JSON file' });
    }

    const countries = JSON.parse(data);
    const country = countries.find(country => country.name.toLowerCase() === countryName.toLowerCase());

    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
