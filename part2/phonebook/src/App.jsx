import { useState, useEffect } from 'react'
import personService from './services/Persons'
const Notification = ({message}) =>{
  const messageStyle={
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
  if(!message)
    return null
  return(
    <div style={messageStyle}>
      {message}
    </div>
  )
}
const ErrorMessage = ({errorMessage}) =>{
  const messageStyle={
    color: 'red',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    fontSize: 20,
    background: 'lightgray'
  }
  if(!errorMessage)
    return null
  return(
    <div style={messageStyle}>
      {errorMessage}
    </div>
  )

}
const PersonForm = (props) =>{
  return(
    <form onSubmit={props.addPerson}>
        <div>name: <input value={props.newName} onChange={props.handleName}/></div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Remove = (props) =>{
  return(
    <button onClick={() => props.removePerson(props.persons.id)}>Delete</button>
  )
}

const Persons = (props) =>{
  console.log(props)
  return(
    props.persons.map(p =>(<li key={p.name}>{p.name} {p.number} <Remove removePerson={props.removePerson} persons={p}/> </li>))
  )
}

const Filter = (props) => {
  
  return(
    <div>
      <form onSubmit={props.filterName}>
        <div>filter shown with: <input value={props.newSearch} onChange={props.handleSearch}/></div>
        <div><button type='submit'>search</button></div>
      </form>
    </div>
  )
}
const App = () =>{

  const [persons, setPersons] = useState([])
  const[newName, setNewName]=useState('')
  const[newNumber,setNewNumber]=useState('')
  const[newSearch,setNewSearch]=useState('')
  const[message,setMessage]=useState()
  const[errorMessage,setError]=useState()

  const addPerson = (event) =>{
  event.preventDefault()
  const newPerson = {name: newName, number: newNumber}
  console.log(newPerson)
  const existingPerson=persons.find(p=>p.name===newName)
  console.log(existingPerson);
  
  if(existingPerson)
  {
    const confirm=`${newName} is already added to phonebook, replace the old number with a new one?`
    if(window.confirm(confirm))
    {
      const changedPerson={...existingPerson,number:newNumber}
      console.log(changedPerson);
      
      personService.update(changedPerson.id,changedPerson).then((returnedPerson) =>{
        setPersons(persons.map(p => p.id===changedPerson.id? returnedPerson:p))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newName}`)
        setTimeout(() =>{
          setMessage(null)
        },5000)
      })
      .catch((error) => {
        
        if(error.name==='ValidationError'){
            setError(`${error.response.data.error}`)
            setNewName('')
            setNewNumber('')
            setTimeout(() =>{
              setError(null)
            },5000)
        }
        else{
        setError(`Information of ${existingPerson.name} has already been removed from server`)
        setPersons(persons.filter(p => p.id !== existingPerson.id))
        setNewName('')
        setNewNumber('')
        setTimeout(() =>{
          setError(null)
        },5000)
    }})
    
    }
  }
  else
  {
   
    personService.create(newPerson)
    .then((returnedPerson) =>{
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(`Added ${newName}`)
      setTimeout(() =>{
        setMessage(null)
      },5000)
    })
    .catch(error =>{
      setError(`[ERROR] ${error.response.data.error}  `)
      setNewName('')
      setNewNumber('')
      setTimeout(() =>{
        setError(null)
      },5000)
    })
  }
}

  const handleName = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => setNewNumber(event.target.value)

  const handleSearch = (event) => setNewSearch(event.target.value)

  const removePerson = (id) =>{
    const personObject=persons.find(p => p.id===id)
    if(!personObject){
      alert(`copilot was right`)
      return
    }
    const personName=personObject.name
    const message=`Delete ${personName}?`
    if(window.confirm(message))
    {
      personService.remove(id).then(() =>{
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }
  const filterName = (event) =>{
    event.preventDefault()
    const reg=new RegExp(newSearch,'i');
    const filtered= () =>persons.filter(person => person.name.match(reg))
    console.log(reg)
    setPersons(filtered)
  }

  useEffect(() =>{
    personService.getAll()
    .then((initialPersons) =>{
      setPersons(initialPersons)
    })
  },[])

  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <ErrorMessage errorMessage={errorMessage}/>
      <Filter  newSearch={newSearch} handleSearch={handleSearch} filterName={filterName}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} removePerson={removePerson}/>
    </div>
  )
}

export default App
