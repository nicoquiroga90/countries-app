import { useEffect, useState } from "react";
import SearchBar from "../componets/Main/SearchCountry";
import Countries from "../componets/Main/Countries";
import RegionFilter from "../componets/Main/RegionFilter";
import "../styles/Main.css";
import { apiPath } from "../api";



function Main() {
  const [countryList, setCountryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiPath("/countries"));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const countries = await response.json();
        setCountryList(countries);

        const uniqueRegions = Array.from(new Set(countries.map((country) => country.region)));
        setRegions(uniqueRegions);
        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div className="main-container">
      <div className="filters-conteiner">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearch} />
        <RegionFilter
          regions={regions}
          selectedRegion={selectedRegion}
          onSelectRegion={handleSelectRegion}
        />
      </div>
      <Countries
        countryList={countryList}
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
      />
    </div>
  );
}

export default Main;