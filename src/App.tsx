import { useEffect, useState } from "react";
import "./App.css";
import { type User } from "./types.d";
import UserList from "./component/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortCountry, setSortCountry] = useState(false);
 
  const sortedUsers = sortCountry
    ? users.toSorted((user1, user2) =>
        user1.location.country.localeCompare(user2.location.country)
      )
    : users;

  const toggleColors = () => setShowColors((prevState) => !prevState);

  const toggleSortCountries = () => setSortCountry((prevState) => !prevState);

  const handleDeleteUser = ( uuid: string) => {
     setUsers(prevUsers => prevUsers.filter( user => user.login.uuid !== uuid))
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://randomuser.me/api?results=100");
        if (!res.ok) throw new Error(`HTTPS error! status: ${res.status}`);

        const data = await res.json();
        setUsers(data.results);
      } catch (err) {
        console.error(`Error getting users: ${err}`);
      }
    };

    fetchUsers();
  }, []);
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
              Sort by country
            </button>
          </li>
        </ul>
      </header>
      <main>
        <UserList users={sortedUsers} showColors={showColors} handleDeleteUser={handleDeleteUser} />
      </main>
    </div>
  );
}

export default App;
