import React, { useState, useEffect } from "react";
import NewName from "./components/NewName";
import "./assets/css/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import numberService from "./services/numbers";

const App = ({ siteInfo }) => {
  const [persons, setPersons] = useState([]);
  const [formName, setFormName] = useState("");
  const [formNumber, setFormNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const refreshContacts = () => {
    numberService
      .getAll()
      .then((initialContacts) => setPersons(initialContacts))
      .catch((error) => alert(error.message));
  };

  useEffect(refreshContacts, []);

  const deleteContact = (id) => {
    let contactToDelete = persons.find((person) => person.id === id);
    if (
      window.confirm(
        `Do you really want to delete ${contactToDelete.name} from your phonebook?`
      )
    ) {
      numberService
        .deleteNumber(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)))
        .catch((error) => alert(error.message));
    } else {
      return;
    }
  };

  const updateContact = (contactToUpdate, newNumber) => {
    numberService
      .updateNumber(contactToUpdate.id, {
        ...contactToUpdate,
        number: newNumber,
      })
      .then((updatedPerson) => {
        setPersons(
          persons.map((p) => (p.id !== updatedPerson.id ? p : updatedPerson))
        );
        setFormName("");
        setFormNumber("");
      })
      .catch((error) => alert(error.message));
  };

  const addNewName = (event) => {
    event.preventDefault();
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase() === formName.toLowerCase()) {
        if (
          window.confirm(
            `${persons[i].name} already exists! Would you like to update their number instead?`
          )
        ) {
          updateContact(persons[i], formNumber);
          return;
        } else {
          return;
        }
      }
    }
    const newContact = {
      name: formName,
      number: formNumber,
      id: new Date().getTime(),
    };
    numberService
      .createNumber(newContact)
      .then((newNumber) => setPersons([newNumber].concat(persons)))
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
