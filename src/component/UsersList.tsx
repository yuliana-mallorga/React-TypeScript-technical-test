import { type User } from "../types.d";

interface Props {
  users: User[];
  showColors: boolean;
}

export function UserList({ showColors, users }: Props) {

  return (
    <table className="usersTable">
      <thead>
        <tr>
          <th>Number</th>
          <th>Photo</th>
          <th>Name</th>
          <th>Lastname</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555';
          const backgroundColor2 = index % 2 === 0 ? '#fff' : '#00ffcc';
          const color = showColors ? backgroundColor : backgroundColor2;
          
          return (
            <tr key={user.login.uuid} style={{backgroundColor: color}}>
              <td>
                { typeof index === 'number' ? index + 1 : ''}
              </td>
              <td>
                <img src={user.picture.medium} alt={user.name.first} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={(user) => {
                    console.log("onClick function is true", user.altKey, index);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserList;
