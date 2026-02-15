import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadUsers } from '../services/dataStore';
import { clearCurrentUser, getCurrentUser, setCurrentUser } from '../services/auth';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleLogin(event) {
    event.preventDefault();

    const users = await loadUsers();
    const matchedUser = users.find((user) => {
      return user.userLogin === userLogin && user.password === password;
    });

    if (!matchedUser) {
      setMessage('Invalid login or password.');
      return;
    }

    setCurrentUser({
      id: matchedUser.id,
      firstName: matchedUser.firstName,
      lastName: matchedUser.lastName,
      userLogin: matchedUser.userLogin
    });
    setMessage('Login successful.');
    navigate('/transactions');
  }

  function handleLogout() {
    clearCurrentUser();
    setMessage('Logged out.');
  }

  return (
    <section className="login">
      <h2>Login</h2>

      {currentUser ? (
        <div className="login-state">
          <p>
            Logged in as <strong>{currentUser.userLogin}</strong>
          </p>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <label>
            User Login
            <input
              name={"username"}
              autoComplete={"username"}
              type="text"
              required
              value={userLogin}
              onChange={(event) => setUserLogin(event.target.value)}
            />
          </label>

          <label>
            Password
            <input
              name={"password"}
              autoComplete={"current-password"}
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button type="submit">Login</button>
        </form>
      )}

      {message && <p className="login-message">{message}</p>}
    </section>
  );
}

export default Login;
