import React from "react";

const Top = ({ anecdote, votes }) => {
  if (votes === 0) {
    return <div>No votes yet</div>;
  }

  return (
    <div>
      <h2>Anecdote with Most Votes</h2>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </div>
  );
};

export default Top;
