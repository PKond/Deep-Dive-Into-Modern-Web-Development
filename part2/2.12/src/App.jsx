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

    const personExists = persons.some(
      (person) => person.name === newPerson.name
    );

    if (!personExists) {
      numberService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson)); 
        setNewName(""); 
        setPhone("");
      });
    } else {
      alert(`${newPerson.name} is already in the phonebook.`);
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
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
