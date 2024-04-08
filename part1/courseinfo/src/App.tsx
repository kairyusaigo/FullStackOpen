const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  return (
    <ul>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>  
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>  
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>  
    </ul>
  )
}

const Part = (props) => <li>{props.part}: {props.exercise}</li>

const Total = (props) => <p>Total number of exercises: {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default App