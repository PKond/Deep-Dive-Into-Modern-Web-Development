import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ text, value }) => {
  return (
    <div>
      {text}: {value}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const total = good + neutral + bad;
  const average = (good * 1 + bad * -1) / total;
  const positive = total > 0 ? ((good / total) * 100).toFixed(2) + "%" : "0%";

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />

      <h2>Statistics</h2>
      {total > 0 ? (
        <>
          <Statistics text="good" value={good} />
          <Statistics text="neutral" value={neutral} />
          <Statistics text="bad" value={bad} />
          <Statistics text="total" value={total} />
          <Statistics text="average" value={average.toFixed(2)} />
          <Statistics text="positive" value={positive} />
        </>
      ) : (
        <p>No feedback given yet</p>
      )}
    </div>
  );
};

export default App;
