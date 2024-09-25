import React, { useEffect,useRef,useState } from 'react'
import searchimg from '../Assets/search.png'
import humidity from '../Assets/humidity.png'
import wind from '../Assets/wind.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
const Weather = () => {

    const [weatherData, setWeatherData] = useState(false);
     
    const inputRef =useRef()
    const allIcons ={
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search =async(city)=>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=26c70779533cff9272f00b2b978fa54c`;
      
      const response = await fetch(url);
      const data = await response.json()
      console.log(data)
      const icon =allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed: data.wind.speed,
        tempreture:Math.floor(data.main.temp),
        location: data.name,
        icon : icon  
        

      })
        } catch (error) {
            
        }

    }

    useEffect(() => {
    
    search("london")
      
    }, [])
    
  return (
    <div className='w-90 p-5 bg-slate-400 flex rounded-lg  justify-center'>
        <div className=' p-4 '>
            <div className='flex  gap-4'>
                <input ref={inputRef} type="text" placeholder='search' className='w-30 h-10 text-center  border rounded-full border-neutral-800 ' />
                <img src={searchimg} alt="search" className=' cursor-pointer p-2 bg-white rounded-full ' onClick={()=>search(inputRef.current.value)} />
                 
            </div>
            <img src={weatherData.icon} alt="" />
            <p className='text-3xl text-white'>{weatherData.tempreture}°C</p>
            <p  className='text-xl text-white'>{weatherData.location}</p>

            <div className='flex flex-row justify-between p-5'>
                <div className='p-2 text-xl text-white'>
                    <img src={humidity} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                    </div>
                </div>
                <div className='p-2 text-l text-white'>
                    <img src={wind} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} km/hr</p>
                </div>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather