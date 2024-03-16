import "../../styles/Main.css"

function RegionFilter({ regions, selectedRegion, onSelectRegion }) {
  return (
    <div className="region-filter-conteiner">
      <select className="region-filter-list" value={selectedRegion} onChange={(e) => onSelectRegion(e.target.value)}>
        <option value="All">Filter by Region</option>
        {regions.map((region) => (
          <option className="region-filter-option" key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RegionFilter;