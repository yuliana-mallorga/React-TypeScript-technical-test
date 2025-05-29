import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import  UserList from './component/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
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
        <UserList users={users}/>
      </div>
  )
}

export default App
