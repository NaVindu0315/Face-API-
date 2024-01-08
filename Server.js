const express = require('express');
const request = require('request');
const app = express();
app.use(express.json());

//for predefining the api key and secret
const apiKey = 'Ihp7UgfV3b7KH-aAyQl5EiStwGX5ch1B';
const apiSecret = '_kjlV-L5QjSYp9vQVP9a4VHosyehnbJ7';

app.post('/compareFaces', (req, res) => {
    const {  faceurl1, faceurl2 } = req.body;

    const formData = {
        api_key: apiKey,
        api_secret: apiSecret,
        image_url1: faceurl1,
        image_url2: faceurl2,
    };