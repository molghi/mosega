import React from "react";
import { useNavigate, Link } from "react-router-dom";
import fetchCastCrew from "./fetchCastCrew";
import fetchByGenre from "./fetchByGenre";
import { tmdbMovies } from "./genreInterpreter";

const setReleased = (details: any) => {
    if (new Date(details.release_date).getFullYear() === new Date().getFullYear()) {
        return <span className="text-success">(This year)</span>;
    } else if (new Date(details.release_date).getFullYear() === new Date().getFullYear() - 1) {
        return <span>(Last year)</span>;
    } else if (new Date(details.release_date).getFullYear() === new Date().getFullYear() + 1) {
        return <span className="text-warning">(Next year)</span>;
    } else {
        return <span>(~{new Date().getFullYear() - new Date(details.release_date).getFullYear()} years ago)</span>;
    }
};

const getDetailsMovieMarkup = (
    details: any,
    formatRuntime: (runtime: number) => string,
    formatDate: any,
    formatBudget: any,
    isFaved: boolean,
    setIsFaved: any,
    isBooked: boolean,
    setIsBooked: any,
    setPersonData: any,
    addOne: any,
    setResults: any,
    setIsLoading: any
) => {
    const navigate = useNavigate();
    let released = setReleased(details);
    const trailers = details?.videos?.results.filter((x: any) => x.type === "Teaser" || x.type === "Trailer");
    const labelStyles = "font-bold opacity-70 text-purple-300";

    const addTo = (where: string) => {
        const movieObj = {
            title: details.title,
            release_date: details.release_date,
            genres: details.genres,
            original_language: details.original_language,
            poster_path: details.poster_path,
            overview: details.overview,
            id: details.id,
            type: "movie",
        };
        addOne(where, movieObj, setIsFaved, setIsBooked);
    };

    const fetchPersonInfo = async (personId: string) => {
        setIsLoading(true);
        const data = await fetchCastCrew(import.meta.env.VITE_TMDB_API_KEY, personId);
        setIsLoading(false);
        setPersonData(data);
        navigate(`/personality/${data.name.toLowerCase().replaceAll(" ", "-")}`);
    };

    const fetchGenre = async (genreId: string) => {
        setIsLoading(true);
        const data = await fetchByGenre(import.meta.env.VITE_TMDB_API_KEY, genreId, "movie");
        setIsLoading(false);
        setResults(data);
        navigate(`/genre/${tmdbMovies(+genreId).toLowerCase().replaceAll(" ", "-")}`);
    };

    // ==========================================================================================

    return (
        <>
            {/* BACKDROP */}
            <div
                className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original/${details.backdrop_path}}')`,
                }}
            ></div>

            {/* BIG TITLE */}
            {details.title && (
                <h2 className="text-6xl font-bold my-10">
                    {details.title} ({details.release_date.split("-")[0]})
                </h2>
            )}

            <div className="flex w-full relative" style={{ zIndex: 1 }}>
                {/* LEFT COLUMN */}
                <div className="w-1/3 p-4" style={{ backgroundColor: `rgba(0,0,0, 0.5)` }}>
                    {/* POSTER */}
                    <div className="p-4 rounded shadow ">
                        {/* hover:opacity-0 transition-all duration-200 */}
                        {details.poster_path ? (
                            <img
                                className="max-w-[100%] w-[100%] h-[100%] object-cover bg-black"
                                src={"https://image.tmdb.org/t/p/original/" + details.poster_path}
                                alt="Poster"
                            />
                        ) : (
                            <div className="h-full min-h-[100%] bg-black flex items-center justify-center italic">
                                No poster available
                            </div>
                        )}
                    </div>

                    {/* TAGLINE */}
                    {details.tagline && <div className="p-4 pb-1 pt-2 rounded shadow italic">{details.tagline}</div>}
                </div>

                {/* RIGHT COLUMN */}
                <div className="relative w-2/3 p-4 pt-8" style={{ backgroundColor: `rgba(0,0,0, 0.4)` }}>
                    {/* ACTION BTNS */}
                    <div className="flex gap-4 flex-col items-end absolute top-10 right-10">
                        {!isFaved ? (
                            <button
                                onClick={() => addTo("faves")}
                                className="btn btn-secondary opacity-50 hover:opacity-100 transition duration-200"
                            >
                                Add to Favorites
                            </button>
                        ) : (
                            <div className="p-2 px-4 border rounded-md text-sm text-center opacity-50 transition duration-200 hover:opacity-100">
                                In Favorites
                            </div>
                        )}

                        {!isBooked ? (
                            <button
                                onClick={() => addTo("bookmarks")}
                                className="btn btn-primary opacity-50 hover:opacity-100 transition duration-200"
                            >
                                Add to Bookmarked
                            </button>
                        ) : (
                            <div className="p-2 px-4 border rounded-md text-sm text-center opacity-50 transition duration-200 hover:opacity-100">
                                In Bookmarks
                            </div>
                        )}
                    </div>

                    {/* TITLE */}
                    {details.title && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Title:</span> {details.title}
                        </div>
                    )}

                    {/* GENRES */}
                    {details.genres && details.genres.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Genres:</span>{" "}
                            {details.genres.map((x: any, i: number) => (
                                <React.Fragment key={i}>
                                    <Link to="" className="underline hover:no-underline" onClick={() => fetchGenre(x.id)}>
                                        {x.name}
                                    </Link>
                                    {i === details.genres.length - 1 ? "" : ", "}
                                </React.Fragment>
                            ))}
                        </div>
                    )}

                    {/* RUNTIME */}
                    {details.runtime ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Runtime:</span> {formatRuntime(details.runtime)}
                        </div>
                    ) : (
                        ""
                    )}

                    {/* LANGUAGE */}
                    {details.original_language && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Language:</span> {details.original_language.toUpperCase()}
                        </div>
                    )}

                    {/* STATUS */}
                    {details.status && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Status:</span> {details.status}
                        </div>
                    )}

                    {/* RELEASE DATE */}
                    {details.release_date && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Release Date:</span> {formatDate.format(new Date(details.release_date))}{" "}
                            {released}
                        </div>
                    )}

                    {/* DIRECTOR */}
                    {details?.cast?.crew && details?.cast?.crew.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Directors: </span>
                            {details.cast.crew
                                .filter((x: any) => x.job === "Director")
                                .map((x: any, i: number, a: any[]) => (
                                    <Link
                                        to=""
                                        className="underline hover:no-underline"
                                        onClick={() => fetchPersonInfo(x.id)}
                                        key={i}
                                    >
                                        {x.name}
                                    </Link>
                                ))}
                        </div>
                    )}

                    {/* CAST */}
                    {details?.cast?.cast && details?.cast?.cast.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Cast: </span>
                            {details.cast.cast.map((x: any, i: number, a: any) => (
                                <span key={i}>
                                    <Link to="" onClick={() => fetchPersonInfo(x.id)} className="underline hover:no-underline">
                                        {x.name}
                                    </Link>{" "}
                                    <span className="opacity-50">({x.character || "?"})</span>
                                    {i === a.length - 1 ? "" : ", "}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* BUDGET */}
                    {details.budget ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Budget:</span> {formatBudget.format(details.budget)}
                        </div>
                    ) : (
                        ""
                    )}

                    {/* REVENUE */}
                    {details.revenue ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Revenue:</span> {formatBudget.format(details.revenue)}
                        </div>
                    ) : (
                        ""
                    )}

                    {/* ORIGIN COUNTRY */}
                    {details.origin_country && details.origin_country.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Origin Country:</span> {details.origin_country.join(", ")}
                        </div>
                    )}

                    {/* PRODUCTION COUNTRIES */}
                    {details.production_countries && details.production_countries.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Production Countries:</span>{" "}
                            {details.production_countries.map((x: any) => x.name).join(", ")}
                        </div>
                    )}

                    {/* PRODUCTION COMPANIES */}
                    {details.production_companies && details.production_companies.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Production Companies:</span>{" "}
                            {details.production_companies.map((x: any) => x.name).join(", ")}
                        </div>
                    )}

                    {/* RATING */}
                    {details.vote_average ? (
                        <div
                            className="p-4 pb-1 pt-2 rounded"
                            title={`Average Rating: ${details.vote_average.toFixed(1)}/10\nVote Count: ${details.vote_count}`}
                        >
                            <span className={labelStyles}>Rating: </span>
                            {details.vote_average.toFixed(1)}/10 (
                            {details.vote_count < 1000
                                ? details.vote_count
                                : details.vote_count.toString().slice(0, -3) + "K votes"}
                            )
                        </div>
                    ) : (
                        ""
                    )}

                    {/* OVERVIEW */}
                    {details.overview && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Overview:</span> {details.overview}
                        </div>
                    )}

                    {/* LINK */}
                    {details.homepage ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Homepage:</span>{" "}
                            <a
                                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                href={details.homepage}
                            >
                                Visit
                            </a>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>

            {/* SCREENSHOTS */}
            {details?.screenshots?.backdrops && details?.screenshots?.backdrops.length > 0 && (
                <div className="relative" style={{ zIndex: 1 }}>
                    <h3 className="text-5xl font-bold mt-40 mb-20">Gallery</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {details.screenshots.backdrops.slice(0, 20).map((x: any, i: number) => (
                            <div key={i} className="bg-black min-h-[180px] h-auto">
                                <img src={"https://image.tmdb.org/t/p/original/" + x.file_path} alt="Movie screenshot" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* VIDEOS */}
            {trailers && trailers.length > 0 && (
                <div className="relative" style={{ zIndex: 1 }}>
                    <h3 className="text-5xl font-bold mt-40 mb-20">Videos</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {trailers.map((x: any, i: number) => (
                            <div
                                key={i}
                                className="bg-black border-white border-2 h-full w-full flex flex-col items-center justify-center min-h-[200px] cursor-pointer transition duration-200 hover:scale-105"
                            >
                                <div>Watch</div>
                                <div className="font-bold text-lg">{x.name}</div>
                                <div>
                                    ({x.site}, {x.type.toLowerCase()})
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default getDetailsMovieMarkup;
