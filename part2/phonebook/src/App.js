import { useState } from "react";

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.phoneNum}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNum: "206-123-2234", id: 1 },
    { name: "James Bond", phoneNum: "206-123-4444", id: 2 },
    { name: "Robbie Marklynn", phoneNum: "206-215-2465", id: 3 },
  ]);
  const [filterName, setFilterName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const addName = (event) => {
    event.preventDefault();
    console.log("Add was clicked", event.target);

    const personObj = {
      name: newName,
      phoneNum: newNumber,
      id: persons.length + 1,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`);
    } else {
      setPersons(persons.concat(personObj));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameInsertion = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneInsertion = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInsertion = (event) => {
    console.log(event.target.value);
    setFilterName(event.target.value);
  };

  const filteredArray = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter by: <input onChange={handleFilterInsertion} />
      </div>

      <h2>Add a new number</h2>

      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameInsertion} />
        </div>
        <div>
          number: <input onChange={handlePhoneInsertion} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredArray.map((person) => (
          <Person person={person} key={person.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
