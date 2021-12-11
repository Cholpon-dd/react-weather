import React, {useState} from 'react'
import keys from '../keys'
import './weatherApi.css';

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL
}
function WeatherApi() {

  const dataBuild = (d) => {
    let date = String(new window.Date())
    date = date.slice(3, 15);  // вырезает месяц, число, год
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
        placeholder="Search..."
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
            ""
          )}
      </main>   
    </div>
  );
}

export default WeatherApi;

