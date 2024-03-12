import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryDetail from "./componets/Detail/CountryDetail";
import Main from "./pages/Main";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/countries/:countryName" element={<CountryDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
