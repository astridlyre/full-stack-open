import React from "react";
import Note from "./Note";

const Notes = ({ notesToShow, title }) => (
  <section>
    <h1>{title}</h1>
    <ul className='part'>
      {notesToShow.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  </section>
);

export default Notes;
