import React, { useEffect, useState } from 'react'

const PersonContext = React.createContext({
  person: [], fetchPerson: () => {}
})

function Person() {
  const [person, setPerson] = useState([])

  const fetchPerson = async () => {
    const response = await fetch("http://localhost:8000/person")
    const responsePerson = await response.json()
    setPerson(responsePerson)
  }

  useEffect(() => {
    fetchPerson()
  }, [])

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>E-mail</th><th>Birthday</th></tr>
      </thead>
      <tbody>
        <PersonContext.Provider value={{person, fetchPerson}}>
          {person.map(user => (
            <tr key={user.email_id}>
              <td><b>{user.name}</b></td>
              <td>{user.email_id}</td>
              <td>{user.birthday}</td>
            </tr>
          ))}
        </PersonContext.Provider>
      </tbody>
    </table>
  )
}

export default Person
