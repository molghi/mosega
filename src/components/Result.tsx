import fetchMovie from "../utils/fetchMovie";
import fetchSerie from "../utils/fetchSerie";
import fetchGame from "../utils/fetchGame";
import { tmdbMovies, tmdbSeries } from "../utils/genreInterpreter";
import { useContext } from "react";
import getResultMovieMarkup from "../utils/getResultMovieMarkup";
import getResultSerieMarkup from "../utils/getResultSerieMarkup";
import getResultGameMarkup from "../utils/getResultGameMarkup";
import MyContext from "../context/MyContext";
import { useNavigate } from "react-router-dom";

interface ResultTypes {
    [key: string]: any;
}

const Result = ({ data, showType, setIsLoading, gameScreens }: ResultTypes) => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const {
        setDetails,
        setGameScreens,
        favoritesShown,
        setFavoritesShown,
        bookmarkedShown,
        setBookmarkedShown,
        sluggify,
        setShowType,
    } = context;

    // console.log(data);

    const navigate = useNavigate();

    let resultEl: JSX.Element | null = null;

    const apiKeyMoviesSeries: string = import.meta.env.VITE_TMDB_API_KEY;
    const apiKeyGames: string = import.meta.env.VITE_RAWG_IO_API_KEY;

    // It is a movie
    if (showType === 0) resultEl = getResultMovieMarkup(data, tmdbMovies);
    // It is a series
    if (showType === 1) resultEl = getResultSerieMarkup(data, tmdbSeries);
    // It is a game
    if (showType === 2) resultEl = getResultGameMarkup(data);

    // Fetch details on click
    const fetchDetails = async () => {
        let res;
        setIsLoading(true);
        if (showType === 0) res = await fetchMovie(apiKeyMoviesSeries, data.id); // It is a movie
        if (showType === 1) res = await fetchSerie(apiKeyMoviesSeries, data.id); // It is a serie
        if (showType === 2) res = await fetchGame(apiKeyGames, data.slug); // It is a game
        setIsLoading(false);
        setDetails(res);
        setGameScreens(gameScreens);
        if (favoritesShown) setFavoritesShown(false);
        if (bookmarkedShown) setBookmarkedShown(false);
        const titleName = showType === 0 ? data.title : data.name;
        const titleRelease = showType === 0 ? data.release_date : showType === 1 ? data.first_air_date : data.released;
        const name = sluggify(titleName) + "-" + titleRelease.slice(0, 4);
        navigate(`/details/${name}`);
    };

    return (
        <>
            <div
                onClick={fetchDetails}
                className="bg-base-200 p-4 rounded shadow cursor-pointer transition duration-300 border-2 border-transparent hover:scale-105 hover:border hover:border-white"
            >
                {resultEl}
            </div>
        </>
    );
};

export default Result;
