import React from "react";
import numberService from "../services/numbers";

const Persons = ({ filteredPersons, setPersons }) => {
  const handleDeleteClick = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      numberService
        .deletePerson(id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          alert("This person was already deleted from the server.");
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
        });
    }
  };

  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDeleteClick(person.id, person.name)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
