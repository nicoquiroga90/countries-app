import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CountryDetail = () => {
  const { countryName } = useParams();
  const [countryData, setCountryData] = useState(null);
  const apiUrl = `https://your-api-url/api/countries/${countryName}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (!countryData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Detalles de {countryData.name}</h1>
      <p>Capital: {countryData.capital}</p>
      <p>Población: {countryData.population}</p>
      {/* Mostrar otros detalles del país según sea necesario */}
    </div>
  );
}

export default CountryDetail;
