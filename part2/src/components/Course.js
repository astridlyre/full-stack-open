import React from "react";

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
    <section>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </section>
  );
};

export default Course;
