import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchPersonInfo, fetchGenre } from "../utils/smallFetchers";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import { formatBudget, formatDate, formatRuntime } from "../utils/formatters";
import { tmdbMovies } from "../utils/genreInterpreter";

const setReleased = (details: any) => {
    if (new Date(details.release_date).getFullYear() === new Date().getFullYear()) {
        return <span className="text-success">(This year)</span>;
    } else if (new Date(details.release_date).getFullYear() === new Date().getFullYear() - 1) {
        return <span className="opacity-60">(Last year)</span>;
    } else if (new Date(details.release_date).getFullYear() === new Date().getFullYear() + 1) {
        return <span className="text-warning">(Next year)</span>;
    } else if (new Date(details.release_date).getFullYear() > new Date().getFullYear() + 1) {
        return (
            <span className="opacity-60">
                (in {new Date(details.release_date).getFullYear() - new Date().getFullYear()} years)
            </span>
        );
    } else {
        return (
            <span className="opacity-60">
                (~{new Date().getFullYear() - new Date(details.release_date).getFullYear()} years ago)
            </span>
        );
    }
};

interface MovieDetailsProps {
    setIsFaved: any;
    setIsBooked: any;
    isFaved: boolean;
    isBooked: boolean;
    setIsModalOpen: any;
    setClickedVideo: any;
}

const MovieDetails = ({ setIsFaved, setIsBooked, isFaved, isBooked, setIsModalOpen, setClickedVideo }: MovieDetailsProps) => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { details, addOne, setIsLoading, setPersonData, setResults, gridStyles } = context;

    const navigate = useNavigate();
    let released = setReleased(details);
    const trailers: any[] = details?.videos?.results.filter((x: any) => x.type === "Teaser" || x.type === "Trailer");
    const labelStyles: string = "font-bold opacity-70 text-purple-300";

    // Add to faves/bookmarked
    const addTo = (where: string): void => {
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

    const buttonsMarkup = (
        <div className="flex gap-4 justify-center md:justify-start mb-4 md:mb-0 md:flex-col md:items-end md:absolute md:top-10 md:right-10">
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
    );

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
                <h2 className="text-4xl md:text-6xl font-bold my-10">
                    {details.title} ({details.release_date.split("-")[0]})
                </h2>
            )}

            <div className="flex flex-wrap md:flex-nowrap w-full relative" style={{ zIndex: 1 }}>
                {/* LEFT COLUMN */}
                <div className="w-full md:w-1/4 lg:w-1/3 p-0 md:p-4" style={{ backgroundColor: `rgba(0,0,0, 0.5)` }}>
                    {/* POSTER */}
                    <div className="p-4 rounded shadow">
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
                <div
                    className="relative w-full md:w-3/4 lg:w-2/3 p-0 md:p-4 py-8"
                    style={{ backgroundColor: `rgba(0,0,0, 0.4)` }}
                >
                    {/* ACTION BTNS */}
                    {buttonsMarkup}

                    {/* TITLE */}
                    {details.title && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Title:</span> {details.title}
                        </div>
                    )}

                    {/* RELEASE DATE */}
                    {details.release_date && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Release Date:</span> {formatDate.format(new Date(details.release_date))}{" "}
                            {released}
                        </div>
                    )}

                    {/* GENRES */}
                    {details.genres && details.genres.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Genres:</span>{" "}
                            {details.genres.map((x: any, i: number) => (
                                <React.Fragment key={i}>
                                    <Link
                                        to={`/genre/${tmdbMovies(x.id).toLowerCase().replaceAll(" ", "-")}`}
                                        className="underline hover:no-underline"
                                        onClick={() => fetchGenre(x.id, setIsLoading, setResults, navigate)}
                                    >
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
                    {details.status && details.status !== "Released" && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Status:</span> {details.status}
                        </div>
                    )}

                    {/* DIRECTOR */}
                    {details?.cast?.crew && details?.cast?.crew.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Directors: </span>
                            {details.cast.crew
                                .filter((x: any) => x.job === "Director")
                                .map((x: any, i: number, a: any[]) => (
                                    <React.Fragment key={i}>
                                        <Link
                                            to={`/personality/${x.name
                                                .toLowerCase()
                                                .replace(/[^a-zA-Z0-9\- \t]/g, "")
                                                .replaceAll(" ", "-")}`}
                                            className="underline hover:no-underline"
                                            onClick={() => fetchPersonInfo(x.id, setIsLoading, setPersonData, navigate)}
                                        >
                                            {x.name}
                                        </Link>
                                        {i === a.length - 1 ? "" : ", "}
                                    </React.Fragment>
                                ))}
                        </div>
                    )}

                    {/* CAST */}
                    {details?.cast?.cast && details?.cast?.cast.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Cast: </span>
                            {details.cast.cast.map((x: any, i: number, a: any) => (
                                <span key={i}>
                                    <Link
                                        to={`/personality/${x.name
                                            .toLowerCase()
                                            .replace(/[^a-zA-Z0-9\- \t]/g, "")
                                            .replaceAll(" ", "-")}`}
                                        onClick={() => fetchPersonInfo(x.id, setIsLoading, setPersonData, navigate)}
                                        className="underline hover:no-underline"
                                    >
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
                            {details.production_countries.map((x: any, i: number, a: any) => (
                                <span key={i}>
                                    <span>{x.name}</span>
                                    {i === a.length - 1 ? "" : ", "}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* PRODUCTION COMPANIES */}
                    {details.production_companies && details.production_companies.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Production Companies:</span>{" "}
                            {details.production_companies.map((x: any, i: number, a: any) => (
                                <span key={i}>
                                    <span>{x.name}</span>
                                    {i === a.length - 1 ? "" : ", "}
                                </span>
                            ))}
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

            {/* SCREENSHOTS / GALLERY */}
            {details?.screenshots?.backdrops && details?.screenshots?.backdrops.length > 0 && (
                <div className="relative" style={{ zIndex: 1 }}>
                    <h3 className="text-5xl font-bold mt-40 mb-20">Gallery</h3>
                    <div className={gridStyles}>
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
                    <div className={gridStyles}>
                        {trailers.map((x: any, i: number) => (
                            <div
                                onClick={() => {
                                    setClickedVideo(x);
                                    setIsModalOpen(true);
                                }}
                                key={i}
                                className="bg-black border-white border-2 p-4 text-center h-full w-full flex flex-col items-center justify-center min-h-[200px] cursor-pointer transition duration-200 hover:scale-105"
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

export default MovieDetails;
