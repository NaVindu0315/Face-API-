const express = require('express');
const request = require('request');
require('dotenv').config();

const app = express();
app.use(express.json());

// Load API keys from environment variables (for security)
const apiKey = process.env.FACEPLUSPLUS_API_KEY;
const apiSecret = process.env.FACEPLUSPLUS_API_SECRET;

// Define the API endpoint
app.post('/compareFaces', (req, res) => {
  const { faceurl1, faceurl2 } = req.body;

  const formData = {
    api_key: apiKey,
    api_secret: apiSecret,
    image_url1: faceurl1,
    image_url2: faceurl2,
  };

  const options = {
    url: 'https://api-us.faceplusplus.com/facepp/v3/compare',
    method: 'POST',
    formData: formData,
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    } else {
      const confvalue = JSON.parse(body).confidence;
      if (confvalue > 85) {
        res.send({ message: "same person", confidence: confvalue });
      } else {
        res.send({ message: "different person", confidence: confvalue });
      }
    }
  });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
