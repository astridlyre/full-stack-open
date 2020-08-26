import React from "react";

const Contact = ({ deleteContact, person }) => (
  <>
    <h4 className='font-semibold text-lg'>{person.name}</h4>
    <h6 className='font-semibold text-sm'>{person.number}</h6>
  </>
);

export default Contact;
