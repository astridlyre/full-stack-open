import React from "react";
import Button from "./Button";

const CountryFull = ({ country, goBack, currentWeather }) => (
  <div className='flex items-center justify-between col-span-2 grid grid-cols-2 gap-8'>
    <h2 className='col-span-2'>{country?.name}</h2>

    <ul className='flex flex-col h-full justify-start text-indigo-900'>
      <li className='grid grid-cols-2 gap-4'>
        <span className='font-semibold mb-2'>Capital:</span>
        <span>{country?.capital}</span>
      </li>
      <li className='grid grid-cols-2 gap-4'>
        <span className='font-semibold mb-2'>Population:</span>
        <span>{country?.population}</span>
      </li>
      <li className='grid grid-cols-2 gap-4'>
        <span className='font-semibold mb-2'>Land area:</span>
        <span>{country?.area} km²</span>
      </li>
      {country?.currencies[0].name && (
        <li className='grid grid-cols-2 gap-4'>
          <span className='font-semibold mb-2'>Currency:</span>
          <span>{country?.currencies[0].name}</span>
        </li>
      )}
      {country?.languages && (
        <li className='grid grid-cols-2 gap-4'>
          <span className='font-semibold mb-2'>Languages:</span>
          <ul>
            {country?.languages.map((language, i) => (
              <li key={i} className='flex justify-between'>
                <span>&middot; {language.name}</span>
              </li>
            ))}
          </ul>
        </li>
      )}
    </ul>
    <img src={country?.flag} alt='Flag' />
    <div className='text-indigo-900 grid grid-cols-2 gap-4'>
      <h2 className='col-span-2'>Weather in {country?.capital}:</h2>
      <div className='flex flex-col'>
        <span className='font-semibold'>Temperature</span>
        <span>{currentWeather?.current?.temperature} °C</span>
      </div>
      <div className='flex flex-col'>
        <span className='font-semibold'>Observed at</span>
        <span>{currentWeather?.current?.observation_time}</span>
      </div>
      <div className='flex flex-col'>
        <span className='font-semibold'>Wind</span>
        <span>{currentWeather?.current?.wind_speed} km/h</span>
      </div>
      <div className='flex flex-col'>
        <span className='font-semibold'>Wind direction</span>
        <span>{currentWeather?.current?.wind_dir}</span>
      </div>
      <span className='text-lg font-semibold'>
        {currentWeather?.current?.weather_descriptions[0]}
      </span>
      <img
        src={currentWeather?.current?.weather_icons[0]}
        alt='Current weather'
      />
    </div>
    <div className='col-span-2 flex justify-end'>
      <Button text='Go Back' look='btn col-span-1 w-1/4' func={goBack} />
    </div>
  </div>
);

export default CountryFull;
