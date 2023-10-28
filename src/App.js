import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleShorten = async () => {
    try {
      const response = await axios.post('/api/shorten', { originalUrl });
      setShortenedUrl(response.data.shortenedUrl);
    } catch (error) {
      console.error('Error shortening URL', error);
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter URL to shorten"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button onClick={handleShorten}>Shorten</button>
      {shortenedUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
