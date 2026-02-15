import { useEffect, useState } from 'react';
import { loadUsers, saveUser } from '../services/dataStore';
import './Users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      const rows = await loadUsers();
      setUsers(rows);
    }

    fetchUsers();
  }, []);

  async function handleCreateUser(event) {
    event.preventDefault();

    const existingUsers = await loadUsers();
    const loginExists = existingUsers.some((user) => user.userLogin === userLogin);
    if (loginExists) {
      setMessage('User login already exists.');
      return;
    }

    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      userLogin,
      password
    };

    saveUser(newUser);
    setUsers((currentUsers) => [newUser, ...currentUsers]);
    setFirstName('');
    setLastName('');
    setUserLogin('');
    setPassword('');
    setMessage('User created.');
  }

  return (
    <section className="users">
      <h2>User Management</h2>

      <form className="users-form" onSubmit={handleCreateUser}>
        <label>
          First Name
          <input
            type="text"
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>

        <label>
          User Login
          <input
            type="text"
            required
            value={userLogin}
            onChange={(event) => setUserLogin(event.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit">Create User</button>
      </form>

      {message && <p className="users-message">{message}</p>}

      <table className="users-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Login</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.userLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Users;
