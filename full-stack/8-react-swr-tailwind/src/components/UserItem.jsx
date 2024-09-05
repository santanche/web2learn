import useSWR from 'swr'
import '../index.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function UserItem() {
  const { data, error, isLoading } = useSWR('http://localhost:8000/users', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
 
  return (
    <>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">E-mail</th>
            <th class="border px-4 py-2">Birthday</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.email_id}>
              <td class="border px-4 py-2"><b>{user.name}</b></td>
              <td class="border px-4 py-2">{user.email_id}</td>
              <td class="border px-4 py-2">{user.birthday}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
