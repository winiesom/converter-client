// App.js

import React, { useState } from 'react';
import './styles.css';

const apiUrl = process.env.REACT_APP_API_URL;
// console.log(apiUrl);


const App = () => {
  const [formData, setFormData] = useState({
    value: '',
    conversionType: 'feetToInches', // Set a default conversion type
  });
  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const convert = async () => {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setResult(`Result: ${data.result}`);
  };

  return (
    <div className="App">
      <h1>Unit Converter</h1>
      <form>
        <label htmlFor="value">Enter Value:</label>
        <input
          type="number"
          id="value"
          name="value"
          value={formData.value}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="conversionType">Select Conversion:</label>
        <select
          id="conversionType"
          name="conversionType"
          value={formData.conversionType}
          onChange={handleInputChange}
          required
        >
        <option value="feetToInches">Feet to Inches</option>
        <option value="inchesToFeet">Inches to Feet</option>
        <option value="literToGallon">Liter to Gallon</option>
        <option value="gallonToLiter">Gallon to Liter</option>
        <option value="poundToKilogram">Pound to Kilogram</option>
        <option value="kilogramToPound">Kilogram to Pound</option>
        <option value="celsiusToFahrenheit">Celsius to Fahrenheit</option>
        <option value="fahrenheitToCelsius">Fahrenheit to Celsius</option>
        <option value="milesToKilometers">Miles to Kilometers</option>
        <option value="kilometersToMiles">Kilometers to Miles</option>
        </select>

        <button type="button" onClick={convert}>
          Convert
        </button>
      </form>

      <div id="result">{result}</div>
    </div>
  );
};

export default App;
