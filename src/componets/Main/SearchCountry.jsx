import "../../styles/Main.css"

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search for a country..."
      value={searchTerm}
      onChange={onSearchChange}
    />
  );
}

export default SearchBar;