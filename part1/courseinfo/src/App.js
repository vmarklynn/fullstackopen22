const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const Content = (props) => {
  const [first, second, third] = props.parts;
  return (
    <div>
      <Part part={first.name} exercise={first.exercises} />
      <Part part={second.name} exercise={second.exercises} />
      <Part part={third.name} exercise={third.exercises} />
    </div>
  );
};

const Total = (props) => {
  const [first, second, third] = props.parts;
  return (
    <div>
      <p>
        Number of exercises:{" "}
        {first.exercises + second.exercises + third.exercises}
      </p>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  );
};

const App = () => {
  const course = "Half stack application development";
  const parts = [
    { name: "Fundamentals of React", exercises: 10 },
    { name: "Using props to pass data", exercises: 7 },
    { name: "State of a component", exercises: 14 },
  ];

  return (
    <div>
      <Header name={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
