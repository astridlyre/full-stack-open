import React from "react";
import Note from "./Note";

const Notes = ({ notesToShow, title, deleteNote }) => (
  <section>
    <h1>{title}</h1>
    <ul className='part'>
      {notesToShow.map((note) => (
        <Note key={note.id} note={note} deleteNote={deleteNote} />
      ))}
    </ul>
  </section>
);

export default Notes;
