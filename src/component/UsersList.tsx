import { type User } from '../types.d'

interface Props {
  users: User[]
}
export function UserList ({ users }: Props) {
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
            { 
              users.map((user, index)=>{
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>
                      <img src={user.picture.medium} alt={user.name.first} />
                    </td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.location.country}</td>
                    <td> 
                      <button onClick={(user)=>{ 
                        console.log("onClick function is true", user.altKey, index);
                      }}>
                      Do Click
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
    )
}

export default UserList;