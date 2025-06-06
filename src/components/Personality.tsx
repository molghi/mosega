import { useContext } from "react";
import MyContext from "../context/MyContext";
import Result from "./Result";

const Personality = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { personData: data, setIsLoading } = context;

    // console.log(data);

    const labelStyles = "font-bold opacity-70 text-purple-300";

    const type = data.known_for_department === "Acting" ? "actor" : "director";
    const projects =
        type === "actor"
            ? data.cast.filter((x: any) => x.genre_ids.every((y: any) => ![10767, 99].includes(y)))
            : data.crew.filter((x: any) => x.job === "Director");
    console.log(projects);

    return (
        <section data-name="Personality" className="max-w-[1200px] mx-auto px-4 py-6 pb-30">
            <div className="text-5xl font-bold mb-5">{data.name}</div>

            <div className="flex w-full relative mb-20" style={{ zIndex: 1 }}>
                {/* Left col */}
                <div className="w-1/3 p-4" style={{ backgroundColor: `rgba(0,0,0, 0.5)` }}>
                    {/* Photo */}
                    <div className="p-4 rounded shadow ">
                        {/* hover:opacity-0 transition-all duration-200 */}
                        {data.profile_path ? (
                            <img
                                className="w-[100%] h-[100%] object-cover bg-black"
                                src={"https://image.tmdb.org/t/p/original/" + data.profile_path}
                                alt="Person Image"
                            />
                        ) : (
                            <div className="h-full min-h-[100%] bg-black flex items-center justify-center italic">
                                No image available
                            </div>
                        )}
                    </div>
                </div>

                {/* Right col */}
                <div className="relative w-2/3 p-4 pt-8" style={{ backgroundColor: `rgba(0,0,0, 0.4)` }}>
                    {/* Birthday */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className={labelStyles}>Birthday:</span> <span>{data.birthday}</span>{" "}
                        {!data.deathday && (
                            <span className="opacity-50">
                                (
                                {Math.trunc(
                                    (new Date().getTime() - new Date(data.birthday).getTime()) / 1000 / 60 / 60 / 24 / 365
                                ) + ` years old`}
                                )
                            </span>
                        )}
                    </div>

                    {/* Deathday */}
                    {data.deathday && (
                        <div className="p-4 pb-1 pt-2 rounded">
                            <span className={labelStyles}>Deathday:</span> <span>{data.deathday}</span>{" "}
                            <span className="opacity-50">
                                (
                                {Math.trunc(
                                    (new Date(data.deathday).getTime() - new Date(data.birthday).getTime()) /
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

                    {/* Place of birth */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className={labelStyles}>Place of Birth:</span> <span>{data.place_of_birth}</span>
                    </div>

                    {/* Bio */}
                    <div className="p-4 pb-1 pt-2 rounded">
                        <span className={labelStyles}>Biography:</span> <span></span>
                        {data.biography}
                    </div>
                </div>
            </div>

            {/* List of Projects */}
            {type === "actor" ? (
                <div className="text-3xl font-bold mb-5">
                    Played In {projects.filter((x: any) => x.media_type === "movie" || x.media_type === "tv").length} Titles
                </div>
            ) : (
                <div className="text-3xl font-bold mb-5">Directed {projects.length} Titles</div>
            )}
            <div className="grid grid-cols-5 gap-4 pb-60">
                {projects
                    .filter((x: any) => x.media_type === "movie" || x.media_type === "tv")
                    .map((proj: any) => {
                        if (proj.media_type === "movie")
                            return <Result key={proj.id} data={proj} showType={0} setIsLoading={setIsLoading} />;
                        else if (proj.media_type === "tv")
                            return <Result key={proj.id} data={proj} showType={1} setIsLoading={setIsLoading} />;
                        else return <div>null</div>;
                    })}
            </div>
        </section>
    );
};

export default Personality;
