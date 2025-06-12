import { useContext, useState } from "react";
import MyContext from "../context/MyContext";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchPersonInfo, fetchGenre } from "../utils/smallFetchers";

const getFirstAir = (details: any) => {
    if (new Date(details.first_air_date).getFullYear() === new Date().getFullYear()) {
        return <span className="text-success">(This year)</span>;
    } else if (new Date(details.first_air_date).getFullYear() === new Date().getFullYear() + 1) {
        return <span>(Next year)</span>;
    } else if (new Date(details.first_air_date).getFullYear() === new Date().getFullYear() - 1) {
        return <span className="text-warning">(Last year)</span>;
    } else {
        return <span>(~{new Date().getFullYear() - new Date(details.first_air_date).getFullYear()} years ago)</span>;
    }
};

const getLastAir = (details: any) => {
    if (new Date(details.last_air_date).getFullYear() === new Date().getFullYear()) {
        return <span className="text-success">(This year)</span>;
    } else if (new Date(details.last_air_date).getFullYear() === new Date().getFullYear() + 1) {
        return <span>(Next year)</span>;
    } else if (new Date(details.last_air_date).getFullYear() === new Date().getFullYear() - 1) {
        return <span className="text-warning">(Last year)</span>;
    } else {
        return <span>(~{new Date().getFullYear() - new Date(details.last_air_date).getFullYear()} years ago)</span>;
    }
};

interface SerieDetailsProps {
    setIsFaved: any;
    setIsBooked: any;
    isFaved: boolean;
    isBooked: boolean;
    setIsModalOpen: any;
    setClickedVideo: any;
    epsData: any;
}

const SerieDetails = ({
    setIsFaved,
    setIsBooked,
    isFaved,
    isBooked,
    setIsModalOpen,
    setClickedVideo,
    epsData,
}: SerieDetailsProps) => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { details, addOne, setIsLoading, setPersonData, setResults, gridStyles } = context;

    const [isHovered, setIsHovered] = useState<string>(""); // For series to show episode screenshot
    const [hoveredIndex, setHoveredIndex] = useState<any>(null); // For series to show episode screenshot

    let firstAir = getFirstAir(details);
    let lastAir = getLastAir(details);
    const labelStyles: string = "font-bold opacity-70 text-purple-300";
    const trailers: any[] = details.videos.results.filter((x: any) => x.type === "Teaser" || x.type === "Trailer");
    const navigate = useNavigate();

    // Add to faves/bookmarked
    const addTo = (where: string): void => {
        const seriesObj = {
            name: details.name,
            first_air_date: details.first_air_date,
            genres: details.genres,
            original_language: details.original_language,
            poster_path: details.poster_path,
            overview: details.overview,
            id: details.id,
            type: "series",
        };
        addOne(where, seriesObj, setIsFaved, setIsBooked);
    };

    const getTotalHours = (season: any): number => {
        const epsObjArr = details.episodesData[season.season_number - 1]?.episodes;
        if (!epsObjArr) return 0;
        const runtimes = epsObjArr.map((x: any) => x.runtime).filter((x: any) => x);
        if (runtimes.length === 0) return 0;
        const inHours = Math.round(runtimes.reduce((x: number, y: number) => x + y, 0) / 60);
        return inHours;
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

    // =================================================================================

    return (
        <>
            {/* BACKDROP */}
            <div
                className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original/${details.backdrop_path}')`,
                }}
            ></div>

            {/* BIG TITLE */}
            {details.name && (
                <h2 className="text-4xl md:text-6xl font-bold my-10">
                    {details.name} ({details.first_air_date.split("-")[0]}-
                    {details.in_production ? "..." : details.last_air_date.split("-")[0]})
                </h2>
            )}

            <div className="flex flex-wrap md:flex-nowrap w-full relative" style={{ zIndex: 1 }}>
                {/* LEFT COLUMN */}
                <div className="w-full md:w-1/4 lg:w-1/3 p-0 md:p-4" style={{ backgroundColor: `rgba(0,0,0, 0.5)` }}>
                    {/* POSTER */}
                    <div className="p-4 rounded shadow ">
                        {/* hover:opacity-0 transition-all duration-200 */}
                        {details.poster_path ? (
                            <img
                                className="w-[100%] h-[100%] object-cover bg-black"
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
                    {buttonsMarkup}

                    {/* TITLE */}
                    {details.name && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Title:</span> {details.name}
                        </div>
                    )}

                    {/* GENRES */}
                    {details.genres && details.genres.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Genres:</span>{" "}
                            {details.genres.map((x: any, i: number) => (
                                <React.Fragment key={i}>
                                    <Link
                                        to=""
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

                    {/* LANGUAGE */}
                    {details.original_language && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Language:</span> {details.original_language.toUpperCase()}
                        </div>
                    )}

                    {/* STATUS */}
                    {details.in_production ||
                        (details.status && (
                            <div className="p-4 pb-1 pt-2 rounded">
                                <span className={labelStyles}>Status:</span>{" "}
                                {details.in_production ? <span className="text-success">In Production</span> : details.status}
                            </div>
                        ))}

                    {/* ORIGIN COUNTRY */}
                    {details.origin_country && details.origin_country.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Origin Country:</span> {details.origin_country.join(", ")}
                        </div>
                    )}

                    {/* CREATED BY */}
                    {details.created_by && details.created_by.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Created By:</span>{" "}
                            {details.created_by.map((x: any, i: number, a: any) => (
                                <React.Fragment key={i}>
                                    <Link
                                        to=""
                                        onClick={() => fetchPersonInfo(x.id, setIsLoading, setPersonData, navigate)}
                                        className="underline hover:no-underline"
                                    >
                                        {x.name}
                                    </Link>
                                    {i === a.length - 1 ? "" : ", "}
                                </React.Fragment>
                            ))}
                        </div>
                    )}

                    {/* CAST */}
                    {details.cast.cast && details.cast.cast.length > 0 && (
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
                                    <span className="opacity-50">({x.character})</span>
                                    {i === a.length - 1 ? "" : ", "}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* PRODUCTION COUNTRIES */}
                    {details.production_countries && details.production_countries.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Production Countries:</span>{" "}
                            {details.production_countries.map((x: any, i: number, a: any) => (
                                <React.Fragment key={i}>
                                    {x.name}
                                    {i === a.length - 1 ? "" : ", "}
                                </React.Fragment>
                            ))}
                        </div>
                    )}

                    {/* PRODUCTION COMPANIES */}
                    {details.production_companies && details.production_companies.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Production Companies:</span>{" "}
                            {details.production_companies.map((x: any, i: number, a: any) => (
                                <React.Fragment key={i}>
                                    {x.name}
                                    {i === a.length - 1 ? "" : ", "}
                                </React.Fragment>
                            ))}
                        </div>
                    )}

                    {/* FIRST EPISODE */}
                    {details.first_air_date && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>First Episode Air Date:</span> {details.first_air_date} {firstAir}
                        </div>
                    )}

                    {/* LAST EPISODE */}
                    {details.last_air_date ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Last Episode Air Date: </span>
                            {details.last_air_date} {lastAir}
                        </div>
                    ) : (
                        ""
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
                    {details.homepage && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Homepage:</span>{" "}
                            <a
                                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                href={details.homepage}
                            >
                                Visit
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* SEASONS & EPISODES */}
            <div className="mt-40 relative" style={{ zIndex: 1 }}>
                {/* TITLE */}
                <h3 className="text-5xl font-bold my-10">Seasons</h3>
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-10 mb-6">
                    {details.number_of_seasons && (
                        <div>
                            <span>Number of seasons: </span> <span>{details.number_of_seasons}</span>
                        </div>
                    )}
                    {details.number_of_episodes && (
                        <div>
                            <span>Number of episodes: </span> <span>{details.number_of_episodes}</span>
                        </div>
                    )}
                </div>

                {details.seasons && details.seasons.length > 0 && (
                    <div className={gridStyles}>
                        {details.seasons.map((season: any, i: number) => (
                            <div key={i} className="py-3">
                                {/* NAME */}
                                <div className="my-3">{season.name}</div>

                                {/* POSTER */}
                                <div className="md:h-[492px]">
                                    {season.poster_path ? (
                                        <img
                                            src={"https://image.tmdb.org/t/p/original/" + season.poster_path}
                                            alt="Season Poster"
                                        />
                                    ) : (
                                        <div className="h-full bg-black italic flex items-center justify-center">
                                            No Image Available
                                        </div>
                                    )}
                                </div>

                                {/* BELOW */}
                                <div className="my-3">
                                    <span className={labelStyles}>Air Date Start:</span>{" "}
                                    <span>{season.air_date ? season.air_date : "To Be Announced..."}</span>
                                </div>

                                <div className="my-3">
                                    <span className={labelStyles}>Episodes:</span>{" "}
                                    <span>{season.episode_count ? season.episode_count : "To Be Announced..."}</span>
                                    {epsData.length > 0 && !isNaN(getTotalHours(season)) ? (
                                        <span> ({getTotalHours(season)} total hours)</span>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                {epsData.length > 0 ? (
                                    <div>
                                        {epsData[season.season_number - 1]?.map((ep: any, i: number) => (
                                            <div
                                                key={i}
                                                className="relative underline hover:no-underline cursor-pointer"
                                                onMouseEnter={() => {
                                                    const seasonEpsObj = details.episodesData[season.season_number - 1].episodes;
                                                    const episodeIndex = ep.split(".")[0] - 1;
                                                    const stillPath =
                                                        "https://image.tmdb.org/t/p/original/" +
                                                        seasonEpsObj[episodeIndex].still_path;
                                                    setIsHovered(stillPath);
                                                    setHoveredIndex(`${season.season_number - 1}.${i}`);
                                                }}
                                                onMouseLeave={() => {
                                                    setIsHovered("");
                                                    setHoveredIndex(null);
                                                }}
                                            >
                                                {ep.replace(" (nullm)", "")}

                                                {/* SHOW SCREENSHOT FROM THIS EPISODE */}
                                                {season.season_number - 1 == hoveredIndex?.split(".")[0] &&
                                                    i == hoveredIndex?.split(".")[1] &&
                                                    isHovered !== "" && (
                                                        <div
                                                            className="absolute pointer-events-none top-[25px] left-[0%] bg-black"
                                                            style={{
                                                                zIndex: 10,
                                                                border: "1px solid #fff",
                                                                background: "#000",
                                                            }}
                                                        >
                                                            <img
                                                                className="w-[280px] h-[180px] object-fit"
                                                                src={isHovered}
                                                                alt="Episode screenshot"
                                                            />
                                                            <span className="absolute text-sm bottom-0 left-[5px] bg-black/30 px-[3px]">
                                                                Aired:{" "}
                                                                {
                                                                    details.episodesData[season.season_number - 1].episodes[
                                                                        ep.split(".")[0] - 1
                                                                    ].air_date
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    ""
                                )}

                                {/* {season.overview && (
                                    <div className="my-3">
                                        <span className={labelStyles}>Overview:</span>{" "}
                                        <button className="font-bold underline hover:no-underline active:opacity-60">Show</button>
                                        <span className="text-sm hidden">{season.overview}</span>
                                    </div>
                                )} */}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* SCREENSHOTS */}
            {details.screenshots.backdrops && details.screenshots.backdrops.length > 0 && (
                <div className="relative" style={{ zIndex: 1 }}>
                    <h3 className="text-5xl font-bold mt-40 mb-20">Gallery</h3>
                    <div className={gridStyles}>
                        {details.screenshots.backdrops.slice(0, 20).map((x: any, i: number) => (
                            <div key={i} className="bg-black min-h-[180px] h-auto">
                                <img src={"https://image.tmdb.org/t/p/original/" + x.file_path} alt="Series screenshot" />
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
                                key={i}
                                onClick={() => {
                                    setClickedVideo(x);
                                    setIsModalOpen(true);
                                }}
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

export default SerieDetails;
