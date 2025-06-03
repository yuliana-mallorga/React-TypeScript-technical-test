import { type User } from "../types.d";

interface Props {
  users: User[];
  showColors: boolean;
  handleDeleteUser: (uuid: string) => void;
}

export function UserList({ showColors, users, handleDeleteUser }: Props) {
  return (
    <table className="usersTable">
      <thead>
        <tr>
          <th>#</th>
          <th>Photo</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Country</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const evenRow = index % 2 === 0;
          const backgroundColor = showColors
            ? evenRow
              ? "#444"
              : "#555"
            : evenRow
              ? "#fff"
              : "#00ffcc";
          return (
            <tr key={user.login.uuid} style={{ backgroundColor }}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={user.picture.medium}
                  alt={`${user.name.first} ${user.name.last}`}
                  style={{ borderRadius: "10%", width: "40px", height: "40px" }}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDeleteUser(user.login.uuid)}
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
