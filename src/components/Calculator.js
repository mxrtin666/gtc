import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/auth';
import { saveTransaction } from '../services/dataStore';
import './Calculator.css';

function Calculator() {
  const [rateRows, setRateRows] = useState([]);
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('CHF');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [shouldPersist, setShouldPersist] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

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

  function handleSaveTransaction() {
    setSaveMessage('');

    if (Number.isNaN(numericAmount) || rate === null) {
      setSaveMessage('Please enter a valid transaction first.');
      return;
    }

    const currentUser = getCurrentUser();
    if (!currentUser) {
      setSaveMessage('Login required to save a transaction.');
      return;
    }

    const transaction = {
      id: Date.now(),
      transactionDate: new Date().toISOString(),
      userLogin: currentUser.userLogin,
      sourceAmount: numericAmount,
      sourceCurrency: fromCurrency,
      targetCurrency: toCurrency,
      exchangeRate: rate
    };

    if (shouldPersist) {
      saveTransaction(transaction);
      setSaveMessage('Transaction persisted.');
      return;
    }

    setSaveMessage('Transaction prepared but not persisted (optional persistence is disabled).');
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

        <div className="calculator-row">
          <label className="persist-label">
            <input
              type="checkbox"
              checked={shouldPersist}
              onChange={function (e) { setShouldPersist(e.target.checked); }}
            />
            Persist transaction
          </label>

          <button type="button" onClick={handleSaveTransaction}>Save Transaction</button>
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

      {saveMessage && <p className="calculator-save-message">{saveMessage}</p>}
    </section>
  );
}

export default Calculator;
