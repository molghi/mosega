import { useContext } from "react";
import MyContext from "../context/MyContext";
import { tmdbMovies, tmdbSeries } from "../utils/genreInterpreter";
import Result from "./Result";
import Pagination from "./Pagination";

const Genre = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { results, setIsLoading, containerStyles, gridStyles, showType, setResults, runnedSearchTerm } = context;

    // console.log(results);

    const labelStyles = "font-bold opacity-70 text-purple-300";

    if (results.length === 0) return null;

    let pagesArray = Array.from({ length: results.total_pages }, (_, i) => i + 1);
    if (pagesArray[0] === 1) pagesArray.shift();
    pagesArray.pop();

    return (
        <section data-name="Genre" className={containerStyles}>
            {/* BIG TITLE */}
            <div className="text-5xl font-bold mb-10">Popular in {tmdbMovies(results.genre)}</div>

            {/* QUICK META: HOW MANY PAGES, HOW MANY RESULTS */}
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
                        {results.results?.length * results.page}/{results.total_results}
                    </span>
                </div>
            </div>

            {/* ITEMS */}
            <div className={gridStyles}>
                {results.results.map((res: any) => (
                    <Result key={res.id} data={res} showType={0} setIsLoading={setIsLoading} />
                ))}
            </div>

            {/* PAGINATION */}
            <Pagination
                data={results}
                showType={showType}
                setIsLoading={setIsLoading}
                setResults={setResults}
                pagesArray={pagesArray}
                runnedSearchTerm={runnedSearchTerm}
                currentPage={results.page}
                type="genre"
            />
        </section>
    );
};

export default Genre;
