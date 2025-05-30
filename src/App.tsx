import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import  UserList from './component/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortCountry, setSortCountry] = useState(false)
  const [ sortUserbyCountry, setSortUserbyCountry] = useState(users)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const sortCountries = () => {
    const nextSortState = !sortCountry
    if(nextSortState){
      const copyUsers = [...users]
      const sortedUsers = copyUsers.sort((user1, user2) => user1.location.country.localeCompare(user2.location.country));
      setSortUserbyCountry(sortedUsers)
    } else{
      setSortUserbyCountry(users)
    }
    setSortCountry(nextSortState)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://randomuser.me/api?results=100")
        if (!res.ok) throw new Error(`HTTPS error! status: ${res.status}`)
      
        const data = await res.json()
        setUsers(data.results)
        setSortUserbyCountry(data.results)
        } catch (err) {
         console.error(`Error getting users: ${err}`)
      }
    }

    fetchUsers()
    
  }, [])
  return (
      <div className='App'>
        <h1>Test</h1>
        <header>
          <ul className="menu">
            <li> 
              <button type="button" onClick={toggleColors}> 
              Change color of row
            </button>
            </li>
            <li> 
              <button type="button" onClick={sortCountries}> 
              Sort by country
            </button>
            </li>
            <li> 
              <button type="button" onClick={toggleColors}> 
              tests
            </button>
            </li>
          </ul>
        </header>
        <main>
          <UserList users={sortUserbyCountry} showColors={showColors}/>
        </main>
      </div>
  )
}

export default App
