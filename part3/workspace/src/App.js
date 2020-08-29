import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Notes from "./components/Notes";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isImportant, setImportant] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes);
      })
      .catch((error) => alert(error.message));
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: isImportant,
      id: new Date().getTime(),
    };
    noteService
      .createNote(noteObject)
      .then((returnedNote) => setNotes([returnedNote].concat(notes)))
      .catch((error) => console.log(error));
    setNewNote("");
  };

  const deleteNote = (id) => {
    noteService
      .deleteNote(id)
      .then(setNotes(notes.filter((note) => note.id !== id)))
      .catch((error) => alert(error.message));
  };

  const toggleImportant = (changedNote) => {
    noteService
      .updateNote(changedNote.id, {
        ...changedNote,
        important: !changedNote.important,
      })
      .then((reply) => {
        setNotes(
          notes.map((note) => (note.id !== changedNote.id ? note : reply))
        );
      })
      .catch((error) => alert(error.message));
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleCheckChange = () => {
    setImportant(!isImportant);
  };

  return (
    <main>
      <Notes
        title='Notes'
        notesToShow={notesToShow}
        deleteNote={deleteNote}
        toggleImportant={toggleImportant}
      />
      <Form
        showAll={showAll}
        setShowAll={setShowAll}
        addNote={addNote}
        newNote={newNote}
        handleNoteChange={handleNoteChange}
        handleCheckChange={handleCheckChange}
      />
    </main>
  );
};

export default App;
