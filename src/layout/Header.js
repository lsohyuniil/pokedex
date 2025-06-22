import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import useStore from "../store/useStore";

function Header() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const setSelectedTypes = useStore((state) => state.setSelectedTypes);

  const location = useLocation(); // 현재 페이지의 URL 확인

  // 필터 버튼 표시 여부
  const showFilterButton = !["/pokemon", "/search"].some((path) =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    setIsFilterOpen(false);
  }, [location]);

  return (
    <>
      <header className="header">
        <Link to="/" onClick={() => setSelectedTypes({})}>
          <img
            src={`${process.env.PUBLIC_URL}/pokemon_logo.png`}
            alt="pokemon_logo"
          />
        </Link>
        <SearchBar />
        {showFilterButton && (
          <FilterButtons isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
        )}
      </header>
      <div className={isFilterOpen ? "div-container" : ""}></div>
    </>
  );
}

export default Header;
