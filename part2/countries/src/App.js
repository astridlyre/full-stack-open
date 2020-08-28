import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import CountriesList from "./components/CountriesList";
import axios from "axios";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [tooLong, setTooLong] = useState(null);

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value);
    let array = [];
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
        array.push(countries[i]);
      }
    }
    setCountriesToShow(array);
    if (countriesToShow.length > 10 && !currentCountry) {
      setTooLong(true);
    } else if (
      countriesToShow.length < 10 &&
      countriesToShow.length > 1 &&
      !currentCountry
    ) {
      setTooLong(false);
    } else if (!searchValue || currentCountry) {
      setTooLong(null);
    }
  };

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then((response) => setCountries(response.data))
      .catch((error) => alert(error.message));
  }, []);

  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <main className='mt-8 p-8 rounded-lg bg-gray-100 bg-opacity-75 sm:max-w-screen-md w-full grid grid-cols-2 gap-4'>
        <Search
          searchValue={searchValue}
          handleSearchInput={handleSearchInput}
        />
        <CountriesList
          tooLong={tooLong}
          countriesToShow={countriesToShow}
          setCurrentCountry={setCurrentCountry}
        />
      </main>
    </div>
  );
};

export default App;
