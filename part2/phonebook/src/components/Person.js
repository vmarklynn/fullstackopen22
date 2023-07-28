import personService from "../services/persons";

const Person = ({ person, setPersons, personArray }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
        <button
          onClick={() => {
            if (window.confirm(`Delete ${person.name}?`)) {
              personService.removePerson(person.id);
              setPersons(
                personArray.filter((arrayPerson) => {
                  return arrayPerson.id !== person.id;
                })
              );
            }
          }}
        >
          delete
        </button>
      </p>
    </div>
  );
};

export default Person;
