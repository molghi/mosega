const GameResult = ({ data }: { data: any }) => {
    return (
        <>
            {/* POSTER */}
            <div className="h-[40%] mb-3">
                {data.background_image ? (
                    <img className="w-full h-full object-cover bg-black" src={data.background_image} alt="Poster" />
                ) : (
                    <div className="h-full bg-black flex items-center justify-center italic">No poster available</div>
                )}
            </div>

            {/* TITLE */}
            {data.name && (
                <div className="mb-1 text-xl font-bold line-clamp-2" title={data.name}>
                    {data.name}
                </div>
            )}

            {/* RELEASE DATE */}
            {data.released && (
                <div className="mb-1 mt-2" title={`Released: ${data.released}`}>
                    <span className="font-bold">Released:</span> {data.released.split("-")[0]}
                </div>
            )}

            {/* GENRES */}
            {data.genres && data.genres.length > 0 && (
                <div
                    className="mb-1 mt-2 line-clamp-1"
                    title={`Genres: ${data.genres.map((genre: { id: number; name: string }) => genre.name).join(", ")}`}
                >
                    <span className="font-bold">Genres: </span>
                    {data.genres.map((genre: { id: number; name: string }) => genre.name).join(", ")}
                </div>
            )}

            {/* RATING METACRITIC */}
            {data.metacritic && (
                <div className="mb-1 mt-2">
                    <span className="font-bold">Rating Metacritic: </span>
                    {data.metacritic}/100
                </div>
            )}

            {/* RATING COMMUNITY */}
            {!data.metacritic && data.rating && data.rating > 0 ? (
                <div className="mb-1 mt-2">
                    <span className="font-bold">Community Rating: </span>
                    {data.rating.toFixed(1)}/5
                </div>
            ) : (
                ""
            )}

            {/* PLATFORMS */}
            {data.platforms && data.platforms.length > 0 && (
                <div
                    className="mb-1 mt-2 line-clamp-2"
                    title={`Platforms: ${data.platforms.map((x: any) => x.platform.name).join(", ")}`}
                >
                    <span className="font-bold">Platforms:</span> {data.platforms.map((x: any) => x.platform.name).join(", ")}
                </div>
            )}

            {/* STORES */}
            {/* {data.stores && data.stores.length > 0 && (
                <div className="  mb-1 mt-2  ">
                    <span className="font-bold">Stores:</span> {data.stores.map((x: any) => x.store.name).join(", ")}
                </div>
            )} */}

            {/* PLAYTIME */}
            {/* {data.playtime && data.playtime > 0 ? (
                <div className="  mt-2  ">
                    <span className="font-bold">Approx Playtime: </span>
                    {data.playtime} hrs
                </div>
            ) : (
                ""
            )} */}

            {/* TBA */}
            {data.tba && <div className="mt-2 italic text-success">To Be Announced...</div>}
        </>
    );
};

export default GameResult;
