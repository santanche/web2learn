import useSWR from 'swr'

const fetcher = async (...args) => {
  const token = localStorage.getItem('authToken')
  
  const response = await fetch(...args, {
    credentials: 'include',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Fetch error:', response.status, errorText)
    throw new Error(`HTTP ${response.status}: ${errorText}`)
  }

  return response.json()
}

function PersonList() {
  const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_SERVER_URL}/person`, fetcher)

  if (error) {
    console.error('SWR Error:', error);
    return <div>failed to load</div>;
  }

  if (isLoading) return <div>loading...</div>

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Id</th><th>E-mail</th></tr>
      </thead>
      <tbody>
        {data.map(person => (
          <tr key={person.user_id}>
            <td><b>{person.first_name} {person.last_name}</b></td>
            <td>{person.user_id}</td>
            <td>{person.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PersonList
