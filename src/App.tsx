import "./index.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Results from "./components/Results";
import Details from "./components/Details";
import { useContext, useEffect } from "react";
import MyContext from "./context/MyContext";
import fetchPopularMoviesSeries from "./utils/fetchPopularMoviesSeries";
import fetchPopularGames from "./utils/fetchPopularGames";
import PopularNow from "./components/PopularNow";
import spinnerImg from "./img/spinner.png";

function App() {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { details, isLoading, setPopularNow, popularNow } = context;

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

            {Object.keys(details).length === 0 && <Search />}
            {Object.keys(details).length === 0 && <Results />}
            {Object.keys(details).length > 0 && <Details />}

            {popularNow && Object.keys(popularNow).length > 0 && Object.keys(details).length === 0 && <PopularNow />}

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
