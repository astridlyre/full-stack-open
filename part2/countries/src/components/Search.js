import React from "react";

const Search = ({ searchValue, handleSearchInput }) => (
  <section className='w-full col-span-2'>
    <div className='sm:w-1/2 sm:pr-4 w-full'>
      <h1 className='col-span-2'>Explore Countries</h1>
      <label htmlFor='search' className='mt-4 flex flex-col'>
        <span className='text-indigo-900 font-semibold'>
          To begin, just start typing:
        </span>
        <input
          type='text'
          id='search'
          className='w-full mt-2 form-input text-indigo-900'
          value={searchValue}
          onChange={handleSearchInput}
        />
      </label>
    </div>
  </section>
);

export default Search;
