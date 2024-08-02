import React, { Component } from 'react';
import axios from 'axios';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonInput: '',
      response: null,
      selectedOptions: ['numbers', 'alphabets', 'highest_alphabet'], 
      operationCode: null,
    };
  }

  handleJsonInputChange = (e) => {
    this.setState({ jsonInput: e.target.value });
  };

  handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(this.state.jsonInput);
      const res = await axios.post('https://new-frontend-ko4a.onrender.com/login', parsedJson);
      this.setState({ response: res.data });
    } catch (error) {
      console.error('Invalid JSON or server error:', error);
      alert('Invalid JSON or server error.');
    }
  };

  handleOptionChange = (e) => {
    const value = e.target.value;
    this.setState((prevState) => {
      const selectedOptions = prevState.selectedOptions.includes(value)
        ? prevState.selectedOptions.filter((option) => option !== value)
        : [...prevState.selectedOptions, value];
      return { selectedOptions };
    });
  };

  handleGetRequest = async () => {
    try {
      const res = await axios.get('https://new-frontend-ko4a.onrender.com/show');
      this.setState({ operationCode: res.data.operation_code });
    } catch (error) {
      console.error('Error fetching operation code:', error);
      alert('Error fetching operation code.');
    }
  };

  renderResponse = () => {
    const { response, selectedOptions } = this.state;
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('numbers') && response.numbers.length > 0 && (
          <div>
            <h3>Numbers</h3>
            <p>{response.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('alphabets') && response.alphabets.length > 0 && (
          <div>
            <h3>Alphabets</h3>
            <p>{response.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('highest_alphabet') && response.highest_alphabet.length > 0 && (
          <div>
            <h3>Highest Alphabet</h3>
            <p>{response.highest_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div>
        <h1>AP21110011568</h1>
        <textarea
          value={this.state.jsonInput}
          onChange={this.handleJsonInputChange}
          placeholder='Enter JSON here'
          rows='10'
          cols='50'
        />
        <button onClick={this.handleSubmit}>Submit</button>
        <div>
          <label>
            <input
              type='checkbox'
              value='numbers'
              checked={this.state.selectedOptions.includes('numbers')}
              onChange={this.handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type='checkbox'
              value='alphabets'
              checked={this.state.selectedOptions.includes('alphabets')}
              onChange={this.handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type='checkbox'
              value='highest_alphabet'
              checked={this.state.selectedOptions.includes('highest_alphabet')}
              onChange={this.handleOptionChange}
            />
            Highest Alphabet
          </label>
        </div>
        {this.renderResponse()}
        <button onClick={this.handleGetRequest}>Get Operation Code</button>
        {this.state.operationCode !== null && (
          <div>
            <h3>Operation Code</h3>
            <p>{this.state.operationCode}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Main;
