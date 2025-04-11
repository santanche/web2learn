import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/login/Login.jsx'
import Person from './routes/person/Person.jsx'
import { SWRConfig } from 'swr'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/person',
    element: <Person/>,
  }
])

function App() {
  return (
    <SWRConfig value={{
      fetcher: (url, args) => fetch(`${import.meta.env.VITE_SERVER_URL}${url}`, {credentials: 'include', ...args}).then(res => res.json())
  }}>
      <RouterProvider router={router}/>
    </SWRConfig>
  )
}

export default App
