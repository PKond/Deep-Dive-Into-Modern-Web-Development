import { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter';
import Countries from './components/Countries';
import countryService from './services/countries';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]); 

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      console.log('Fetched countries:', initialCountries); 
      setCountries(initialCountries);
    }).catch(error => {
      console.error('Error fetching countries:', error);
    });
  }, []);

  const filteredCountries = Array.isArray(countries)
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Countries filteredCountries={filteredCountries} />
    </>
  );
}

export default App;
