import Names from './Names';

const Persons = ({ filteredPersons }) => {
  return (
    <>
      <ul>
        {filteredPersons.map((person) => (
          <Names key={person.name} person={person} />
        ))}
      </ul>
    </>
  );
};
export default Persons;
