import { useEffect, useState } from "react";
import { Filter, PersonForm, Persons } from "./components/";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    console.log("effect");

    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    console.log("Add was clicked", event.target);

    const personObj = {
      name: newName,
      phoneNum: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      if (newNumber) {
        // Make HTML PUT handleFilterInsertion
        if (
          window.confirm(
            `${newName} already exists in the Phonebook. Replace current entry with new number?`
          )
        ) {
          //TODO: Create appropriate HTTP Put request here.
          const personToUpdate = persons.find(
            (person) => person.name.toLowerCase() === newName.toLowerCase()
          );
          personService
            .replaceNumber(personToUpdate.id, {
              ...personToUpdate,
              phoneNum: newNumber,
            })
            .then((updatedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== updatedPerson.id ? person : updatedPerson
                )
              );
              setNewName("");
              setNewNumber("");
              event.target.reset();
            });
        }
      } else {
        alert(`${newName} is already added to the phonebook.`);
      }
    } else {
      // create then render
      personService.create(personObj).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
        event.target.reset();
      });
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

      <h3>Add a new number</h3>
      <PersonForm
        submitHandler={addName}
        nameHandler={handleNameInsertion}
        numberHandler={handlePhoneInsertion}
      />

      <h2>Numbers</h2>
      <Persons personArray={filteredArray} setPersons={setPersons} />
    </div>
  );
};

export default App;
