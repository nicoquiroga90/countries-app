import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Details.css";

const Details = () => {
  const { countryName } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const encodedCountryName = encodeURIComponent(countryName);
        const response = await fetch(
          `http://localhost:4040/api/countries/${encodedCountryName}`
        );

        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    const fetchAllCountries = async () => {
      try {
        const response = await fetch(`http://localhost:4040/api/countries`);
        const data = await response.json();
        setAllCountries(data);
      } catch (error) {
        console.error("Error fetching all countries:", error);
      }
    };

    fetchCountryData();
    fetchAllCountries();
  }, [countryName]);

  const getFullName = (borderCode) => {
    const borderCountry = allCountries.find(
      (country) => country.alpha3Code === borderCode
    );
    return borderCountry ? borderCountry.name : "";
  };

  return (
    <div className="country-details">
      {countryData && (
        <>
          <img
            className="flag-detail"
            src={countryData.flags.svg}
            alt={`Flag of ${countryData.name}`}
          />

          <div className="info-container">
            <h1>{countryData.name}</h1>
            <div className="info-detail">
              <dev className="info-detail-column-1">
                <p>
                  <strong>Native Name:</strong> {countryData.nativeName}
                </p>
                <p>
                  <strong> Population:</strong> {countryData.population}
                </p>
                <p>
                  <strong>Sub Region:</strong> {countryData.subregion}
                </p>
                <p>
                  <strong>Capital:</strong> {countryData.capital}
                </p>
              </dev>
              <dev className="info-detail-column-2">
                <p>
                  <strong>Top Level Domain: </strong>
                  {countryData.topLevelDomain}
                </p>
                <p>
                  <strong>Currencies: </strong>
                  {countryData.currencies[0].name}
                </p>
                <p>
                  <strong>Languages: </strong>
                  {countryData.languages
                    .map((language) => language.name)
                    .join(", ")}
                </p>
              </dev>
              </div>
              <p className="detail-border-countries">
                <strong>Border Countries: </strong>
                {countryData.borders && countryData.borders.length > 0 ? (
                  countryData.borders.map((borderCode, index) => (
                    <span key={index} className="border-country">
                      {getFullName(borderCode)}
                    </span>
                  ))
                ) : (
                  <span> No bordering countries</span>
                )}
              </p>
            
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
