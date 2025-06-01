const getSerieMarkup = (details: any) => {
    return (
        <>
            {/* BACKDROP */}
            <div
                className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original/${details.backdrop_path}}')`,
                    zIndex: -1,
                }}
            ></div>

            {/* BIG TITLE */}
            <h2 className="text-6xl font-bold my-10">
                {details.name} ({details.first_air_date.split("-")[0]}-
                {details.in_production ? "..." : details.last_air_date.split("-")[0]})
            </h2>

            <div className="flex w-full">
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
                    <div className="p-4 pb-1 pt-2 rounded shadow italic">{details.tagline}</div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="w-2/3 p-4 py-8" style={{ backgroundColor: `rgba(0,0,0, 0.4)` }}>
                    {/* TITLE */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className="font-bold">Title:</span> {details.name}
                    </div>
                    {/* GENRES */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className="font-bold">Genres:</span> {details.genres.map((x: any) => x.name).join(", ")}
                    </div>
                    {/* RUNTIME */}
                    {/* <div className="p-4 pb-1 pt-2 rounded">
                            <span className="font-bold">Runtime:</span> {formatRuntime(details.runtime)}
                        </div> */}
                    {/* LANGUAGE */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className="font-bold">Language:</span> {details.original_language.toUpperCase()}
                    </div>
                    {/* STATUS */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className="font-bold">Status:</span>{" "}
                        {details.in_production ? <span className="text-success">In Production</span> : details.status}
                    </div>
                    {/* RELEASE DATE */}
                    {/* <div className="p-4 pb-1 pt-2 rounded">
                            <span className="font-bold">Release Date:</span> {formatDate.format(new Date(details.release_date))}{" "}
                            (~
                            {new Date().getFullYear() - new Date(details.release_date).getFullYear()} years ago)
                        </div> */}
                    {/* ORIGIN COUNTRY */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className="font-bold">Origin Country:</span> {details.origin_country.join(", ")}
                    </div>
                    {/* CREATED BY */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className="font-bold">Created By:</span> {details.created_by.map((x: any) => x.name).join(", ")}
                    </div>
                    {/* PRODUCTION COUNTRIES */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className="font-bold">Production Countries:</span>{" "}
                        {details.production_countries.map((x: any) => x.name).join(", ")}
                    </div>
                    {/* PRODUCTION COMPANIES */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className="font-bold">Production Companies:</span>{" "}
                        {details.production_companies.map((x: any) => x.name).join(", ")}
                    </div>
                    {/* FIRST EPISODE */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className="font-bold">First Episode Air Date:</span> {details.first_air_date} (~
                        {new Date().getFullYear() - new Date(details.first_air_date).getFullYear()}
                        {new Date().getFullYear() - new Date(details.first_air_date).getFullYear() === 1
                            ? " year"
                            : " years"}{" "}
                        ago)
                    </div>
                    {/* LAST EPISODE */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className="font-bold">Last Episode Air Date: </span>
                        {details.last_air_date} (~
                        {new Date().getFullYear() - new Date(details.last_air_date).getFullYear()}{" "}
                        {new Date().getFullYear() - new Date(details.last_air_date).getFullYear() === 1 ? "year" : "years"} ago)
                    </div>
                    {/* RATING */}
                    <div
                        className="p-4 pb-1 pt-2 rounded"
                        title={`Average Rating: ${details.vote_average.toFixed(1)}/10\nVote Count: ${details.vote_count}`}
                    >
                        <span className="font-bold">Rating: </span>
                        {details.vote_average.toFixed(1)}/10 (
                        {details.vote_count < 1000 ? details.vote_count : details.vote_count.toString().slice(0, -3) + "K votes"})
                    </div>
                    {/* OVERVIEW */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className="font-bold">Overview:</span> {details.overview}
                    </div>
                    {/* LINK */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className="font-bold">Homepage:</span>{" "}
                        <a
                            className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                            href={details.homepage}
                        >
                            Visit
                        </a>
                    </div>
                </div>
            </div>

            {/* SEASONS & EPISODES */}
            <div className="mt-40">
                {/* TITLE */}
                <h3 className="text-5xl font-bold my-10">Seasons</h3>
                <div className="flex space-x-10 mb-6">
                    <div>
                        <span>Number of seasons: </span> <span>{details.number_of_seasons}</span>
                    </div>
                    <div>
                        <span>Number of episodes: </span> <span>{details.number_of_episodes}</span>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {details.seasons.map((x: any, i: number) => (
                        <div key={i} className="py-3">
                            <div className="my-3">{x.name}</div>
                            <div className="h-[492px]">
                                {x.poster_path ? (
                                    <img src={"https://image.tmdb.org/t/p/original/" + x.poster_path} alt="Season Poster" />
                                ) : (
                                    <div className="h-full bg-black italic flex items-center justify-center">
                                        No Image Available
                                    </div>
                                )}
                            </div>
                            <div className="my-3">
                                <span className="font-bold">Air Date Start:</span>{" "}
                                <span>{x.air_date ? x.air_date : "To Be Announced..."}</span>
                            </div>
                            <div className="my-3">
                                <span className="font-bold">Episodes:</span>{" "}
                                <span>{x.episode_count ? x.episode_count : "To Be Announced..."}</span>
                            </div>
                            {x.overview && (
                                <div className="my-3">
                                    <span className="font-bold">Overview:</span> <span className="text-sm">{x.overview}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div></div>
            </div>

            {/* SCREENSHOTS */}
            <>
                <h3 className="text-5xl font-bold mt-40 mb-20">Gallery</h3>
                <div className="grid grid-cols-4 gap-4">
                    {details.screenshots.backdrops.slice(0, 20).map((x: any, i: number) => (
                        <div key={i} className="bg-black min-h-[180px] h-auto">
                            <img src={"https://image.tmdb.org/t/p/original/" + x.file_path} alt="Series screenshot" />
                        </div>
                    ))}
                </div>
            </>
        </>
    );
};

export default getSerieMarkup;
