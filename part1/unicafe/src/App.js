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

const Statistics = ({ category, value }) => {
  return (
    <div>
      <p>
        {category} {value}
      </p>
    </div>
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
      <Statistics category={"Good"} value={good} />
      <Statistics category={"Neutral"} value={neutral} />
      <Statistics category={"Bad"} value={bad} />
      <Statistics category={"All"} value={total} />
      <Statistics category={"Average"} value={average} />
      <Statistics category={"Positive"} value={positive} />
    </div>
  );
};

export default App;
