import React from "react";
import CountryPartial from "./CountryPartial";

const CountriesList = ({ tooLong, countriesToShow, setCurrentCountry }) => {
  if (tooLong) {
    return (
      <div className='col-span-2'>
        <h2>Too many results, can you be more specific?</h2>
      </div>
    );
  } else {
    return (
      <>
        {countriesToShow.map((country) => (
          <CountryPartial
            key={country.numericCode}
            name={country.name}
            country={country}
            setCurrentCountry={setCurrentCountry}
          />
        ))}
      </>
    );
  }
};

export default CountriesList;
