import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CountryDetail.css';

function CountryDetail() {
  const { iso } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function loadCountry() {
      try {
        const response = await fetch('/data/countries.json');
        if (!response.ok) {
          console.error('Failed to load countries');
          return;
        }
        const data = await response.json();
        const found = data.find((c) => c.iso === iso);
        setCountry(found || null);
      } catch (error) {
        console.error('Error loading countries', error);
      }
    }

    loadCountry();
  }, [iso]);

  if (!country) {
    return (
      <section className="country-detail">
        <h2>Country Not Found</h2>
        <p>The country with ISO code "{iso}" could not be found.</p>
        <Link to="/countries" className="back-link">Back to Countries</Link>
      </section>
    );
  }

  return (
    <section className="country-detail">
      <h2>{country.name}</h2>

      <div className="country-info">
        <div className="info-row">
          <span className="info-label">Official Name:</span>
          <span className="info-value">{country.official}</span>
        </div>

        <div className="info-row">
          <span className="info-label">ISO 3166:</span>
          <span className="info-value">{country.iso}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Capital:</span>
          <span className="info-value">{country.capital}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Largest City:</span>
          <span className="info-value">{country.largestCity}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Area:</span>
          <span className="info-value">{country.area.toLocaleString()} km²</span>
        </div>

        <div className="info-row">
          <span className="info-label">Area Rank:</span>
          <span className="info-value">{country.areaRank}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Population:</span>
          <span className="info-value">{country.population.toLocaleString()}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Population Rank:</span>
          <span className="info-value">{country.populationRank}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Calling Code:</span>
          <span className="info-value">{country.callingCode}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Top Level Domain:</span>
          <span className="info-value">{country.tld.join(', ')}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Currency:</span>
          <span className="info-value">{country.currencyName}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Currency ISO 4217:</span>
          <span className="info-value">{country.currencyIso}</span>
        </div>
      </div>

      <Link to="/countries" className="back-link">Back to Countries</Link>
    </section>
  );
}

export default CountryDetail;
