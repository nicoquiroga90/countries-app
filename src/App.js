import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Details from "./pages/Details"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/countries/:countryName" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
