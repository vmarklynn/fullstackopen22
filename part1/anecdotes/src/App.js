import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Anecdote = ({ anecdoteText, anecdoteVote }) => {
  return (
    <div>
      <p>{anecdoteText}</p>
      <p>Has {anecdoteVote} votes.</p>
    </div>
  );
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [voteArray, setVoteArray] = useState(
    new Array(anecdotes.length).fill(0)
  );
  const randomGenerator = (max) => {
    const randomIndex = Math.floor(Math.random() * max);
    console.log(randomIndex);
    setSelected(randomIndex);
  };

  const addVotes = (voteArray, index) => {
    const newVotes = [...voteArray];
    newVotes[index] += 1;
    console.log(newVotes[index]);
    setVoteArray(newVotes);
  };

  const currentMaxIndex = voteArray.indexOf(Math.max(...voteArray));

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote
        anecdoteText={anecdotes[selected]}
        anecdoteVote={voteArray[selected]}
      />
      <div>
        <Button text="Vote" onClick={() => addVotes(voteArray, selected)} />
        <Button
          text="Next anecdote"
          onClick={() => randomGenerator(anecdotes.length)}
        />
      </div>
      <Header text="Anecdote with most votes" />
      <Anecdote
        anecdoteText={anecdotes[currentMaxIndex]}
        anecdoteVote={voteArray[currentMaxIndex]}
      />
    </div>
  );
};

export default App;
