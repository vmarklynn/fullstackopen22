import Person from "./Person";
const Persons = ({ personArray, setPersons }) => {
  return (
    <div>
      {personArray.map((person) => (
        <Person
          person={person}
          key={person.id}
          setPersons={setPersons}
          personArray={personArray}
        />
      ))}
    </div>
  );
};

export default Persons;
