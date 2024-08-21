const Countries = ({ filteredCountries }) => {
	console.log("🚀 ~ Countries ~ filteredCountries:", filteredCountries);
	const numCountries = filteredCountries.length;

	return (
	  <div>
		{numCountries > 10 ? (
		  <p>Too many matches, specify another filter.</p>
		) : (
		  <ul>
			{filteredCountries.map((country, index) => (
			  <li key={index}>{country.name.common}</li>
			))}
		  </ul>
		)}
	  </div>
	);
  };
  
  export default Countries;
  