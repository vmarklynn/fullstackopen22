import { useState } from "react";

const Header = (props) => {
  return (
    <div>
      <h2>{props.text}</h2>
    </div>
  );
};

const Button = ({ setFunction, text }) => {
  return <button onClick={setFunction}>{text}</button>;
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

  const setValue = (ratingSet, ratingValue) => {
    const newValue = ratingValue + 1;
    console.log("Value of is ", newValue);
    ratingSet(newValue);
  };

  return (
    <div>
      <Header text="Give feedback" />
      <Button setFunction={() => setValue(setGood, good)} text={"Good"} />
      <Button
        setFunction={() => setValue(setNeutral, neutral)}
        text={"Neutral"}
      />
      <Button setFunction={() => setValue(setBad, bad)} text={"Bad"} />
      <Header text="Statistics" />
      <Statistics category={"Good"} value={good} />
      <Statistics category={"Neutral"} value={neutral} />
      <Statistics category={"Bad"} value={bad} />
    </div>
  );
};

export default App;
