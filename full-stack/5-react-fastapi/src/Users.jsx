import React, { useEffect, useState } from 'react'

const UsersContext = React.createContext({
  users: [], fetchUsers: () => {}
})

function Users() {
  console.log('=== Users')
  const [users, setUsers] = useState([])
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8000/users")
    const responseUsers = await response.json()
    console.log(responseUsers)
    setUsers(responseUsers)
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <UsersContext.Provider value={{users, fetchUsers}}>
      {users.map(user => (
        <div key={user.email_id}>
          <h3>{user.name}</h3>
          <p>{user.birthday}</p>
        </div>
      ))}
    </UsersContext.Provider>
  )
}

export default Users
