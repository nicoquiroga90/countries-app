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
    <div className="country-details">
      {countryData && (
        <>
          <h1>{countryData.name}</h1>
          <div className="info-conteiner">
            <p>Native Name: {countryData.nativeName}</p>
            <p>Population: {countryData.population}</p>
            <p>Sub Region: {countryData.subregion}</p>
            <p>Capital: {countryData.capital}</p>
            <div>
              <p>Top Level Domain: {countryData.topLevelDomain}</p>
              <p>Currencies: {countryData.currencies[0].name}</p>
              <p>Languages: {countryData.languages.map(language => language.name).join(', ')}</p>
            </div>
          <p>Border Countries: 
  {countryData.borders.map(border => (
    <span key={`${border.alpha3Code}-${border.name}`} className="border-country">{getFullName(border.alpha3Code, countryData)}</span>
  ))}
</p>


          </div>
        </>
      )}
    </div>
  );
};

const getFullName = (borderCode, countryData) => {
  const borderCountry = countryData.borders.find(border => border.alpha3Code === borderCode);
  return borderCountry ? borderCountry.name : 'Unknown';
};


export default CountryDetail;
