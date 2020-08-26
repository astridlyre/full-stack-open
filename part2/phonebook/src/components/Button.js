import React from "react";

const Button = ({ text, look, func = null }) => (
  <button onClick={func} className={look}>
    {text}
  </button>
);

export default Button;
