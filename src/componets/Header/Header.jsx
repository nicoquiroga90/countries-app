import Theme from "./Theme";
import "../../styles/Header.css";

function Header() {
  return (
    <div className="header-conteiner">
      <h2 className="header-text">Where in the world?</h2>
      <div className="buttom-conteiner">
        <Theme />
      </div>
    </div>
  );
}

export default Header