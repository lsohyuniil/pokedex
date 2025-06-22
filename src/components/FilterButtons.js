import "./css/FilterButtons.css";
import PokemonTypeBadge from "./PokemonTypeBadge";
import { typeTranslations } from "../utils/types";
import useStore from "../store/useStore";

function FilterButtons({ isOpen, setIsOpen }) {
  const selectedTypes = useStore((state) => state.selectedTypes);
  const setSelectedTypes = useStore((state) => state.setSelectedTypes);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeClick = (type) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="type-container">
      {isOpen && (
        <div className="filter-options">
          {Object.keys(typeTranslations).map((key) => (
            <button
              className={`filter-option ${
                selectedTypes[key] ? "active" : "inactive"
              }`}
              key={key}
              onClick={() => handleTypeClick(key)}
            >
              <PokemonTypeBadge type={key} />
            </button>
          ))}
        </div>
      )}
      <div className="divtest">
        <button
          className={`type-btn ${isOpen ? "" : "type-btn-close"}`}
          onClick={toggleFilter}
        >
          <span>타입 선택</span>
        </button>
      </div>
    </div>
  );
}

export default FilterButtons;
