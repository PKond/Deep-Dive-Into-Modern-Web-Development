const Countries = ({ filteredCountries }) => {
  console.log("🚀 ~ Countries ~ filteredCountries:", filteredCountries);
  const numCountries = filteredCountries.length;

  return (
    <div>
      {numCountries > 10 ? (
        <p>Too many matches, specify another filter.</p>
      ) : numCountries > 1 ? (
        <ul>
          {filteredCountries.map((country, index) => (
            <li key={index}>{country.name.common}</li>
          ))}
        </ul>
      ) : numCountries === 1 ? (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <div>
            <span>capital </span>
            {filteredCountries[0].capital}
          </div>
          <div>
            <span>area </span>
            {filteredCountries[0].area}
          </div>
          <br />
          <div>
            <span style={{ fontWeight: 700 }}>Languages: </span>
            <ul>
              {Object.values(filteredCountries[0].languages).map(
                (language, index) => (
                  <li key={index}>{language}</li>
                )
              )}
            </ul>
          </div>
		  <div>
            <img src={filteredCountries[0].flags.png} alt="" style= {{ maxHeight: "180px"}}/>
          </div>
        </div>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default Countries;
