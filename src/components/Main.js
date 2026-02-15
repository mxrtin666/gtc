import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Currencies from './Currencies';
import Rates from './Rates';
import Countries from './Countries';
import CountryDetail from './CountryDetail';
import Calculator from './Calculator';
import Transactions from './Transactions';
import Users from './Users';
import Login from './Login';
import { isLoggedIn } from '../services/auth';
import './Main.css';

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Main() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/currencies" element={<Currencies />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:iso" element={<CountryDetail />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route
          path="/transactions"
          element={(
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/users"
          element={(
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          )}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default Main;
