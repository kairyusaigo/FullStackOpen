import React from 'react'

const Header = ({text, id}) => <h1 key={id}>{text}</h1>

const Part = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
    </div>
  )
}

const Course = ({course}) => {
  console.log(course)
  console.log('course: id' ,course.id, 'name', course.name)
  const list = course
  console.log('list: id' ,list.id)

  return (
    <div>
      <Header text={course.name} id={course.id}/>
      <Part parts={course.parts}/>
    </div>
  )
}

export default Course