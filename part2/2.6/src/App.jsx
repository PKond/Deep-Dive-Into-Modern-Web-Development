import { useState } from "react";
import Names from "./components/Names";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addEntry = (event) => {
    event.preventDefault();
    
    const newPerson = {
      name: newName,
    };
    
    setPersons([...persons, newPerson]); 
    setNewName("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value); 
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => 
          <Names key={person.name} person={person}/>
        )}
      </ul>
    </div>
  );
};

export default App;
