import React from "react";
import Contact from "./Contact";
import Button from "./Button";

const Contacts = ({ persons, deleteContact }) => {
  const icon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='w-4 h-4'>
      <line x1='18' y1='6' x2='6' y2='18'></line>
      <line x1='6' y1='6' x2='18' y2='18'></line>
    </svg>
  );
  return (
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
            <Button
              text={icon}
              look='p-1 bg-red-700 hover:bg-red-900 text-red-100 rounded'
              func={() => deleteContact(person.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Contacts;
