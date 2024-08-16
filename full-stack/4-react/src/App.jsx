import { useState } from 'react'
import gertie from './assets/Gertie_the_Dinosaur_poster.jpg'
import rawrDinosaur from '/rawr-dinosaur.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://openclipart.org/detail/234369/rawr-dinosaur" target="_blank">
          <img src={rawrDinosaur} className="dinosaur" alt="Rawr Dinosaur" />
        </a>
        <a href="https://en.wikipedia.org/wiki/Gertie_the_Dinosaur" target="_blank">
          <img src={gertie} className="dinosaur gertie" alt="Gertie the Dinosaur" />
        </a>
      </div>
      <h1>Gertie the Dinosaur</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
