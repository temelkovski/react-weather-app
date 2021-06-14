import React, { useState, useEffect } from 'react'
import './../assets/css/Cities.css'
import axios from 'axios'
import { api } from './../constants/ApiConstants'

export function Cities() {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(undefined)
    const [loading, setLoading] = useState(false)

    function searchWeather() {
        setLoading(true)
        axios({
            url: `${api.base}/weather?q=${city}&units=metric&appid=${api.key}`,
            method: 'GET'
        })
            .then(res => {
                setWeatherData(res.data)
                setCity('')
                setLoading(false)
            })
            .catch(err => {
                alert(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        console.log(weatherData)
    }, [weatherData])

    function dateBuilder(datum) {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let day = days[datum.getDay()]
        let date = datum.getDate()
        let month = months[datum.getMonth()]
        let year = datum.getFullYear()

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className={weatherData ? (weatherData.main.temp > 15) ? 'cities warm' : 'cities cold' : 'cities'}>
            <div className='search-box'>
                <input
                    type='text'
                    placeholder='Search City'
                    className='search-bar'
                    value={city}
                    onChange={e => { setCity(e.target.value) }}
                />
                <button className='search-button' onClick={searchWeather}>
                    Search
                </button>
            </div>
            {weatherData && loading === false &&
                <div className='location-container'>
                    <div className='location-box'>
                        <div className='location'>
                            {weatherData.name}, {weatherData.sys.country}
                        </div>
                        <div className='date'>
                            {dateBuilder(new Date())}
                        </div>
                    </div>
                    <div className='weather-box'>
                        <div className='temp'>
                            {Math.round(weatherData.main.temp)}&#8451;
                        </div>
                        <div className='weather'>
                            {weatherData.weather[0].main}
                        </div>
                    </div>
                </div>
            }
            {loading && <div className='loader'></div>}
        </div>
    )
}