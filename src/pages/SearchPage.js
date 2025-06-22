import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import pokemonKoreaNames from "../utils/pokemon_korean.json";
import { fetchPokemonData } from "../services/pokemonService";
import "./css/SearchPage.css";

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchFilteredPokemon() {
      setLoading(true);

      // 검색어에 포함되는 포켓몬 id 추출
      const matchedPokemon = Object.entries(pokemonKoreaNames)
        .filter(([name]) => name.includes(searchQuery))
        .map(([name, id]) => ({ name, id }));

      // 상세 데이터 호출
      const detailedPokemonList = await Promise.all(
        matchedPokemon.map(async (pokemon) => {
          const pokemonData = await fetchPokemonData(pokemon.id);
          return pokemonData;
        })
      );

      setFilteredPokemon(detailedPokemonList);
      setLoading(false);
    }

    if (searchQuery) {
      fetchFilteredPokemon();
    } else {
      setFilteredPokemon([]);
      setLoading(false);
    }
  }, [searchQuery]);

  return (
    <div>
      <div className="search-pokemon-list">
        {loading ? (
          <div className="loading">잠시만 기다려주세요!</div>
        ) : filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <div className="loading">해당되는 포켓몬이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
