import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";

const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ parts }) => {
  const sum = () => {
    let array = new Array(parts.length);
    for (let i = 0; i < parts.length; i++) {
      array[i] = parts[i].exercises;
    }
    return array.reduce((a, c) => a + c);
  };

  return (
    <div className='total'>
      <h3>
        Total of <span className='accent'>{sum()}</span> exercises
      </h3>
    </div>
  );
};

const Part = (props) => {
  return (
    <div className='part'>
      <h3>{props.part.name}</h3>
      <p>Contains {props.part.exercises} exercises</p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <main>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </main>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
