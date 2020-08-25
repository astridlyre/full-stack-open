import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => <h1>{props.course}</h1>;
const Part = (props) => (
  <p>
    {props.part} {props.exercise}
  </p>
);
const Content = (props) => (
  <div>
    <Part part={props.part[1]} exercise={props.exercises[1]} />
    <Part part={props.part[2]} exercise={props.exercises[2]} />
    <Part part={props.part[3]} exercise={props.exercises[3]} />
  </div>
);
const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.exercises[3] + props.exercises[2] + props.exercises[3]}
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
    <>
      <Header course={course} />
      <Content part={part} exercises={exercises} />
      <Total exercises={exercises} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
