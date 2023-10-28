const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid'); // You can use a more sophisticated ID generation library for production.

const app = express();
const PORT = process.env.PORT || 5000;
const shortenedUrls = {}; // This is a simple in-memory storage. Use a database for production.

app.use(bodyParser.json());

app.post('/api/shorten', (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Please provide a valid URL.' });
  }

  const shortId = shortid.generate(); // Generate a short ID (you can use a better method in production).
  const shortenedUrl = `http://yourdomain.com/${shortId}`; // Replace with your domain.

  shortenedUrls[shortId] = originalUrl; // Store the original URL with the short ID.

  res.json({ shortenedUrl });
});

app.get('/:shortId', (req, res) => {
  const { shortId } = req.params;

  const originalUrl = shortenedUrls[shortId];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).json({ error: 'Short URL not found.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
