import React from 'react'

const Header = ({text, id}) => <h1 key={id}>{text}</h1>

const Part = ({parts}) => {

  const total = parts.reduce((accum, current)  => accum+current.exercises, 0)

  return (
    <div>
      {parts.map(part => 
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
      <p><b>total of {total} exercises</b></p>
    </div>
  )
}

const Course = ({course}) => {

  return (
    <div>
      <Header text={course.name} />
      <Part key={course.id} parts={course.parts}/>
    </div>
  )
}

export default Course