import { useState, useEffect } from 'react';
import './Rates.css';

function Rates() {
  const rateColumns = ['CHF', 'EUR', 'USD', 'GBP'];
  const [rateRows, setRateRows] = useState([]);

  useEffect(() => {
    async function loadRates() {
      try {
        const response = await fetch('/data/rateRows.json');
        if (!response.ok) {
          console.error('Failed to load rates');
          return;
        }
        const data = await response.json();
        setRateRows(data);
      } catch (error) {
        console.error('Error loading rates', error);
      }
    }

    loadRates();
  }, []);

  return (
    <section className="rates">
      <h2>Exchange Rates</h2>
      

      <table className="rate-table">
        <thead>
          <tr>
            <th>From \\ To</th>
            {rateColumns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rateRows.map((row) => (
            <tr key={row.from}>
              <td>{row.from}</td>
              {rateColumns.map((col) => (
                <td key={col}>{row[col].toFixed(6)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="reference">Zuletzt Aktuallisiert: 01.01.2026</p>
    </section>
  );
}

export default Rates;
