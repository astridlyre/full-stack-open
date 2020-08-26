import React from "react";

const Note = ({ note }) => {
  const formattedDate = () => {
    return note.date.split("T")[0];
  };
  return (
    <li>
      {note.important ? (
        <h3 className='important'>{note.content}</h3>
      ) : (
        <h3>{note.content}</h3>
      )}
      <span className='date'>{formattedDate()}</span>
    </li>
  );
};

export default Note;
