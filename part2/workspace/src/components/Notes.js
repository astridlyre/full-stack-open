import React from "react";
import Note from "./Note";

const Notes = ({ notesToShow, title, deleteNote, setImportantServer }) => (
  <section>
    <h1>{title}</h1>
    <ul className='part'>
      {notesToShow.map((note) => (
        <Note
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          setImportantServer={setImportantServer}
        />
      ))}
    </ul>
  </section>
);

export default Notes;
