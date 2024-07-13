import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Fetch random dog image from Dog CEO API
app.get('/api/dog', async (req, res) => {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching dog data:', error);
    res.status(500).json({ message: 'Error fetching dog data' });
  }
});

// Fetch dog breeds list from Dog CEO API
app.get('/api/breeds', async (req, res) => {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching dog breeds:', error);
    res.status(500).json({ message: 'Error fetching dog breeds' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
