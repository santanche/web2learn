import user1 from './assets/user1.svg'
import user2 from './assets/user2.svg'
import umbrellas from '/umbrellas.jpg'
import './index.css'
import UserItem from './components/UserItem.jsx'

function App() {
  return (
    <>
      <div>
        <a href="https://pixabay.com/photos/umbrellas-people-wall-road-rain-7868179/" target="_blank">
          <img src={umbrellas} alt="Citizen Logo" class="w-96 mx-auto" />
        </a>
        <hr />
        <div class="flex max-w-fit mx-auto">
          <img src={user1} alt="Users" class="h-16" />
          <img src={user2} alt="Users" class="h-16" />
        </div>
      </div>
      <h1 class="text-4xl text-center">Users Report</h1>

      <div class="flex max-w-fit mx-auto">
        <UserItem />
      </div>
    </>
  )
}

export default App
