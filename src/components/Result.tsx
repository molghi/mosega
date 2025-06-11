import fetchMovie from "../utils/fetchMovie";
import fetchSerie from "../utils/fetchSerie";
import fetchGame from "../utils/fetchGame";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import MovieResult from "./MovieResult";
import SerieResult from "./SerieResult";
import GameResult from "./GameResult";

interface ResultTypes {
    [key: string]: any;
}

const Result = ({ data, showType, setIsLoading, gameScreens, scenario }: ResultTypes) => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { setDetails, setGameScreens, favoritesShown, setFavoritesShown, bookmarkedShown, setBookmarkedShown, sluggify } =
        context;

    const navigate = useNavigate();
    let resultEl: JSX.Element | null = null; // Final element to be shown

    // API keys
    const apiKeyMoviesSeries: string = import.meta.env.VITE_TMDB_API_KEY;
    const apiKeyGames: string = import.meta.env.VITE_RAWG_IO_API_KEY;

    // It is a movie
    if (showType === 0) resultEl = <MovieResult data={data} />;

    // It is a series
    if (showType === 1) resultEl = <SerieResult data={data} />;

    // It is a game
    if (showType === 2) resultEl = <GameResult data={data} />;

    // Fetch details on click
    const fetchDetails = async () => {
        let res;
        setIsLoading(true);
        if (showType === 0) res = await fetchMovie(apiKeyMoviesSeries, data.id); // Fetch a movie
        if (showType === 1) res = await fetchSerie(apiKeyMoviesSeries, data.id); // Fetch a serie
        if (showType === 2) {
            res = await fetchGame(apiKeyGames, data.slug); // Fetch game
            const gameScreens: any = data.screenshots?.map((screenObj: any) => screenObj);
            setGameScreens(gameScreens);
        }
        setIsLoading(false);
        setDetails(res);
        const titleName = showType === 0 ? data.title : data.name; // Get name
        const titleRelease = showType === 0 ? data.release_date : showType === 1 ? data.first_air_date : data.released; // Get when released
        const name = sluggify(titleName) + "-" + titleRelease.slice(0, 4); // Compose full name
        navigate(`/details/${name}`);
    };

    const icons: any = {
        "0": "🎬", // Movie
        "1": "📺", // Series
        "2": "🎮", // Game
    };

    return (
        <>
            <div
                onClick={fetchDetails}
                className="h-[400px] bg-base-200 p-4 rounded cursor-pointer transition duration-300 border-2 border-transparent hover:scale-105 hover:border hover:border-white overflow-hidden relative"
            >
                {scenario === "favesBookmarks" ? (
                    <div
                        className="absolute bottom-1 left-2 text-lg"
                        title={showType === 0 ? "Movie" : showType === 1 ? "Series" : "Game"}
                    >
                        {icons[showType]}
                    </div>
                ) : (
                    ""
                )}
                {resultEl}
            </div>
        </>
    );
};

export default Result;
