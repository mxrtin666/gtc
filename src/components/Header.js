import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>Global Travel Companion (GTC)</h1>

      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/currencies" className="nav-link">Currencies</Link>
        <Link to="/rates" className="nav-link">Rates</Link>
        <Link to="/countries" className="nav-link">Countries</Link>
        <Link to="/calculator" className="nav-link">Calculator</Link>
        <Link to="/transactions" className="nav-link">Transactions</Link>
        <Link to="/users" className="nav-link">Users</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
