const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  const isFound = persons.some(person => person.name === body.name)
  if (isFound) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: getRandomInt(1000,99999),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.status(201).json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  //Filter out the matched id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  const id = Number(request.params.id)

  const personObject = {
    id: id,
    name: body.name,
    number: body.number
  }

  console.log('personObject:', personObject)
  console.log('before mapping:', persons)
  persons = persons.map(person => person.id !== id ? person : personObject)
  console.log('after mapping:', persons)

  response.status(200).json(personObject)
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})