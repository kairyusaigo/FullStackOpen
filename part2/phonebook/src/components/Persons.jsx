const Person = ({name, number, removePerson}) => {
  return (
    <div>
      {name} {number} <button type="delete" onClick={removePerson}>delete</button>  
    </div>
  )
}

const Persons = ({persons, removePerson}) => {
  return (
    <div>
      {persons.map(person => <Person key={person.id} name={person.name} number={person.number} removePerson={() => removePerson(person.id)}/>)}
    </div>
  )
}

export default Persons