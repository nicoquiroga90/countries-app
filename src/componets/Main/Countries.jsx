import { useEffect, useState } from "react";
import "../../styles/Countries.css"

function Countries() {
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4040/api/countries");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const countries = await response.json();
        setCountryList(countries);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="containerList">
      <div className="titleContainer">
        <h2>Countries List</h2>
      </div>
      <div className="country-grid">
        {countryList.map((country) => (
          <div className="card" key={country.name}>
            <img src={country.flags.svg} alt={`Flag of ${country.name}`} />
            <h3>{country.name}</h3>
            <p><strong>Population:</strong> {country.population}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Capital:</strong> {country.capital}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Countries;
