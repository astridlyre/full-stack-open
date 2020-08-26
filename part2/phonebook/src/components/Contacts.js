import React from "react";
import Contact from "./Contact";

const Contacts = ({ persons }) => (
  <section className='py-8'>
    <h4 className='font-display text-gray-900 text-lg font-bold'>
      My Contacts
    </h4>
    <ul>
      {persons.map((person) => (
        <li
          key={person.id}
          className='mb-2 py-2 px-6 bg-gray-100 rounded text-gray-900 flex justify-between items-center'>
          <Contact person={person} />
        </li>
      ))}
    </ul>
  </section>
);

export default Contacts;
