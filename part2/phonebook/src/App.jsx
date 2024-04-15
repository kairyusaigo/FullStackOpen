import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personsServices from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setError] = useState(false)

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

    const isFound = persons.some(person => person.name === newName)
    if (isFound) {
      const currentPerson = persons.find(person => person.name === newName)
      console.log (currentPerson)
      const question = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(question)) {
        personsServices
          .update(currentPerson.id, personObject)
          .then(returnPersons => {
            setPersons(persons.map(person => person.id !== currentPerson.id ? person : returnPersons))
            showMessage('Updated '+ `${returnPersons.name}`, false)
          })
      }
    } else {
      personsServices
        .create(personObject)
        .then(returnPersons => {
          console.log(returnPersons)
          setPersons(personToShow.concat(returnPersons))
          showMessage('Added '+ `${returnPersons.name}`, false)
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const removePerson = (id) => {
    const personObject = persons.find(person => person.id === id)
    const question = 'Delete ' + `${personObject.name}` + '?'
    if (window.confirm(question)) {
      personsServices
        .remove(id, personObject)
        .then(returnPersons => {
          console.log('Removed:', returnPersons.name)
          setPersons(persons.filter(person => person.id !== id))
          showMessage('Deleted '+ `${returnPersons.name}`, false)
        })
        .catch(error => {
          console.log('catch')
          setPersons(persons.filter(person => person.id !== id))
          showMessage('Information of ' + `${personObject.name}` + ' has already been removed from server', true)
        })
    }
  }

  const showMessage = (message, isError) => {
    setError(isError)
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    },5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError}/>
      <Filter value={filter} setFilter={setFilter}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={personToShow} removePerson={removePerson}/>
    </div>
  )
  
}

export default App