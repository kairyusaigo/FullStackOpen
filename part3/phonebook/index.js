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
  
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})