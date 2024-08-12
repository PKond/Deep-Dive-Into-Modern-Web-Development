import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const FeedbackStat = ({ text, value }) => {
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

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />
      
      <h2>Statistics</h2>
      <FeedbackStat text="good" value={good} />
      <FeedbackStat text="neutral" value={neutral} />
      <FeedbackStat text="bad" value={bad} />
    </div>
  );
};

export default App;

