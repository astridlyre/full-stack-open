import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import quotes from "./quotes";

const Button = ({ text, handler, type }) => (
  <button onClick={handler} className={`${text} ${type}`}>
    {text}
  </button>
);

const Quote = ({ quote, author, score }) => (
  <div className='quote'>
    <h3>Quote of the day:</h3>
    <blockquote>
      <p>{quote}</p>
      <cite>
        —{author} ({score} votes)
      </cite>
    </blockquote>
  </div>
);

const TopQuote = ({ quote, author, score }) => (
  <div>
    <h3>Top voted quote:</h3>
    <blockquote>
      <p>{quote}</p>
      <cite>
        —{author} ({score} votes)
      </cite>
    </blockquote>
  </div>
);

const App = () => {
  // quotes array of objects
  const [anecdotes, setScore] = useState(quotes);

  const getTopQuote = () => {
    let num = 0;
    let index = 0;
    for (let i = 0; i < anecdotes.length; i++) {
      if (num < anecdotes[i].score) {
        num = anecdotes[i].score;
        index = i;
      }
    }
    return index;
  };

  const [topQuote, setTopQuote] = useState(anecdotes[getTopQuote()]);

  // way to get random index
  const getRandomIndex = () => {
    let currentQuoteIndex = Math.floor(Math.random() * anecdotes.length);
    setCurrentQuote([currentQuoteIndex, anecdotes[currentQuoteIndex]]);
  };

  // current quote in state
  const [currentQuote, setCurrentQuote] = useState([0, anecdotes[0]]);

  // vote button click handler
  const voteForQuote = () => {
    console.log(anecdotes);
    console.log(currentQuote);
    let state = [...anecdotes];
    state[currentQuote[0]].score += 1;
    setTopQuote(anecdotes[getTopQuote()]);
    setScore(state);
  };

  return (
    <main className='flex-center'>
      <Quote
        quote={currentQuote[1].quote}
        author={currentQuote[1].author}
        score={currentQuote[1].score}
      />
      <section className='pt-4 flex-row-center'>
        <Button text='Vote' handler={voteForQuote} type='vote' />
        <Button text='Random Quote' handler={getRandomIndex} type='next' />
      </section>
      <TopQuote
        quote={topQuote.quote}
        author={topQuote.author}
        score={topQuote.score}
      />
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
