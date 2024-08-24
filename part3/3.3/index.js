const express = require("express");
const app = express();

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];

// Removed the incorrect log statement
// console.log("🚀 ~  person:",  person);

app.get('/api/persons', (request, response) => {
  response.send(persons);
});

app.get('/info', (request, response) => {
  const countPeople = persons.length;
  const sentence = `Phonebook has info for ${countPeople} people`;
  const currentTime = new Date().toString();
  
  response.send(`
    <p>${sentence}</p>
    <p>${currentTime}</p>
  `);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  const person = persons.find(p => id === p.id);
  if (!person) {
    return response.status(404).send({ error: 'Person not found' });
  }
  
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
