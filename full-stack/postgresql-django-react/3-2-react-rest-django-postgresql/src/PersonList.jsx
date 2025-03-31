import React, { useEffect, useState } from 'react'

const PersonContext = React.createContext({
  personList: [], fetchPersonList: () => {}
})

function PersonList() {
  const [personList, setPersonList] = useState([])

  const fetchPersonList = async () => {
    const response = await fetch("http://localhost:8000/person")
    const responsePersonList = await response.json()
    setPersonList(responsePersonList)
  }

  useEffect(() => {
    fetchPersonList()
  }, [])

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>E-mail</th><th>Birthday</th></tr>
      </thead>
      <tbody>
        <PersonContext.Provider value={{personList, fetchPersonList}}>
          {personList.map(person => (
            <tr key={person.email_id}>
              <td><b>{person.name}</b></td>
              <td>{person.email_id}</td>
              <td>{person.birthday}</td>
            </tr>
          ))}
        </PersonContext.Provider>
      </tbody>
    </table>
  )
}

export default PersonList
