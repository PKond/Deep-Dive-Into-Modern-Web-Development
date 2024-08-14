import { useState } from "react";
import Names from "./components/Names";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" , number: "112-113-114"}]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");

  const addEntry = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
	  number: phone
    };
    console.log("🚀 ~ addEntry ~  newPerson:",  newPerson)

    const personExists = persons.some(
      (person) => person.name === newPerson.name
    );
    console.log("🚀 ~ addEntry ~ personExists:", personExists);

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
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
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
        {persons.map((person) => (
          <Names key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
