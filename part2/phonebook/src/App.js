import React, { useState, useEffect } from "react";
import NewName from "./components/NewName";
import "./assets/css/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import axios from "axios";

const App = ({ siteInfo }) => {
  const [persons, setPersons] = useState([]);
  const [formName, setFormName] = useState("");
  const [formNumber, setFormNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const refreshContacts = () => {
    axios
      .get("http://localhost:3001/numbers")
      .then((response) => setPersons(response.data))
      .catch((error) => alert(error.message));
  };

  useEffect(refreshContacts, []);

  const deleteContact = (id) => {
    axios
      .delete(`http://localhost:3001/numbers/${id}`)
      .then(refreshContacts())
      .catch((error) => alert(error.message));
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
    axios
      .post("http://localhost:3001/numbers", newContact)
      .then(refreshContacts())
      .catch((error) => alert(error.message));
    setFormName("");
    setFormNumber("");
  };

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
