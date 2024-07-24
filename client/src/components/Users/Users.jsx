import * as React from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.all([
      axios.get('http://localhost:8080/users'),
    ])
    .then(axios.spread((usersResponse) => {
      setUsers(usersResponse.data.data);
    }))
    .catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <div className='flex flex-wrap justify-center'>
    {users.map((user) => (
      <div key={user._id} className='UserCard rounded-lg bg-orange-100 w-60 inline-block text-center m-2 p-3'>
        <a href={`/profile/${user.username}`}>@{user.username}</a>
        <img src="../../assets/images/PlaceholderGirl.jpg" alt="" />
      </div>
    ))}
    </div>
  )
}

export default Users