import React from "react";

const Filter = ({ filterInput, filterContacts }) => (
  <div className='mt-8 font-display text-gray-900 font-semibold font-sm grid grid-cols-2 gap-4'>
    <label htmlFor='filter' className='flex flex-col'>
      <span>Search by Name:</span>
      <input
        type='text'
        id='filter'
        className='form-input'
        value={filterInput}
        onChange={filterContacts}
      />
    </label>
  </div>
);

export default Filter;
