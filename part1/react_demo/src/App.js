const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old </p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      Greeting app created by <a href='https://github.com/vmarklynn>'>vmarklynn</a>
    </div>
  )
}



const App = () => {
  const name = "Peter"
  const age = 10
  // const now = new Date()
  // const a = 10
  // const b = 20

  // return (
  //   <div>
  //     <p>Hello world, it is now {now.toString()}</p>
  //     <p>
  //       {a} plus {b} is {a + b}
  //     </p>
  //   </div>
  // )
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Anya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  )
}

export default App