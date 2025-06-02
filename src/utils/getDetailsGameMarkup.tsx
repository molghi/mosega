import DOMPurify from "dompurify";

const getDetailsGameMarkup = (details: any, additionalScreens: any) => {
    const screens = additionalScreens ? additionalScreens : [];

    let allScreens = [...details.results, ...screens].map((x) => x.image);
    allScreens = [...new Set(allScreens)];

    let released = null;
    if (new Date(details.released).getFullYear() === new Date().getFullYear()) {
        released = <span className="text-success">(This year)</span>;
    } else if (new Date(details.released).getFullYear() === new Date().getFullYear() + 1) {
        released = <span className="text-warning">(Next year)</span>;
    } else if (new Date(details.released).getFullYear() === new Date().getFullYear() - 1) {
        released = <span>(Last year)</span>;
    } else {
        released = <span>(~{new Date().getFullYear() - new Date(details.released).getFullYear()} years ago)</span>;
    }

    const labelStyles = "font-bold opacity-70 text-purple-300";

    return (
        <>
            {/* BACKDROP */}
            <div
                className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url('${details.background_image_additional}')`,
                }}
            ></div>

            {/* BIG TITLE */}
            {details.name && (
                <h2 className="text-6xl font-bold my-10">
                    {details.name} {!details.name.includes(")") ? `(${details.released.split("-")[0]})` : ""}
                </h2>
            )}

            <div className="flex w-full relative" style={{ zIndex: 1 }}>
                {/* LEFT COL */}
                <div className="w-1/3 p-4" style={{ backgroundColor: `rgba(0,0,0, 0.5)` }}>
                    {/* POSTER */}
                    <div className="p-4 rounded shadow h-full w-full">
                        {details.background_image ? (
                            <img
                                className="w-[100%] h-[100%] object-cover bg-black"
                                src={details.background_image}
                                alt="Poster"
                            />
                        ) : (
                            <div className="h-full min-h-[100%] bg-black flex items-center justify-center italic">
                                No poster available
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COL */}
                <div className="w-2/3 p-4 pt-8" style={{ backgroundColor: `rgba(0,0,0, 0.4)` }}>
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

                    {/* TBA */}
                    {details.tba && <div className="p-4 pb-1 pt-2 rounded">To Be Announced...</div>}

                    {/* RELEASED */}
                    {details.released ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Released:</span> {details.released} {released}
                        </div>
                    ) : (
                        ""
                    )}

                    {/* PLAYTIME */}
                    {details.playtime ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Approximate Playtime:</span> ~{details.playtime} hours
                        </div>
                    ) : (
                        ""
                    )}

                    {/* GAMES */}
                    {details.game_series_count > 0 ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Games In Series:</span> {details.game_series_count}
                        </div>
                    ) : (
                        ""
                    )}

                    {/* AGE RATING */}
                    {details.esrb_rating ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Age Rating:</span> {details.esrb_rating.name}
                        </div>
                    ) : (
                        ""
                    )}

                    {/* METACRITIC RATING */}
                    {details.metacritic ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Metacritic Rating:</span> {details.metacritic}/100
                        </div>
                    ) : (
                        ""
                    )}

                    {/* COMMUNITY RATING */}
                    {details.rating ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Community Rating:</span> {details.rating.toFixed(1)}/5
                        </div>
                    ) : (
                        ""
                    )}

                    {/* PLATFORMS */}
                    {details.platforms && details.platforms.length > 0 ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Platforms:</span>{" "}
                            {details.platforms.map((x: any) => x.platform.name).join(", ")}
                        </div>
                    ) : (
                        ""
                    )}

                    {/* STORES */}
                    {details.stores && details.stores.length > 0 ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Stores:</span> {details.stores.map((x: any) => x.store.name).join(", ")}
                        </div>
                    ) : (
                        ""
                    )}

                    {/* DEVELOPERS */}
                    {details.developers && details.developers.length > 0 ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Developers:</span>{" "}
                            {details.developers.map((x: any) => x.name).join(", ")}
                        </div>
                    ) : (
                        ""
                    )}

                    {/* DESCRIPTION */}
                    {details.description ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={`${labelStyles} float-left`}>Overview:&nbsp;</span>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details.description) }}></div>
                        </div>
                    ) : (
                        ""
                    )}

                    {/* SITE */}
                    {details.website ? (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Homepage:</span>{" "}
                            <a
                                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                href={details.website}
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
            {allScreens && allScreens.length > 0 && (
                <div className="relative" style={{ zIndex: 1 }}>
                    <h3 className="text-5xl font-bold mt-40 mb-20">Gallery</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {allScreens.map((x: string, i: number) => (
                            <div className="bg-black min-h-[300px] h-auto">
                                <img src={x} alt="game screenshot" className="object-cover w-full h-full" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default getDetailsGameMarkup;
