import { useState } from "react";
import { Filter, PersonForm, Persons } from "./components/";

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
      <Filter handleChange={handleFilterInsertion} />

      <h2>Add a new number</h2>
      <PersonForm
        submitHandler={addName}
        nameHandler={handleNameInsertion}
        numberHandler={handlePhoneInsertion}
      />

      <h2>Numbers</h2>
      <Persons personArray={filteredArray} />
    </div>
  );
};

export default App;
