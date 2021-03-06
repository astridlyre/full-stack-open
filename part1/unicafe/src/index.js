import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Header = ({ title, feedbackValues }) => {
  const { good, neutral, bad } = feedbackValues;

  const highestValue = () => {
    if (good > neutral && good > bad) {
      return "good-img";
    } else if (neutral > good && neutral > bad) {
      return "neutral-img";
    } else if (bad > good && bad > neutral) {
      return "bad-img";
    } else {
      return "good-img";
    }
  };

  return (
    <header className={highestValue()}>
      <h1>{title}</h1>
    </header>
  );
};

const Button = ({ text, handler }) => (
  <button onClick={handler} className={text}>
    {text}
  </button>
);

const Statistic = ({ text, value }) => (
  <span>
    {text} {value}
  </span>
);

const Statistics = ({ subheading, feedbackTypes, feedbackValues }) => {
  const { good, neutral, bad } = feedbackValues;
  const total = good + neutral + bad;
  const average = () => (total ? ((good - bad) / total).toFixed(2) : 0);
  const isFeedBack = () => (total > 0 ? true : false);

  return (
    <section className='pt-4'>
      <h2>{subheading}</h2>
      {!isFeedBack() && <div>No Feedback given</div>}
      {isFeedBack() && (
        <div className='grid-3-col'>
          <Statistic text={feedbackTypes[0]} value={good} />
          <Statistic text={feedbackTypes[1]} value={neutral} />
          <Statistic text={feedbackTypes[2]} value={bad} />
          <Statistic text='total' value={total} />
          <Statistic text='average' value={average()} />
          <Statistic
            text='positive'
            value={Math.round((good / total) * 100) + "%"}
          />
        </div>
      )}
    </section>
  );
};

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const page = {
    title: "Give Us Some Feedback",
    subheading: "Statistics",
    feedbackTypes: ["good", "neutral", "bad"],
  };

  const handleClick = (type) => () => {
    let state = { ...feedback };
    state[type] += 1;
    setFeedback(state);
    console.log(feedback);
  };

  return (
    <main>
      <Header title={page.title} feedbackValues={feedback} />
      <section className='grid-3-col pt-4'>
        <Button
          text={page.feedbackTypes[0]}
          handler={handleClick(page.feedbackTypes[0])}
        />
        <Button
          text={page.feedbackTypes[1]}
          handler={handleClick(page.feedbackTypes[1])}
        />
        <Button
          text={page.feedbackTypes[2]}
          handler={handleClick(page.feedbackTypes[2])}
        />
      </section>
      <Statistics
        subheading={page.subheading}
        feedbackTypes={page.feedbackTypes}
        feedbackValues={feedback}
      />
      <footer>Copyright My Awesome Feedback Page</footer>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
