import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import numberService from "./services/numbers";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  useEffect(() => {
    numberService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

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
      numberService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setPhone("");

          setMessage(`Added ${returnedPerson.name}`);
          setMessageType("success");

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage("Error adding person. Please try again.");
          setMessageType("error");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
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

            setMessage(`Updated ${returnedPerson.name}'s number`);
            setMessageType("success");

            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setMessage(
              `Information of ${existingPerson.name} has already been removed from server.`
            );
            setMessageType("error");

            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );

            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
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
