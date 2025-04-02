import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function PersonList() {
  const { data, error, isLoading } = useSWR('http://localhost:8000/person', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>E-mail</th><th>Birthday</th></tr>
      </thead>
      <tbody>
        {data.map(person => (
          <tr key={person.email_id}>
            <td><b>{person.name}</b></td>
            <td>{person.email_id}</td>
            <td>{person.birthday}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PersonList
