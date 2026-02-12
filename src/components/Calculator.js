import { useState, useEffect } from 'react';
import './Calculator.css';

function Calculator() {
  const [rateRows, setRateRows] = useState([]);
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('CHF');
  const [toCurrency, setToCurrency] = useState('EUR');

  const currencyOptions = ['CHF', 'EUR', 'USD', 'GBP'];

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

  // Calculate result
  const numericAmount = parseFloat(amount);
  let rate = null;
  let result = '';

  if (!Number.isNaN(numericAmount) && rateRows.length > 0) {
    const row = rateRows.find((r) => r.from === fromCurrency);
    if (row && typeof row[toCurrency] === 'number') {
      rate = row[toCurrency];
      result = (numericAmount * rate).toFixed(4);
    }
  }

  return (
    <section className="calculator">
      <h2>Currency Calculator</h2>

      <form
        className="calculator-form"
        onSubmit={function (e) { e.preventDefault(); }}
      >
        <div className="calculator-row">
          <label>
            Amount
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={function (e) { setAmount(e.target.value); }}
            />
          </label>
        </div>

        <div className="calculator-row">
          <label>
            From
            <select
              value={fromCurrency}
              onChange={function (e) { setFromCurrency(e.target.value); }}
            >
              {currencyOptions.map(function (c) {
                return (
                  <option key={c} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </label>

          <label>
            To
            <select
              value={toCurrency}
              onChange={function (e) { setToCurrency(e.target.value); }}
            >
              {currencyOptions.map(function (c) {
                return (
                  <option key={c} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </form>

      {rate !== null && !Number.isNaN(numericAmount) && (
        <p className="calculator-result">
          {numericAmount.toFixed(2)} {fromCurrency} = {result} {toCurrency}
        </p>
      )}

      {rate === null && rateRows.length > 0 && !Number.isNaN(numericAmount) && (
        <p className="calculator-result">
          No rate available for this currency pair.
        </p>
      )}
    </section>
  );
}

export default Calculator;
