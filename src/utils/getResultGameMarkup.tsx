const getResultGameMarkup = (data: any) => {
    return (
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
            {data.name && (
                <div className="bg-base-200 p-4 pb-1 rounded shadow text-xl font-bold" title={data.name}>
                    {data.name}
                </div>
            )}

            {/* RELEASE DATE */}
            {data.released && (
                <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow" title={`Released: ${data.released}`}>
                    <span className="font-bold">Released:</span> {data.released.split("-")[0]}
                </div>
            )}

            {/* GENRES */}
            {data.genres && data.genres.length > 0 && (
                <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow">
                    <span className="font-bold">Genres: </span>
                    {data.genres.map((genre: { id: number; name: string }) => genre.name).join(", ")}
                </div>
            )}

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
            {data.platforms && data.platforms.length > 0 && (
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
};

export default getResultGameMarkup;
