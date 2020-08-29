import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import CountriesList from "./components/CountriesList";
import CountryFull from "./components/CountryFull";
import axios from "axios";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [currentCountry, setCurrentCountryState] = useState(null);
  const [tooLong, setTooLong] = useState(true);
  const [message, setMessage] = useState("");
  const [currentWeather, setCurrentWeather] = useState([]);

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      setCountriesToShow([]);
      setMessage("");
      return;
    }
    const searchValueLowerCase = event.target.value.toLowerCase();
    let array = [];
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].name.toLowerCase().includes(searchValueLowerCase)) {
        array.push(countries[i]);
      }
    }
    if (array.length > 10 && !currentCountry) {
      setMessage("Too many results, can you be more specific?");
      setTooLong(true);
    } else if (array.length <= 10 && !currentCountry) {
      setTooLong(false);
      setCountriesToShow(array);
    } else if (
      countriesToShow.length === 1 &&
      !currentCountry &&
      countriesToShow[0].name === searchValue
    ) {
      setTooLong(false);
      setCurrentCountry(countriesToShow[0]);
    } else {
      return;
    }
  };

  const clearCurrentCountry = () => {
    setCurrentCountry(null);
  };

  const setCurrentCountry = (country) => {
    setSearchValue("");
    setCurrentCountryState(country);
    if (country !== null) {
      axios
        .get(`/weather/${country.capital}`)
        .then((response) => setCurrentWeather(response.data))
        .catch((error) => alert(error.message));
    }
  };

  const searchOrDetails = !currentCountry ? (
    <CountriesList
      message={message}
      tooLong={tooLong}
      countriesToShow={countriesToShow}
      setCurrentCountry={setCurrentCountry}
    />
  ) : (
    <CountryFull
      country={currentCountry}
      goBack={clearCurrentCountry}
      currentWeather={currentWeather}
    />
  );
  useEffect(() => {
    axios
      .get(`/countries`)
      .then((response) => setCountries(response.data))
      .catch((error) => alert(error.message));
  }, []);

  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <main className='mt-8 p-8 rounded-lg bg-gray-100 bg-opacity-75 sm:max-w-screen-md w-full grid grid-cols-2 gap-8'>
        <Search
          searchValue={searchValue}
          handleSearchInput={handleSearchInput}
        />
        {searchOrDetails}
      </main>
    </div>
  );
};

export default App;
