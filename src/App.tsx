import Header from "./components/Header";
import { useContext, useEffect, useState } from "react";
import MyContext from "./context/MyContext";
import fetchPopularMoviesSeries from "./utils/fetchPopularMoviesSeries";
import fetchPopularGames from "./utils/fetchPopularGames";
import spinnerImg from "./img/spinner.png";
import { Routes, Route, useLocation } from "react-router-dom";
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

    const { pathname } = useLocation();
    const [scrollToTop, setScrollToTop] = useState<boolean>(false);

    // API keys
    const apiKeyMoviesSeries: string = import.meta.env.VITE_TMDB_API_KEY;
    const apiKeyGames: string = import.meta.env.VITE_RAWG_IO_API_KEY;

    // Fetch popular things
    useEffect(() => {
        const fetchPopularNow = async () => {
            const moviesSeries = await fetchPopularMoviesSeries(apiKeyMoviesSeries);
            const games = await fetchPopularGames(apiKeyGames);
            setPopularNow({ ...moviesSeries, ...games });
        };
        fetchPopularNow();
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [pathname]);

    // Listen to scrolling
    useEffect(() => {
        const listenToScroll = () => setScrollToTop(window.scrollY > 88); // 88 is the height of header
        document.addEventListener("scroll", listenToScroll);
        return () => document.removeEventListener("scroll", listenToScroll);
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

            {/* SCROLL TO TOP BTN */}
            {scrollToTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    title="Back to Top"
                    className="fixed z-10 right-[20px] bottom-[20px] text-white border border-1 border-white text-[30px] bg-gray-800 rounded -rotate-90 w-[40px] h-[40px] flex items-center justify-center hover:opacity-60 transition active:opacity-40"
                >
                    &#8594;
                </button>
            )}
        </>
    );
}

export default App;
