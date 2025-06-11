import getResultMovieMarkup from "../utils/getResultMovieMarkup";
import getResultSerieMarkup from "../utils/getResultSerieMarkup";
import getResultGameMarkup from "../utils/getResultGameMarkup";
import { tmdbMovies, tmdbSeries } from "../utils/genreInterpreter";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import fetchMovie from "../utils/fetchMovie";
import fetchSerie from "../utils/fetchSerie";
import fetchGame from "../utils/fetchGame";
import { useNavigate } from "react-router-dom";

const PopularItem = ({ type, data }: { type: string; data: any }) => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { setDetails, setIsLoading, setShowType, setGameScreens, sluggify } = context;

    const navigate = useNavigate();

    // API keys
    const apiKeyMoviesSeries: string = import.meta.env.VITE_TMDB_API_KEY;
    const apiKeyGames: string = import.meta.env.VITE_RAWG_IO_API_KEY;

    let resultEl = null; // Final element to be shown

    // Get the markup of a movie/serie/game
    if (type === "movie") resultEl = getResultMovieMarkup(data, tmdbMovies);
    if (type === "serie") resultEl = getResultSerieMarkup(data, tmdbSeries);
    if (type === "game") resultEl = getResultGameMarkup(data);

    // Fetch details on click
    const fetchDetails = async () => {
        let res;
        setIsLoading(true);
        setShowType(type === "movie" ? 0 : type === "serie" ? 1 : 2);
        if (type === "movie") res = await fetchMovie(apiKeyMoviesSeries, data.id); // Fetch movie
        if (type === "serie") res = await fetchSerie(apiKeyMoviesSeries, data.id); // Fetch serie
        if (type === "game") {
            res = await fetchGame(apiKeyGames, data.slug); // Fetch game
            const gameScreens: any = data.short_screenshots.map((screenObj: any) => screenObj);
            setGameScreens(gameScreens);
        }
        setIsLoading(false);
        setDetails(res);
        let name = type === "movie" ? data.title : data.name; // Get name
        let released =
            type === "movie" ? `${data.release_date}` : type === "serie" ? `${data.first_air_date}` : `${data.released}`; // Get when released
        navigate(`/details/${sluggify(name)}-${released.slice(0, 4)}`);
    };

    return (
        <div
            onClick={fetchDetails}
            className="h-[400px] bg-base-200 p-4 rounded cursor-pointer transition duration-300 border-2 border-transparent hover:border-white"
        >
            {resultEl}
        </div>
    );
};

export default PopularItem;
