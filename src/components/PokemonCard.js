import "./css/PokemonCard.css";
import PokemonTypeBadge from "./PokemonTypeBadge";
import { Link } from "react-router-dom";

function PokemonCard({ pokemon }) {
  return (
    <Link className="pokemon-card" to={`/pokemon/${pokemon.id}`}>
      <div className="pokemon-name-container">
        <span className="pokemon-id">No.{pokemon.id}</span>
        <span className="pokemon-name">{pokemon.koreanName}</span>
      </div>
      <img
        src={pokemon.front_image}
        alt={pokemon.id}
        className="pokemon-image"
      />
      <div className="pokemon-types">
        {pokemon.translatedTypes.map((type) => (
          <PokemonTypeBadge key={type} type={type} />
        ))}
      </div>
    </Link>
  );
}

export default PokemonCard;
