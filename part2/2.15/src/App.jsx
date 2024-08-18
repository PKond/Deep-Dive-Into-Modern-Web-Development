import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import numberService from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log("🚀 ~ App ~  filteredPersons :", filteredPersons);

  useEffect(() => {
    numberService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const addEntry = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: phone,
    };

    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (!existingPerson) {
      numberService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setPhone("");
      });
    } else {
      const replaceNumber = window.confirm(
        `${newPerson.name} is already in the phonebook, replace the old number with a new one?`
      );
      if (replaceNumber) {
        const updatedPerson = { ...existingPerson, number: phone };

        numberService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setPhone("");
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            alert("The person could not be updated on the server.");
          });
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addEntry}
        nameValue={newName}
        nameOnChange={handleNameChange}
        phoneValue={phone}
        phoneOnChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} setPersons={setPersons} />
    </div>
  );
};

export default App;
