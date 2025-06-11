import { useContext } from "react";
import MyContext from "../context/MyContext";
import Result from "./Result";

const Personality = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { personData: data, setIsLoading, containerStyles, gridStyles } = context;

    const labelStyles: string = "font-bold opacity-70 text-purple-300"; // Define label el styles

    const type: string = data[0].known_for_department === "Acting" ? "actor" : "director"; // Is it an actor/actress or a director?

    const projects: any[] =
        type === "actor"
            ? data[1].cast.filter((x: any) => x.genre_ids.every((y: any) => ![10767, 99].includes(y)))
            : data[1].crew.filter((x: any) => x.job === "Director"); // Get their projects, exclude some genres

    return (
        <section data-name="Personality" className={containerStyles}>
            {/* BIG TITLE */}
            <div className="text-5xl font-bold mb-5">{data[0].name}</div>

            {/* FLEXBOX */}
            <div className="flex w-full flex-col md:flex-row relative mb-20" style={{ zIndex: 1 }}>
                {/* LEFT COLUMN */}
                <div className="w-full md:w-1/3 p-4" style={{ backgroundColor: `rgba(0,0,0, 0.5)` }}>
                    {/* PHOTO */}
                    <div className="p-4 rounded shadow">
                        {data[0].profile_path ? (
                            <img
                                className="w-[100%] h-[100%] object-cover bg-black"
                                src={"https://image.tmdb.org/t/p/original/" + data[0].profile_path}
                                alt="Person Image"
                            />
                        ) : (
                            <div className="h-full min-h-[100%] bg-black flex items-center justify-center italic">
                                No profile image available
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="w-full relative md:w-2/3 p-4 pt-8" style={{ backgroundColor: `rgba(0,0,0, 0.4)` }}>
                    {/* BIRTHDAY */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className={labelStyles}>Birthday:</span> <span>{data[0].birthday}</span>{" "}
                        {/* IF NOT DEAD, SHOW AGE NOW */}
                        {!data[0].deathday && (
                            <span className="opacity-50">
                                (
                                {Math.trunc(
                                    (new Date().getTime() - new Date(data[0].birthday).getTime()) / 1000 / 60 / 60 / 24 / 365
                                ) + ` years old`}
                                )
                            </span>
                        )}
                    </div>

                    {/* DEATHDAY */}
                    {/* IF DEAD, SHOW AGE AT DEATH */}
                    {data[0].deathday && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Deathday:</span> <span>{data[0].deathday}</span>{" "}
                            <span className="opacity-50">
                                (
                                {Math.trunc(
                                    (new Date(data[0].deathday).getTime() - new Date(data[0].birthday).getTime()) /
                                        1000 /
                                        60 /
                                        60 /
                                        24 /
                                        365
                                ) + ` years old`}
                                )
                            </span>
                        </div>
                    )}

                    {/* PLACE OF BIRTH */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className={labelStyles}>Place of Birth:</span> <span>{data[0].place_of_birth}</span>
                    </div>

                    {/* BIO */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className={labelStyles}>Biography:</span> {data[0].biography}
                    </div>
                </div>
            </div>

            {/* SHOW 'PLAYED IN' OR 'DIRECTED' */}
            {type === "actor" ? (
                <div className="text-3xl font-bold mb-5">
                    Played In {projects.filter((x: any) => x.media_type === "movie" || x.media_type === "tv").length} Titles
                </div>
            ) : (
                <div className="text-3xl font-bold mb-5">Directed {projects.length} Titles</div>
            )}

            {/* SHOW LIST OF PROJECTS */}
            <div className={gridStyles}>
                {projects
                    .filter((x: any) => x.media_type === "movie" || x.media_type === "tv")
                    .map((proj: any) => {
                        // If it's a movie
                        if (proj.media_type === "movie")
                            return <Result key={proj.id} data={proj} showType={0} setIsLoading={setIsLoading} />;
                        // If it's a series
                        else if (proj.media_type === "tv")
                            return <Result key={proj.id} data={proj} showType={1} setIsLoading={setIsLoading} />;
                        // Else return null
                        else return <div>null</div>;
                    })}
            </div>
        </section>
    );
};

export default Personality;
