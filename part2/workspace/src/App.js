import React, { useState } from "react";
import Form from "./components/Form";
import Notes from "./components/Notes";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");
  const [isImportant, setImportant] = useState(false);
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: isImportant,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleCheckChange = () => {
    setImportant(!isImportant);
  };

  return (
    <main>
      <Notes title='Notes' notesToShow={notesToShow} />
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
