import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://randomuser.me/api?results=100")
        if (!res.ok) throw new Error(`HTTPS error! status: ${res.status}`)
      
        const data = await res.json()
        setUsers(data.results)
        } catch (err) {
         console.error(`Error getting users: ${err}`)
      }
    }

    fetchUsers()
    
  }, [])
  return (
      <div className='App'>
        <h1>Test</h1>
        { JSON.stringify(users)}
      </div>
  )
}

export default App
