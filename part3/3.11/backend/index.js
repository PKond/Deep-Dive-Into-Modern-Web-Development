const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// Your data store
let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
  { id: "5", name: "Pandelis Kondos", number: "123-456-789" },
];

// API Routes
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const countPeople = persons.length;
  const sentence = `Phonebook has info for ${countPeople} people`;
  const currentTime = new Date().toString();
  
  res.send(`
    <p>${sentence}</p>
    <p>${currentTime}</p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => id === p.id);
  if (!person) {
    return res.status(404).send({ error: "Person not found" });
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter(p => id !== p.id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }

  const nameExists = persons.some(person => person.name === body.name);
  if (nameExists) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  const newId = Math.floor(Math.random() * 10000);
  const newPerson = {
    id: String(newId),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

// Serving static files (frontend)
app.use(express.static(path.join(__dirname, 'dist')));

// Wildcard route to serve frontend for any unmatched route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
