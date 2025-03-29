import { useState } from 'react'
import user1 from './assets/user1.svg'
import user2 from './assets/user2.svg'
import './App.css'
import Person from './Person'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src={user1} className="citizen person" alt="Person" />
        <img src={user2} className="citizen person" alt="Person" />
      </div>
      <h1>Person Report</h1>

      <Person />
    </>
  )
}

export default App
