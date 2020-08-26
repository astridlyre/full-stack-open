import React, { useState } from "react";
import NewName from "./components/NewName";
import "./assets/css/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";

const App = ({ siteInfo }) => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [formName, setFormName] = useState("");
  const [formNumber, setFormNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const personsToShow = !filterInput
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filterInput.toLowerCase())
      );

  const filterContacts = (event) => {
    setFilterInput(event.target.value);
  };

  const handleNameStateChange = (event) => {
    setFormName(event.target.value);
  };

  const handleNumberStateChange = (event) => {
    setFormNumber(event.target.value);
  };

  const deleteContact = (id) => {
    let array = [];
    persons.forEach((person) => {
      if (person.id !== id) {
        array.push(person);
      }
    });
    setPersons(array);
  };

  const addNewName = (event) => {
    event.preventDefault();
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === formName) {
        alert(`${formName} is already added to The Phonebook!`);
        return;
      }
    }
    const newContact = {
      name: formName,
      number: formNumber,
      id: persons.length + 1,
    };
    setPersons([newContact].concat(persons));
    setFormName("");
    setFormNumber("");
  };

  return (
    <main className='pt-8 flex flex-col items-center relative min-h-screen'>
      <div className='p-8 max-w-screen-md bg-gray-100 bg-opacity-75 rounded'>
        <Header title={siteInfo.title} />
        <Filter filterInput={filterInput} filterContacts={filterContacts} />
        <NewName
          formName={formName}
          formNumber={formNumber}
          handleNameStateChange={handleNameStateChange}
          handleNumberStateChange={handleNumberStateChange}
          addNewName={addNewName}
        />
        <Contacts persons={personsToShow} deleteContact={deleteContact} />
        <Footer siteInfo={siteInfo} />
      </div>
    </main>
  );
};

export default App;
