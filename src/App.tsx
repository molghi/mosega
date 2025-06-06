import "./index.css";
import Header from "./components/Header";
import { useContext, useEffect } from "react";
import MyContext from "./context/MyContext";
import fetchPopularMoviesSeries from "./utils/fetchPopularMoviesSeries";
import fetchPopularGames from "./utils/fetchPopularGames";
import spinnerImg from "./img/spinner.png";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ResultsPage from "./pages/ResultsPage";
import DetailsPage from "./pages/DetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import BookmarkedPage from "./pages/BookmarkedPage";
import NotFoundPage from "./pages/NotFoundPage";
import Personality from "./components/Personality";
import Genre from "./components/Genre";

function App() {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { isLoading, setPopularNow } = context;

    const apiKeyMoviesSeries: string = import.meta.env.VITE_TMDB_API_KEY;
    const apiKeyGames: string = import.meta.env.VITE_RAWG_IO_API_KEY;

    useEffect(() => {
        const fetchPopularNow = async () => {
            const moviesSeries = await fetchPopularMoviesSeries(apiKeyMoviesSeries);
            const games = await fetchPopularGames(apiKeyGames);
            setPopularNow({ ...moviesSeries, ...games });
        };
        fetchPopularNow();
    }, []);

    return (
        <>
            <Header />

            <Routes>
                <Route index element={<Homepage />} />
                <Route path="/results/:type/:term" element={<ResultsPage />} />
                <Route path="/details/:term" element={<DetailsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/bookmarked" element={<BookmarkedPage />} />
                <Route path="/personality/:name" element={<Personality />} />
                <Route path="/genre/:name" element={<Genre />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* LOADING SPINNER */}
            {isLoading && (
                <div className="fixed top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <img
                        src={spinnerImg}
                        alt="loading spinner"
                        className="w-[400px] opacity-70"
                        style={{ animation: "spin 0.75s linear infinite" }}
                    />
                </div>
            )}
        </>
    );
}

export default App;
