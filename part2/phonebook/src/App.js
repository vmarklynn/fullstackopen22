import { useState } from "react";
const Person = ({ person }) => {
  return <p>{person.name}</p>;
};
const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 0 }]);
  const [newName, setNewName] = useState("");
  const addName = (event) => {
    event.preventDefault();
    console.log("Add was clicked", event.target);

    const personObj = {
      name: newName,
      id: persons.length + 1,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`);
    } else {
      setPersons(persons.concat(personObj));
      setNewName("");
    }
  };

  const handleNameInsertion = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameInsertion} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Person person={person} key={person.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
