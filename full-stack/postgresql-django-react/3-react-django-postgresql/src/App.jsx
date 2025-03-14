import { useState } from 'react'
import user1 from './assets/user1.svg'
import user2 from './assets/user2.svg'
import umbrellas from '/umbrellas.jpg'
import './App.css'
import Person from './Person'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://pixabay.com/photos/umbrellas-people-wall-road-rain-7868179/" target="_blank">
          <img src={umbrellas} className="citizen" alt="Citizen Logo" />
        </a>
        <hr />
        <img src={user1} className="citizen person" alt="Person" />
        <img src={user2} className="citizen person" alt="Person" />
      </div>
      <h1>Person Report</h1>

      <Person />
    </>
  )
}

export default App
