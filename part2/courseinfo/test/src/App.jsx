import { useState } from "react"
const Display = ({counter}) =>{
    return(
        <div>{counter}</div>
    )
}

const Button = ({onClick, text}) =>
{
    return(
        <div>
            <button onClick={onClick}>
                {text}
            </button>
        </div>
    )
}
const App = () =>{
    const[counter, setcounter]=useState(0)
    const increase = () =>setcounter(counter+1)
    const zero = () => setcounter(0)
    const decrease = () => setcounter(counter-1)
    return(
        <div>
            <Display counter={counter}/>
            <Button onClick={increase} text='+'/>
            <Button onClick={decrease} text='-'/>
            <Button onClick={zero} text='reset'/>
        </div>
    )
}

export default App
