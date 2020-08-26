import React from "react";
import Button from "./Button";

const Form = ({
  addNote,
  newNote,
  showAll,
  setShowAll,
  handleNoteChange,
  handleCheckChange,
  toggleShowAll,
}) => {
  return (
    <section>
      <form>
        <div className='flex-col'>
          <input value={newNote} onChange={handleNoteChange} type='text' />
          <label htmlFor='importantCheckBox'>
            <input
              type='checkbox'
              id='importantCheckBox'
              onChange={handleCheckChange}
            />
            <span className='important'>Important</span>
            <span className='checkmark'></span>
          </label>
        </div>
        <div className='mt-2'>
          <Button text='Create Note' func={addNote} look='green' />
          <Button
            text={showAll ? "Filter by Important" : "Show All"}
            func={() => setShowAll(!showAll)}
            look='yellow'
          />
        </div>
      </form>
    </section>
  );
};

export default Form;
