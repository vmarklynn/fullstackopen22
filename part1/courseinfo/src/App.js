const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercise={props.exercise1} />
      <Part part={props.part2} exercise={props.exercise2} />
      <Part part={props.part3} exercise={props.exercise3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises: {props.ex1 + props.ex2 + props.ex3}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}




const App = () => {
  const course = "Half stack application development"
  const part1 = {
    name: "Fundamentals of React:",
    exercises: 10
  }

  const part2 = {
    name: "Using props to pass data:",
    exercises: 7
  }

  const part3 = {
    name: "State of a component",
    exercises: 14
  }

  return (
    <div>
      <Header name={course} />
      <Content part1={part1.name} exercise1={part1.exercises} part2={part2.name} exercise2={part2.exercises} part3={part3.name} exercise3={part3.exercises} />
      <Total ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises} />
    </div>
  )
}

export default App;
