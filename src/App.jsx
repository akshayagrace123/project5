import React, { useState } from 'react'
import './App.css'
const API_KEY = "36c4d3082417226f99d971d23d739071";

export default function App() {
 const [city,setCity] = useState("");
 const [weather,setWeather] = useState(null);
 const [error,setError] = useState("");

  const getWeather = async () => {
    if(!city){
      setError("Please enter a city name");
      return;
    }
  
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      if(!response.ok) {
        throw new Error("City not found")
      }
      const data = await response.json()
      setWeather(data)
    } catch(error) {
      setError(error.message)
    }
  }
  return (
    <div className='app'>
      <div className='header'>
        <h1>Wheather App</h1>
      </div>
      <div className='section'>

      <div className='search'>
        <input type='text' placeholder='Enter a City name' value={city} onChange={(e) => setCity(e.target.value)} required/>
        
        <button type="submit" onClick={getWeather}>Submit</button>

      </div>

       {error && <p className='error'>{error}</p>}
      {weather &&(
      <div className='Weather-card'>
        <h2>{weather.name}</h2>
        <p>Temperature: {weather.main.temp}C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Weather: {weather.weather[0].description}</p>
        <p>Wind Speed: {weather.wind.speed}m/s</p>

      </div>
)}

      </div>
      <div className='footer'>
        <p> Copyright- @ Akshaya Grace</p>
      </div>
    </div>
  )
}