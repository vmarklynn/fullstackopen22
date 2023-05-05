import { useState } from "react";

const Header = (props) => {
  return (
    <div>
      <h2>{props.text}</h2>
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = (props) => {
  const [good, neutral, bad, all, average, positive] = props.values;
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={positive + "%"} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);
  const [positive, setPositive] = useState(0);
  const resultArray = [good, neutral, bad, total, average, positive];
  const incrementValue = (ratingSet, ratingValue, categoryNumber) => {
    const newValue = ratingValue + 1;
    const newTotal = total + 1;
    console.log("Value is ", newValue);
    ratingSet(newValue);
    setTotal(newTotal);
    switch (categoryNumber) {
      case 1:
        setAverage((newValue - bad) / newTotal);
        setPositive((newValue / newTotal) * 100);
        break;
      case 2:
        setAverage((good - newValue) / newTotal);
        setPositive((good / newTotal) * 100);
        break;
      default:
        setPositive((good / newTotal) * 100);
    }
  };

  return (
    <div>
      <Header text="Give feedback" />
      <Button onClick={() => incrementValue(setGood, good, 1)} text={"Good"} />
      <Button
        onClick={() => incrementValue(setNeutral, neutral)}
        text={"Neutral"}
      />
      <Button onClick={() => incrementValue(setBad, bad, 2)} text={"Bad"} />
      <Header text="Statistics" />
      <Statistics values={resultArray} />
    </div>
  );
};

export default App;
