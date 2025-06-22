import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import {
  fetchPokemonList,
  fetchPokemonByTypes,
} from "../services/pokemonService";
import { useInView } from "react-intersection-observer";
import useStore from "../store/useStore";
import "./css/Home.css";

const LIMIT_NUM = 20;
function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrollLoading, setIsScrollLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [ref, inView] = useInView(true);

  const selectedTypes = useStore((state) => state.selectedTypes);
  const typeValue = Object.values(selectedTypes).some((value) => value);

  // 전체 데이터 가져오기
  useEffect(() => {
    async function fetchData() {
      try {
        const offset = page * LIMIT_NUM;
        const pokemonData = await fetchPokemonList(offset);
        setPokemonList((prevList) => [...prevList, ...pokemonData]);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsScrollLoading(false);
      }
    }

    fetchData();
  }, [page]);

  // 타입 선택시 타입별 포켓몬 데이터 가져오기
  useEffect(() => {
    async function filterPokemon() {
      const selectedTypeList = Object.keys(selectedTypes).filter(
        (type) => selectedTypes[type]
      );

      if (selectedTypeList.length === 0) {
        setFilteredPokemon([]);
        setIsLoading(false);

        return;
      }

      try {
        setIsLoading(true);
        setFilteredPokemon([]);

        const typeFilteredPokemon = await fetchPokemonByTypes(selectedTypeList);

        setFilteredPokemon(typeFilteredPokemon);
      } catch (error) {
        console.error("타입별 포켓몬 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    }

    filterPokemon();
  }, [selectedTypes]);

  // 무한 스크롤
  useEffect(() => {
    // inView === true  page 이전 값에서의 증가.
    if (inView && !isScrollLoading) {
      setIsScrollLoading(true);
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  if (pokemonList.length === 0)
    return <div className="loading">잠시만 기다려주세요!</div>;

  return (
    <div>
      {typeValue ? (
        <div>
          {isLoading ? (
            <div className="loading">잠시만 기다려주세요!</div>
          ) : filteredPokemon.length === 0 ? (
            <div className="loading">해당되는 포켓몬이 없습니다.</div>
          ) : (
            <div className="pokemon-list-container">
              {filteredPokemon.map((pokemon, index) => (
                <PokemonCard key={index} pokemon={pokemon} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="pokemon-list-container">
            {pokemonList.map((pokemon, index) => (
              <PokemonCard key={index} pokemon={pokemon} />
            ))}
          </div>
          {isScrollLoading ? (
            <div
              className="loading"
              style={{ height: "10px", paddingTop: "50px" }}
            >
              잠시만 기다려주세요!
            </div>
          ) : (
            <div
              ref={ref}
              style={{ height: "1px", visibility: "hidden" }}
            ></div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
