import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personsServices
      .getAll()
      .then(returnPersons => {
        setPersons(returnPersons)
      })
  }, [])

  const personToShow = (filter=='')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const isFound = persons.some(person=> person.name === newName)
    if (isFound) {
      alert(`${newName} is already added to phonebook`);
    } else {
      // setPersons(persons.concat(personObject))
      personsServices
        .create(personObject)
        .then(returnPersons => {
          console.log(returnPersons)
          setPersons(personToShow.concat(returnPersons))
        })
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} setFilter={setFilter}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={personToShow}/>
    </div>
  )
  
}

export default App