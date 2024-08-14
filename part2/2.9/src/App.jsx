import { useState } from "react";
import Names from "./components/Names";

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
      setPersons([...persons, newPerson]);
      setNewName("");
      setPhone("");
    } else {
      alert(`${newPerson.name} is already in the phonebook.`);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log("🚀 ~ App ~  filteredPersons :",  filteredPersons )
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with</div>
      <input type="text" onChange={handleSearchChange} value={search} />
      <form onSubmit={addEntry}>
        <div>add a new</div>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={phone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <Names key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;

