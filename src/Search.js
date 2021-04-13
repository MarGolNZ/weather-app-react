import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState([]);
  const [icon, setIcon] = useState(null);

  function displayWeather(response) {
    setLoaded(true);
    setWeather([
      {
        name: "temperature",
        value: `${Math.round(response.data.main.temp)}°C`
      },
      { name: "wind", value: `${response.data.wind.speed} km/H` },
      { name: "humidity", value: `${response.data.main.humidity}%` },
      { name: "description", value: response.data.weather[0].description }
    ]);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "8ea9a418f9dd13e967a728a357801a35";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          {weather.map(function (weatherElement, index) {
            return (
              <li key={index}>
                {weatherElement.name}: {weatherElement.value}
              </li>
            );
          })}
        </ul>
        <img src={icon} alt="" />
      </div>
    );
  } else {
    return form;
  }
}
