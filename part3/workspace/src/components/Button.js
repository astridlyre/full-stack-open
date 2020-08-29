import React from "react";

const Button = ({ text, func, look }) => (
  <button type='button' className={look} onClick={func}>
    {text}
  </button>
);

export default Button;
