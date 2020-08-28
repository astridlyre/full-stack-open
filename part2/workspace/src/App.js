import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Notes from "./components/Notes";
import axios from "axios";

// axios.get("http://localhost:3001/notes").then((response) => {
//   const notes = response.data;
//   console.log(notes);
// });

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isImportant, setImportant] = useState(false);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => alert(error.message));
  }, []);

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
    axios
      .post("http://localhost:3001/notes", noteObject)
      .catch((error) => console.log(error));
    // setNotes(notes.concat(noteObject));
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
