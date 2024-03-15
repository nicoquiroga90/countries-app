import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
          <h1>{countryData.name}</h1>
          <div className="info-container">
            <p>Native Name: {countryData.nativeName}</p>
            <p>Population: {countryData.population}</p>
            <p>Sub Region: {countryData.subregion}</p>
            <p>Capital: {countryData.capital}</p>
            <p>
              Border Countries:
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
