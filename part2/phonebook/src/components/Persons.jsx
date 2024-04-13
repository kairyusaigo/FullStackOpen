const Person = ({name, number}) => {
  return (
    <div>{name} {number}</div>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default Persons