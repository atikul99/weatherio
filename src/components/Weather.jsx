import React, { useEffect, useRef, useState } from 'react'
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'

const Weather = () => {

    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState('');

    const search = async (city) => {

        if( city === "" ){
            alert("Enter City Name");
            return;
        }
        try {

            const url = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}&aqi=no`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);

            setWeatherData({
                humidity: data.current.humidity,
                windSpeed: data.current.wind_kph,
                temperature: data.current.temp_c,
                location: data.location.name,
                icon: data.current.condition.icon
            })

        } catch (error) {
            
        }
    }

    useEffect( () => {
        search("Dhaka");
    }, [] )

  return (
    <>
      <div className="weather">
        <div className="search-bar">
            <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        search(inputRef.current.value);
                    }
                }}
            />
            <img src={searchIcon} alt="search" onClick={ () => search(inputRef.current.value) } />
        </div>
        <div className='weather-icon'>
            <img src={weatherData.icon} alt="" />
        </div>
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidityIcon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={windIcon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Weather
