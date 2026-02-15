import { useEffect, useState } from 'react';
import { loadTransactions } from '../services/dataStore';
import './Transactions.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const rows = await loadTransactions();
      setTransactions(rows);
    }

    fetchTransactions();
  }, []);

  return (
    <section className="transactions">
      <h2>Transactions</h2>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Transaction Date</th>
            <th>User Login</th>
            <th>Source Amount</th>
            <th>Source Currency</th>
            <th>Target Currency</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
              <td>{transaction.userLogin}</td>
              <td>{Number(transaction.sourceAmount).toFixed(2)}</td>
              <td>{transaction.sourceCurrency}</td>
              <td>{transaction.targetCurrency}</td>
              <td>{Number(transaction.exchangeRate).toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Transactions;
