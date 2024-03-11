import "../../styles/Countries.css";

function Countries({ countryList, searchTerm, selectedRegion }) {
  const filteredCountries = countryList.filter((country) => {
    if (selectedRegion === "All") {
      return country.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        country.region === selectedRegion
      );
    }
  });

  return (
    <div className="country-grid">
      {filteredCountries.map((country) => (
        <div className="card" key={country.name}>
          <img src={country.flags.svg} alt={`Flag of ${country.name}`} />
          <h3>{country.name}</h3>
          <p><strong>Population:</strong> {country.population}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Capital:</strong> {country.capital}</p>
        </div>
      ))}
    </div>
  );
}

export default Countries;
