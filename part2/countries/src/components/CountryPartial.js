import React from "react";
import Button from "./Button";

const CountryPartial = ({ name, country, setCurrentCountry }) => (
  <div className='col-span-2 sm:col-span-1 flex items-center justify-between'>
    <h4 className='text-indigo-900 font-semibold text-sm'>{name}</h4>
    <Button
      text='View'
      look='ml-4 btn'
      func={() => setCurrentCountry(country)}
    />
  </div>
);

export default CountryPartial;
