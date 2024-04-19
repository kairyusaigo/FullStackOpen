const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

let options = {
  weekday: "short",
  month: "short",
  year: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "America/Toronto",
  timeZoneName: "long",
};

app.get('/info', (request, response) => {
  response.send(
    `<p>
      Phonebook has info for ${persons.length} people <br/>
      ${new Intl.DateTimeFormat("en-US", options).format(new Date())} 
    </p>`
  )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  //Find the matched id
  const person = persons.find(person => {
    return person.id === id
  })

  if (person) {
      response.json(person)
  } else {
      response.status(404).end()
  }
})

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}


app.post('/api/persons', (request, response) => {
  const body = request.body
  
  const person = {
    name: body.name,
    number: body.number,
    id: getRandomInt(1000,99999),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

   //Filter out the matched id
   persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})
  
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})