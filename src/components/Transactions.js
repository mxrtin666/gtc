import { useEffect, useState } from 'react';
import './Transactions.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await fetch('/data/transactions.json');
        if (!response.ok) {
          console.error('Failed to load transactions');
          setError('Failed to load transactions');
          return;
        }

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error loading transactions', error);
        setError('Error loading transactions');
      } finally {
        setLoading(false);
      }
    }

    void loadTransactions();
  }, []);

  if (loading) {
    return (
      <section className="transactions">
        <h2>Transactions</h2>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="transactions">
        <h2>Transactions</h2>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="transactions">
      <h2>Transactions</h2>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Transaction Date</th>
            <th>User Login</th>
            <th>Source Amount</th>
            <th>Source Currency</th>
            <th>Target Currency</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={`${transaction.transactionDate}-${index}`}>
              <td>{transaction.transactionDate}</td>
              <td>{transaction.userLogin}</td>
              <td>{transaction.sourceAmount}</td>
              <td>{transaction.sourceCurrency}</td>
              <td>{transaction.targetCurrency}</td>
              <td>{transaction.exchangeRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Transactions;
