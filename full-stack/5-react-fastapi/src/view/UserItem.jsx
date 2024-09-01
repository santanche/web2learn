import { useReducer, useEffect } from 'react'
import { userModel, userReducer, fetchUsers } from '../redux/UserRedux'

export default function UserItem() {
  const [user, userDispatch] = useReducer(userReducer, userModel)

  useEffect(() => {
    fetchUsers()
  }, [])

  const { name, email_id, birthday } = user

  return (
    <>
    <table>
      <thead>
        <tr><th>Name</th><th>E-mail</th><th>Birthday</th></tr>
      </thead>
      <tbody>
        <tr key={email_id}>
          <td><b>{name}</b></td>
          <td>{email_id}</td>
          <td>{birthday}</td>
        </tr>
      </tbody>
    </table>
    <button type="button" onClick={() => userDispatch({ type: 'first_user' })}>
      First user
    </button>
    <br />
    <button type="button" onClick={() => userDispatch({ type: 'next_user' })}>
      Next user
    </button>
    </>
  )
}
