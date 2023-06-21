import Person from "./Person";
const Persons = ({ personArray }) => {
  return (
    <div>
      {personArray.map((person) => (
        <Person person={person} key={person.id} />
      ))}
    </div>
  );
};

export default Persons;
