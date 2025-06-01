import fetchMovie from "../utils/fetchMovie";
import fetchSerie from "../utils/fetchSerie";
import fetchGame from "../utils/fetchGame";
import { tmdbMovies, tmdbSeries } from "../utils/genreInterpreter";
import { useContext } from "react";
import MyContext from "../context/MyContext";

interface ResultTypes {
    [key: string]: any;
}

const Result = ({ data, showType, setIsLoading, gameScreens }: ResultTypes) => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { setDetails, setShowType, setGameScreens } = context;

    let resultEl: JSX.Element | null = null;

    const apiKeyMoviesSeries: string = import.meta.env.VITE_TMDB_API_KEY;
    const apiKeyGames: string = import.meta.env.VITE_RAWG_IO_API_KEY;

    // ================================================================================================

    // It is a movie
    if (showType === 0) {
        resultEl = (
            <>
                {/* POSTER */}
                <div
                    className="bg-base-200 p-4 rounded shadow min-w-[215px] h-[325px]"
                    title={data.overview ? `Overview:\n${data.overview}` : ""}
                >
                    {data.poster_path ? (
                        <img
                            className="w-[100%] h-[100%] object-cover bg-black"
                            src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
                            alt="Poster"
                        />
                    ) : (
                        <div className="h-full min-h-[100%] bg-black flex items-center justify-center italic">
                            No poster available
                        </div>
                    )}
                </div>
                {/* TITLE */}
                <div className="bg-base-200 p-4 pb-1 rounded shadow text-xl font-bold" title={data.title}>
                    {data.title}
                </div>
                {/* RELEASE DATE */}
                <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow" title={`Released: ${data.release_date}`}>
                    <span className="font-bold">Released:</span> {data.release_date.split("-")[0]}
                </div>
                {/* GENRES */}
                <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow">
                    <span className="font-bold">Genres: </span>
                    {data.genre_ids.map((genreId: number) => tmdbMovies(genreId) || "Unknown").join(", ")}
                </div>
                {/* LANG */}
                <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow">
                    <span className="font-bold">Language: </span>
                    {data.original_language.toUpperCase()}
                </div>
                {/* RATING */}
                <div
                    className="bg-base-200 p-4 pt-2 rounded shadow"
                    title={`Average Rating: ${data.vote_average.toFixed(1)}/10\nVote Count: ${data.vote_count}`}
                >
                    <span className="font-bold">Average Rating: </span>
                    {data.vote_average.toFixed(1)} (
                    {data.vote_count < 1000 ? data.vote_count : data.vote_count.toString().slice(0, -3) + "K"})
                </div>
            </>
        );
    }

    // ================================================================================================

    // It is a series
    if (showType === 1) {
        resultEl = (
            <>
                {/* POSTER */}
                <div
                    className="bg-base-200 p-4 rounded shadow min-w-[215px] h-[325px]"
                    title={data.overview ? `Overview:\n${data.overview}` : ""}
                >
                    {data.poster_path ? (
                        <img
                            className="w-[100%] h-[100%] object-cover bg-black"
                            src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
                            alt="Poster"
                        />
                    ) : (
                        <div className="h-full min-h-[100%] bg-black flex items-center justify-center italic">
                            No poster available
                        </div>
                    )}
                </div>
                {/* TITLE */}
                <div className="bg-base-200 p-4 pb-1 rounded shadow text-xl font-bold" title={data.name}>
                    {data.name}
                </div>
                {/* RELEASE DATE */}
                <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow" title={`First Aired: ${data.first_air_date}`}>
                    <span className="font-bold">First Aired:</span> {data.first_air_date.split("-")[0]}
                </div>
                {/* GENRES */}
                <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow">
                    <span className="font-bold">Genres: </span>
                    {data.genre_ids.map((genreId: number) => tmdbSeries(genreId) || "Unknown").join(", ")}
                </div>
                {/* LANG */}
                <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow">
                    <span className="font-bold">Language: </span>
                    {data.original_language.toUpperCase()}
                </div>
                {/* RATING */}
                <div
                    className="bg-base-200 p-4 pt-2 rounded shadow"
                    title={`Average Rating: ${data.vote_average.toFixed(1)}/10\nVote Count: ${data.vote_count}`}
                >
                    <span className="font-bold">Average Rating: </span>
                    {data.vote_average.toFixed(1)} (
                    {data.vote_count < 1000 ? data.vote_count : data.vote_count.toString().slice(0, -3) + "K"})
                </div>
            </>
        );
    }

    // ================================================================================================

    // It is a game
    if (showType === 2) {
        resultEl = (
            <>
                {/* POSTER */}
                <div className="bg-base-200 p-4 rounded shadow min-w-[215px] h-[325px]">
                    {data.background_image ? (
                        <img className="w-[100%] h-[100%] object-cover bg-black" src={data.background_image} alt="Poster" />
                    ) : (
                        <div className="h-full min-h-[100%] bg-black flex items-center justify-center italic">
                            No poster available
                        </div>
                    )}
                </div>

                {/* TITLE */}
                <div className="bg-base-200 p-4 pb-1 rounded shadow text-xl font-bold" title={data.name}>
                    {data.name}
                </div>

                {/* RELEASE DATE */}
                {data.released && (
                    <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow" title={`Released: ${data.released}`}>
                        <span className="font-bold">Released:</span> {data.released.split("-")[0]}
                    </div>
                )}

                {/* GENRES */}
                <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow">
                    <span className="font-bold">Genres: </span>
                    {data.genres.map((genre: { id: number; name: string }) => genre.name).join(", ")}
                </div>

                {/* RATING METACRITIC */}
                {data.metacritic && (
                    <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow">
                        <span className="font-bold">Rating Metacritic: </span>
                        {data.metacritic}/100
                    </div>
                )}

                {/* RATING COMMUNITY */}
                {data.rating && data.rating > 0 ? (
                    <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow">
                        <span className="font-bold">Community Rating: </span>
                        {data.rating.toFixed(1)}/5
                    </div>
                ) : (
                    ""
                )}

                {/* PLATFORMS */}
                {data.platforms && (
                    <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow">
                        <span className="font-bold">Platforms:</span> {data.platforms.map((x: any) => x.platform.name).join(", ")}
                    </div>
                )}

                {/* STORES */}
                {data.stores && data.stores.length > 0 && (
                    <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow">
                        <span className="font-bold">Stores:</span> {data.stores.map((x: any) => x.store.name).join(", ")}
                    </div>
                )}

                {/* PLAYTIME */}
                {data.playtime && data.playtime > 0 ? (
                    <div className="bg-base-200 p-4 pt-2 rounded shadow">
                        <span className="font-bold">Approx Playtime: </span>
                        {data.playtime} hrs
                    </div>
                ) : (
                    ""
                )}

                {/* TBA */}
                {data.tba && <div className="bg-base-200 p-4 pt-2 rounded shadow italic text-success">To Be Announced...</div>}
            </>
        );
    }

    // ================================================================================================

    const fetchDetails = async () => {
        let res;
        setIsLoading(true);
        if (showType === 0) res = await fetchMovie(apiKeyMoviesSeries, data.id); // It is a movie
        if (showType === 1) res = await fetchSerie(apiKeyMoviesSeries, data.id); // It is a serie
        if (showType === 2) res = await fetchGame(apiKeyGames, data.slug); // It is a game
        setIsLoading(false);
        setDetails(res);
        setGameScreens(gameScreens);
    };

    // ================================================================================================

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
