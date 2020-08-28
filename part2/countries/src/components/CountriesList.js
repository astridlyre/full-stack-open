import React from "react";
import CountryPartial from "./CountryPartial";

const CountriesList = ({
  message,
  tooLong,
  countriesToShow,
  setCurrentCountry,
}) => {
  if (!tooLong) {
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
  } else {
    return (
      <div className='col-span-2'>
        <h2>{message}</h2>
      </div>
    );
  }
};

export default CountriesList;
