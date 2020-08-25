import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => <h1>{props.course}</h1>;
const Content = (props) => (
  <>
    <p>
      {props.part[1]} {props.exercises[1]}
    </p>
    <p>
      {props.part[2]} {props.exercises[2]}
    </p>
    <p>
      {props.part[3]} {props.exercises[3]}
    </p>
  </>
);
const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.exercises[1] + props.exercises[2] + props.exercises[3]}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part = {
    "1": "Fundamentals of React",
    "2": "Using props to pass data",
    "3": "State of a component",
  };
  const exercises = { "1": 10, "2": 7, "3": 14 };

  return (
    <div>
      <Header course={course} />
      <Content part={part} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
