import { useState } from 'react'
import user1 from './assets/user1.svg'
import user2 from './assets/user2.svg'
import umbrellas from '/umbrellas.jpg'
import './App.css'
import UserItem from './view/UserItem.jsx'

function App() {
  return (
    <>
      <div>
        <a href="https://pixabay.com/photos/umbrellas-people-wall-road-rain-7868179/" target="_blank">
          <img src={umbrellas} className="citizen" alt="Citizen Logo" />
        </a>
        <hr />
        <img src={user1} className="citizen users" alt="Users" />
        <img src={user2} className="citizen users" alt="Users" />
      </div>
      <h1>Users Report</h1>

      <UserItem />
    </>
  )
}

export default App
