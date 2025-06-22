import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import PokemonDetail from "./pages/PokemonDetail";
import SearchPage from "./pages/SearchPage";
import ScrollTopButton from "./components/ScrollTopButton";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <main>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <ScrollTopButton />
      </main>
    </BrowserRouter>
  );
}

export default App;
