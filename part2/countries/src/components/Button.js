import React from "react";

const Button = ({ text, look, func = null }) => (
  <button className={look} onClick={func}>
    {text}
  </button>
);

export default Button;
