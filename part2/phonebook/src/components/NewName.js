import React from "react";
import Button from "./Button";

const NewName = ({
  formName,
  formNumber,
  handleNameStateChange,
  handleNumberStateChange,
  addNewName,
}) => (
  <section className='py-8'>
    <form
      onSubmit={addNewName}
      className='p-4 font-display bg-red-700 rounded text-red-100 font-semibold font-sm grid grid-cols-2 gap-4'>
      <label htmlFor='name' className='flex flex-col'>
        <span>Name</span>
        <input
          id='name'
          type='text'
          max='30'
          className='form-input'
          value={formName}
          onChange={handleNameStateChange}
        />
      </label>
      <label htmlFor='number' className='flex flex-col'>
        <span>Number</span>
        <input
          id='number'
          type='text'
          max='13'
          className='form-input'
          value={formNumber}
          onChange={handleNumberStateChange}
        />
      </label>
      <div className='text-right col-span-2'>
        <Button
          text='Add Number'
          look='py-2 px-8 bg-gray-900 text-gray-100 text-sm font-semibold font-display rounded hover:bg-gray-800'
        />
      </div>
    </form>
  </section>
);

export default NewName;
