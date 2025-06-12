import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { SortBy, type User } from "./types.d";
import UserList from "./component/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterByCountry, setFilterByCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([]);

  const toggleColors = () => setShowColors((prevState) => !prevState);

  const toggleSortCountries = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE    
    setSorting(newSortingValue)
  };

  const handleDeleteUser = ( uuid: string) => {
     setUsers(prevUsers => prevUsers.filter( user => user.login.uuid !== uuid))
  };

  const handleRefresh = () => setUsers(originalUsers.current);
  
  const handleChangeSort = (sort: SortBy) => setSorting(sort);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://randomuser.me/api?results=100");
        if (!res.ok) throw new Error(`HTTPS error! status: ${res.status}`);

        const data = await res.json();
        setUsers(data.results);
        originalUsers.current = data.results;
      } catch (err) {
        console.error(`Error getting users: ${err}`);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return typeof filterByCountry === "string" && filterByCountry.length > 0
    ? users.filter(user => {
      return user.location.country.toLowerCase().includes(filterByCountry.toLowerCase())
    }): users;
  }, [users, filterByCountry])

  const sortedUsers = useMemo(()=>{
    
    if (sorting === SortBy.NONE) return filteredUsers
    
    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((user1:User, user2:User) =>{
      const extracProperty = compareProperties[sorting]
      return extracProperty(user1).localeCompare(extracProperty(user2))
    })
  }, [filteredUsers, sorting])

  return (
    <div className="App">
      <h1>Test</h1>
      <header>
        <ul className="menu">
          <li>
            <button type="button" onClick={toggleColors}>
              Toggle row colors
            </button>
          </li>
          <li>
            <button type="button" onClick={toggleSortCountries}>
              { sorting === SortBy.COUNTRY ? "Do not sort by country" : "Sort by country"}
            </button>
          </li>
          <li>
            <button type="button" onClick={handleRefresh}>
              Reset status
            </button>
          </li>
          <li>
            <input placeholder="Filter By Country" onChange={(e)=> {setFilterByCountry(e.target.value)}}/>
          </li>
        </ul>
      </header>
      <main>
        <UserList users={sortedUsers} showColors={showColors} deleteUser={handleDeleteUser} changeSorting={handleChangeSort} />
      </main>
    </div>
  );
}

export default App;
