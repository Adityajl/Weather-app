import React, { useState } from "react";
import api_key from "./auth";
const base_url = "https://api.openweathermap.org/data/2.5/";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  function handleClick(){
      fetch(`${base_url}weather?q=${query}&appid=${api_key}&units=metric`)
        .then(res => res.json())
        .then(result =>{
          setWeather(result)
          setQuery('')
        });
  }; 
  

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className={(typeof weather.main != 'undefined')?((weather.main.temp>16)? 'app-warm': 'app'): 'app'}>
      <main>
        <div className="search-box">
          <input
            placeholder="Search..."
            type="text"
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
        <div className='search-button'>
          <button type="button" id='btn' class="btn btn-light" onClick={handleClick}>Get weather</button>
        </div>
        {(typeof weather.main != 'undefined')?(
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°c</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>  
        ):('')}
        </main>
       </div> 
  );
}  

export default App;
