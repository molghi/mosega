import { useContext } from "react";
import MyContext from "../context/MyContext";
import { tmdbMovies, tmdbSeries } from "../utils/genreInterpreter";
import Result from "./Result";

const Genre = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { results, setIsLoading } = context;

    const labelStyles = "font-bold opacity-70 text-purple-300";
    console.log(results);

    return (
        <section data-name="Genre" className="max-w-[1200px] mx-auto px-4 py-6 pb-30">
            <div className="text-5xl font-bold mb-10">Popular in {tmdbMovies(results.genre)}</div>

            <div className="mb-10 flex items-center space-x-10">
                <div>
                    <span className={labelStyles}>Page:</span>{" "}
                    <span>
                        {results.page}/{results.total_pages}
                    </span>
                </div>
                <div>
                    <span className={labelStyles}>Results:</span>{" "}
                    <span>
                        {results.results.length * results.page}/{results.total_results}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-4 pb-60">
                {results.results.map((res: any) => (
                    <Result key={res.id} data={res} showType={0} setIsLoading={setIsLoading} />
                ))}
            </div>
        </section>
    );
};

export default Genre;
