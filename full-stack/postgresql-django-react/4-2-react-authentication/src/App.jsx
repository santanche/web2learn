import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/login/Login.jsx'
import Person from './routes/person/Person.jsx'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>,
  },
  {
    path: '/person',
    element: <Person/>,
  }
])

function App() {
  return (
      <RouterProvider router={router}/>
  )
}

export default App
