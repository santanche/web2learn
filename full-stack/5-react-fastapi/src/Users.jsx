import React, { useEffect, useState } from 'react'

const UsersContext = React.createContext({
  users: [], fetchUsers: () => {}
})

function Users() {
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
    <table>
      <tr><th>Name</th><th>E-mail</th><th>Birthday</th></tr>
      <UsersContext.Provider value={{users, fetchUsers}}>
        {users.map(user => (
          <tr key={user.email_id}>
            <td><b>{user.name}</b></td>
            <td>{user.email_id}</td>
            <td>{user.birthday}</td>
          </tr>
        ))}
      </UsersContext.Provider>
    </table>
  )
}

export default Users
