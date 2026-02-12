import './Currencies.css';
import { useState, useEffect } from 'react';

function Currencies() {

  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    async function loadCurrencies() {
      try {
        const response = await fetch('/data/currencies.json');
        if (!response.ok) {
          console.error('Failed to load countries');
          return;
        }
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error('Error loading currencies', error);
      }
    }

    loadCurrencies();
  }, []);

  return (
    <section className="currencies">
      <h2>Currencies</h2>

      <table className="currency-table">
        <thead>
          <tr>
            <th>ISO 4217</th>
            <th>Name</th>
            <th>Countries</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((c) => (
            <tr key={c.iso}>
              <td>{c.iso}</td>
              <td>{c.name}</td>
              <td>{c.countries.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );

}





export default Currencies;
