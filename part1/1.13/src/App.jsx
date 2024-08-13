import { useState } from "react";
import Button from "./Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
    "Why did the developer go to therapy? They had too many unresolved issues.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getRandomAnecdoteIndex = (arrayLength) =>
    Math.floor(Math.random() * arrayLength);

  const handleNextAnecdote = () => {
    const randomAnecdoteIndex = getRandomAnecdoteIndex(anecdotes.length);
    setSelected(randomAnecdoteIndex);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <p>{anecdotes[selected]}</p>
	  <p>has {votes[selected]} votes</p>
      <Button onClick={handleVote} text="Vote" />
      <Button onClick={handleNextAnecdote} text="Next Anecdote" />
    </div>
  );
};

export default App;
