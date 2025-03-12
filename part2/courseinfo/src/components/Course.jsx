const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => 
  <div>
    {props.parts.map(part => 
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
  </div>
  
const Part = (props) => 
  <p>
    {props.part} {props.exercises}
  </p>


const Total = ({parts}) =>{
  const total = parts.reduce((sum,part)=>{ 
    console.log('sum: ',sum,'part: ',part.exercises)
    
    return sum+part.exercises},0)
    return(
      <div>
        <p>Number of exercises {total}</p>
      </div>
  )
}
   

const Course = ({courses}) =>
  <div>
    {courses.map(course =>
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )}
  </div>

export default Course 