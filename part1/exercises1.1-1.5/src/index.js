import React, { useState } from "react";
import ReactDOM from "react-dom";

const Display = ({ value }) => <span>{value}</span>;

const Button = ({ text, func }) => <button onClick={func}>{text}</button>;

const App = (props) => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => () => {
    setValue(newValue);
  };

  return (
    <div>
      <Display value={value} />
      <Button func={setToValue(1000)} text='thousand' />
      <Button func={setToValue(0)} text='zero' />
      <Button func={setToValue(value + 1)} text='increment' />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
