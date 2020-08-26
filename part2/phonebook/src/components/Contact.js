import React from "react";

const Contact = ({ deleteContact, person }) => (
  <div className='mr-4 flex flex-row justify-between w-full'>
    <h4 className='font-semibold text-lg'>{person.name}</h4>
    <h6 className='font-semibold text-sm'>{person.number}</h6>
  </div>
);

export default Contact;
