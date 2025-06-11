import { useContext } from "react";
import DOMPurify from "dompurify";
import MyContext from "../context/MyContext";

const setReleased = (details: any) => {
    if (new Date(details.released).getFullYear() === new Date().getFullYear()) {
        return <span className="text-success">(This year)</span>;
    } else if (new Date(details.released).getFullYear() === new Date().getFullYear() - 1) {
        return <span>(Last year)</span>;
    } else if (new Date(details.released).getFullYear() === new Date().getFullYear() + 1) {
        return <span className="text-warning">(Next year)</span>;
    } else {
        return <span>(~{new Date().getFullYear() - new Date(details.released).getFullYear()} years ago)</span>;
    }
};

interface GameDetailsProps {
    additionalScreens: any;
    setIsFaved: any;
    setIsBooked: any;
    isFaved: boolean;
    isBooked: boolean;
}

const GameDetails = ({ additionalScreens, setIsFaved, setIsBooked, isFaved, isBooked }: GameDetailsProps) => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { details, addOne, gridStyles } = context;

    const screens: any[] = additionalScreens ? additionalScreens : [];
    const addScreens: any[] = details.screenshots ? details.screenshots : [];
    let allScreens: any[] = [...addScreens, ...screens].map((x) => x.image);
    allScreens = [...new Set(allScreens)];

    // Add to faves/bookmarks
    const addTo = (where: string): void => {
        const gameObj = {
            name: details.name,
            released: details.released,
            genres: details.genres,
            background_image: details.background_image,
            description_raw: details.description_raw,
            id: details.id,
            slug: details.slug,
            type: "game",
        };
        addOne(where, gameObj, setIsFaved, setIsBooked);
    };

    let released = setReleased(details);

    const labelStyles: string = "font-bold opacity-70 text-purple-300";

    const buttons = (
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
                <h2 className="text-4xl md:text-6xl font-bold my-10">
                    {details.name} {!details.name.includes(")") ? `(${details.released?.split("-")[0]})` : ""}
                </h2>
            )}

            <div className="flex flex-wrap md:flex-nowrap w-full relative" style={{ zIndex: 1 }}>
                {/* LEFT COL */}
                <div className="w-full md:w-1/4 lg:w-1/3 p-0 md:p-4" style={{ backgroundColor: `rgba(0,0,0, 0.5)` }}>
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
                <div
                    className="relative w-full md:w-3/4 lg:w-2/3 p-0 md:p-4 py-8"
                    style={{ backgroundColor: `rgba(0,0,0, 0.4)` }}
                >
                    {buttons}

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
                    <div className={gridStyles}>
                        {allScreens.map((x: string, i: number) => (
                            <div key={i} className="bg-black min-h-[300px] h-auto">
                                <img src={x} alt="game screenshot" className="object-cover w-full h-full" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default GameDetails;
