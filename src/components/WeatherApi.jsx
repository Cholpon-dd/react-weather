import React, { useState, useEffect, useRef } from 'react';
import keys from '../keys';
import './weatherApi.css';
import { init } from 'ityped';
import { TiWeatherCloudy } from 'react-icons/ti';
import { TiWeatherSunny } from 'react-icons/ti';
import { TiWeatherShower } from 'react-icons/ti';
import { TiWeatherSnow } from 'react-icons/ti';
import { TiWeatherPartlySunny } from 'react-icons/ti';

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL
}
function WeatherApi() {

  const animatedTextRef = useRef();

  useEffect(() => {
    init(animatedTextRef.current, {
      showCursor: false,
      backDelay: 1600,
      backSpeed: 60,
      strings: ['Weather Forecast'],
    })
  },[])

  const dataBuild = (d) => {
    let date = String(new window.Date())
    date = date.slice(3, 15);  
    return date
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
       .then((res) => res.json())
       .then((results) => {
         setQuery('');
         setWeather(results)
         
       })
    }
  }

  return (
    <div className={
      typeof weather.main != "undefined" ? weather.main.temp > 18 ? "WeatherApi hot" : "WeatherApi cold" : "WeatherApi"}>
      <main>
        <div className="search-container">
        <input className="search-bar"
        type="text" 
        placeholder="Search city"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
         />
         </div>
         {typeof weather.main != "undefined" ? (
        <div>
         <div className="location-container">
           <div className="location">
             {weather.name}, {weather.sys.country}
           </div>
           <div className="date">
            {dataBuild(new Date())}
           </div>
           </div>
           <div className="weather-container">
             <div className="temperature">
               {Math.round(weather.main.temp)}&deg;C
             </div>
             <div className="weather">
               {weather.weather[0].main}
             </div>
           </div>
         </div>  
          ) : (
            <>
            <h2 ref={animatedTextRef} className="main-theme">
            </h2>
            <TiWeatherCloudy className='icons'/>
            <TiWeatherSunny className='icons'/>
            <TiWeatherShower className='icons'/>
            <TiWeatherPartlySunny className='icons'/>
            <TiWeatherSnow className='icons'/>
            </>
          )}
      </main>   
    </div>
  );
}

export default WeatherApi;

