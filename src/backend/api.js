const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 80; 

app.use(cors({
  origin: 'https://countries-app-5hf6.onrender.com' 
}));

const countriesFilePath = './src/backend/data.json';

app.get('/api/countries', (req, res) => {
  fs.readFile(countriesFilePath, (error, data) => {
    if (error) {
      console.error('Error reading JSON file:', error);
      return res.status(500).json({ error: 'Error reading JSON file' });
    }

    const countries = JSON.parse(data);
    res.json(countries);
  });
});

app.get('/api/countries/:countryName', (req, res) => {
  const countryName = req.params.countryName;
  fs.readFile(countriesFilePath, (error, data) => {
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
