import React, { Component } from 'react';
import axios from 'axios';

class ShortenURL extends Component {
  state = {
    longUrl: 'http://www.mashape.com',
    shortenedUrl: '',
  };

  handleShortenURL = async () => {
    try {
      const response = await axios.get('https://ismaelc-bitly.p.rapidapi.com/v3/shorten', {
        params: {
          login: '<REQUIRED>',
          apikey: '<REQUIRED>',
          longUrl: this.state.longUrl,
        },
        headers: {
          'X-RapidAPI-Key': '3356947f96mshad23da2bc1213c2p1e8035jsn72f377f04a18',
          'X-RapidAPI-Host': 'ismaelc-bitly.p.rapidapi.com',
        },
      });

      this.setState({ shortenedUrl: response.data.data.url });
    } catch (error) {
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    this.setState({ longUrl: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>URL Shortener</h1>
        <div>
          <label>Long URL: </label>
          <input
            type="text"
            value={this.state.longUrl}
            onChange={this.handleInputChange}
          />
        </div>
        <button onClick={this.handleShortenURL}>Shorten URL</button>
        {this.state.shortenedUrl && (
          <div>
            <p>Shortened URL: {this.state.shortenedUrl}</p>
          </div>
        )}
      </div>
    );
  }
}

export default ShortenURL;
