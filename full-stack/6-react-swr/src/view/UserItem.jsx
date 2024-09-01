import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function UserItem() {
  const { data, error, isLoading } = useSWR('http://localhost:8000/users', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
 
  return (
    <>
      <table>
        <thead>
          <tr><th>Name</th><th>E-mail</th><th>Birthday</th></tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.email_id}>
              <td><b>{user.name}</b></td>
              <td>{user.email_id}</td>
              <td>{user.birthday}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
