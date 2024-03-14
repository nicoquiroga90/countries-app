import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CountryDetail = () => {
  const { countryName } = useParams();
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4040/api/countries/${countryName}`
        );
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountryData();
  }, [countryName]);

  return (
    <div>
      <h1>{countryName}</h1>
      {countryData && (
        <div>
          <p>Native Name: {countryData.nativeName}</p>
          <p>Population: {countryData.population}</p>
          <p>Sub Region: {countryData.subregion}</p>
          <p>Capital: {countryData.capital}</p>
          <div>
            <p>Top Level Domain: {countryData.topLevelDomain}</p>
            <p>Currencies: {countryData.currencies[0].name}</p>
           <p>Languages: {countryData.languages.map(language => language.name).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
