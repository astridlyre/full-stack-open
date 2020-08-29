import React from "react";
import Button from "./Button";

const Note = ({ note, deleteNote, setImportantServer }) => {
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
      <div className='flex-row-between'>
        <span className='date'>{formattedDate()}</span>
        <div>
          <Button
            text={note.important ? "Not important" : "Important"}
            look='yellow'
            func={() => setImportantServer(note, !note.important)}
          />
          <Button text='Delete' func={() => deleteNote(note.id)} look='red' />
        </div>
      </div>
    </li>
  );
};

export default Note;
