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
      <h1>Detalles de {countryName}</h1>
      {countryData && (
        <div>
          <p>Nombre: {countryData.name}</p>
          <p>Población: {countryData.population}</p>
          <p>Región: {countryData.region}</p>
          <p>Capital: {countryData.capital}</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
