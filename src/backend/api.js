const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 4040;

app.use(cors());

const countries = './src/backend/data.json';

app.get('/api/countries', (req, res) => {

  fs.readFile(countries, (error, data) => {
    if (error) {
      console.error('Error reading JSON file:', error);
      return res.status(500).json({ error: 'Error reading JSON file' });
    }

    const jsonData = JSON.parse(data);

    res.json(jsonData);
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
