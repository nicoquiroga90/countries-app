import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Details() {
  const { country } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await fetch(`http://localhost:4040/api/countries/${encodeURIComponent(country)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const countryData = await response.json();
        setCountryInfo(countryData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCountryInfo();
  }, [country]);

  return (
    <div>
      {/* Contenido de los detalles del país */}
      {countryInfo ? (
        <div>
          <h2>{countryInfo.name}</h2>
          <p>Capital: {countryInfo.capital}</p>
          <p>Population: {countryInfo.population}</p>
        </div>
      ) : (
        <p>Cargando detalles del país...</p>
      )}
    </div>
  );
}

export default Details;
