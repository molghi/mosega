import { useState, useEffect } from "react";

const getDetailsSerieMarkup = (details: any) => {
    console.log(details);

    let firstAir = null;
    if (new Date(details.first_air_date).getFullYear() === new Date().getFullYear()) {
        firstAir = <span className="text-success">(This year)</span>;
    } else if (new Date(details.first_air_date).getFullYear() === new Date().getFullYear() + 1) {
        firstAir = <span>(Next year)</span>;
    } else if (new Date(details.first_air_date).getFullYear() === new Date().getFullYear() - 1) {
        firstAir = <span className="text-warning">(Last year)</span>;
    } else firstAir = <span>(~{new Date().getFullYear() - new Date(details.first_air_date).getFullYear()} years ago)</span>;

    let lastAir = null;
    if (new Date(details.last_air_date).getFullYear() === new Date().getFullYear()) {
        lastAir = <span className="text-success">(This year)</span>;
    } else if (new Date(details.last_air_date).getFullYear() === new Date().getFullYear() + 1) {
        lastAir = <span>(Next year)</span>;
    } else if (new Date(details.last_air_date).getFullYear() === new Date().getFullYear() - 1) {
        lastAir = <span className="text-warning">(Last year)</span>;
    } else lastAir = <span>(~{new Date().getFullYear() - new Date(details.last_air_date).getFullYear()} years ago)</span>;

    const labelStyles = "font-bold opacity-70 text-purple-300";

    const trailers = details.videos.results.filter((x: any) => x.type === "Teaser" || x.type === "Trailer");

    const [epsData, setEpsData] = useState<any>([]);

    useEffect(() => {
        if (details.episodesData && details.episodesData.length > 0) {
            const formatted = details.episodesData.map((season: any) =>
                season.episodes.map((episode: any) => `${episode.episode_number}. ${episode.name} (${episode.runtime}m)`)
            );
            console.log(formatted);
            setEpsData(formatted);
        }
    }, [details.episodesData]);

    const getEpisodesData = (serie: any): any => {
        console.log(serie);

        return serie.episodesData
            .find((seasonObj: any) => seasonObj.name === serie.name)
            .map((z: any) => z.episodes.map((w: any, q: any) => w.episode_number));
    };

    const getTotalHours = (season: any) => {
        const res = Math.round(
            details.episodesData[season.season_number - 1]?.episodes.reduce((sum: number, ep: any) => sum + ep.runtime, 0) / 60
        );
        return res;
    };

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
            {details.name && (
                <h2 className="text-6xl font-bold my-10">
                    {details.name} ({details.first_air_date.split("-")[0]}-
                    {details.in_production ? "..." : details.last_air_date.split("-")[0]})
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
                <div className="w-2/3 p-4 py-8" style={{ backgroundColor: `rgba(0,0,0, 0.4)` }}>
                    {/* TITLE */}
                    {details.name && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Title:</span> {details.name}
                        </div>
                    )}

                    {/* GENRES */}
                    {details.genres && details.genres.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Genres:</span> {details.genres.map((x: any) => x.name).join(", ")}
                        </div>
                    )}

                    {/* RUNTIME */}
                    {/* <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Runtime:</span> {formatRuntime(details.runtime)}
                        </div> */}

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

                    {/* RELEASE DATE */}
                    {/* <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Release Date:</span> {formatDate.format(new Date(details.release_date))}{" "}
                            (~
                            {new Date().getFullYear() - new Date(details.release_date).getFullYear()} years ago)
                        </div> */}

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
                            {details.created_by.map((x: any) => x.name).join(", ")}
                        </div>
                    )}

                    {/* CAST */}
                    {details.cast.cast && details.cast.cast.length > 0 && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Cast: </span>
                            {details.cast.cast.map((x: any, i: number, a: any) => (
                                <span key={i}>
                                    {x.name} <span className="opacity-50">({x.character})</span>
                                    {i === a.length - 1 ? "" : ", "}
                                </span>
                            ))}
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

                    {/* FIRST EPISODE */}
                    {details.first_air_date && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>First Episode Air Date:</span> {details.first_air_date} {firstAir}
                        </div>
                    )}

                    {/* LAST EPISODE */}
                    {details.last_air_date && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Last Episode Air Date: </span>
                            {details.last_air_date} {lastAir}
                        </div>
                    )}

                    {/* RATING */}
                    {details.vote_average && (
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
                <div className="flex space-x-10 mb-6">
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
                    <div className="grid grid-cols-4 gap-4">
                        {details.seasons.map((season: any, i: number) => (
                            <div key={i} className="py-3">
                                {/* NAME */}
                                <div className="my-3">{season.name}</div>

                                {/* POSTER */}
                                <div className="h-[492px]">
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
                                    {epsData.length > 0 && !isNaN(getTotalHours(season)) && (
                                        <span> ({getTotalHours(season)} total hours)</span>
                                    )}
                                </div>

                                {epsData.length > 0 && (
                                    <div>
                                        {epsData[season.season_number - 1]?.map((ep: any, i: number) => (
                                            <div key={i}>{ep}</div>
                                        ))}
                                    </div>
                                )}

                                {season.overview && (
                                    <div className="my-3">
                                        <span className={labelStyles}>Overview:</span>{" "}
                                        <button className="font-bold underline hover:no-underline active:opacity-60">Show</button>
                                        {/* <span className="text-sm hidden">{season.overview}</span> */}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* SCREENSHOTS */}
            {details.screenshots.backdrops && details.screenshots.backdrops.length > 0 && (
                <div className="relative" style={{ zIndex: 1 }}>
                    <h3 className="text-5xl font-bold mt-40 mb-20">Gallery</h3>
                    <div className="grid grid-cols-4 gap-4">
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
                    <div className="grid grid-cols-4 gap-4">
                        {trailers.map((x: any, i: number) => (
                            <div
                                key={i}
                                className="bg-black border-white border-2  p-4 text-center h-full w-full flex flex-col items-center justify-center min-h-[200px] cursor-pointer transition duration-200 hover:scale-105"
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

export default getDetailsSerieMarkup;
