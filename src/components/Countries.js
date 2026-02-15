import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Countries.css';

function Countries() {

  const [countries, setCountries] = useState([]);


  useEffect(() => {
    async function loadCountries() {
      try {
        const response = await fetch('/data/countries.json');
        if (!response.ok) {
          console.error('Failed to load countries');
          return;
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error loading countries', error);
      }
    }

    loadCountries();
  }, []);

  
  // const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsArray = useSearchParams();
  const searchParams = searchParamsArray[0];      // first element
  const setSearchParams = searchParamsArray[1];   // second element

  const navigateFunction = useNavigate();

  let sortBy = searchParams.get('sort');
  if (!sortBy) {
    sortBy = 'iso';
  }

  let order = searchParams.get('order');
  if (!order) {
    order = 'asc';
  }

  const sortedCountries = countries.slice();

  sortedCountries.sort(function (a, b) {
    let result = 0;

    if (sortBy === 'iso') {
      result = a.iso.localeCompare(b.iso);
    } else if (sortBy === 'name') {
      result = a.name.localeCompare(b.name);
    } else if (sortBy === 'area') {
      result = a.area - b.area;
    } else if (sortBy === 'population') {
      result = a.population - b.population;
    }

    if (order === 'desc') {
      return -result;
    } else {
      return result;
    }
  });

  function handleSort(column) {
    if (sortBy === column) {
      let newOrder;
      if (order === 'asc') {
        newOrder = 'desc';
      } else {
        newOrder = 'asc';
      }
      setSearchParams({ sort: column, order: newOrder });
    } else {
      setSearchParams({ sort: column, order: 'asc' });
    }
  }

  function handleRowClick(iso) {
    navigateFunction('/countries/' + iso);
  }

  return (
    <section className="countries">
      <h2>Countries</h2>

      <table className="countries-table">
        <thead>
          <tr>
            <th
              onClick={function () { handleSort('iso'); }}
              className="sortable"
            >
              ISO 3166 {sortBy === 'iso' ? (order === 'asc' ? '▲' : '▼') : ''}
            </th>

            <th
              onClick={function () { handleSort('name'); }}
              className="sortable"
            >
              Name {sortBy === 'name' ? (order === 'asc' ? '▲' : '▼') : ''}
            </th>

            <th
              onClick={function () { handleSort('area'); }}
              className="sortable"
            >
              Area (km²) {sortBy === 'area' ? (order === 'asc' ? '▲' : '▼') : ''}
            </th>

            <th
              onClick={function () { handleSort('population'); }}
              className="sortable"
            >
              Population {sortBy === 'population' ? (order === 'asc' ? '▲' : '▼') : ''}
            </th>
          </tr>
        </thead>

        <tbody>
          {
            sortedCountries.map(function (country) {
              return (
                <tr
                  key={country.iso}
                  className="country-row"
                  onClick={function () { handleRowClick(country.iso); }}
                >
                  <td>{country.iso}</td>
                  <td>{country.name}</td>
                  <td>{country.area.toLocaleString()}</td>
                  <td>{country.population.toLocaleString()}</td>
                </tr>
              );
            })
          }
        </tbody>

      </table>
    </section>
  );
}

export default Countries;
