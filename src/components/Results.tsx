import Result from "./Result";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import Pagination from "./Pagination";

const Results = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { results: data, setResults, showType, setIsLoading, runnedSearchTerm, gridStyles } = context;

    // I think it is additional screenshots a game result has
    let gameScreens: any = null;
    if (showType === 2) gameScreens = data.results?.map((x: any) => x); // If showType === 2, we're doing games

    // Content by default
    let content = <div className="text-center">Start searching!</div>;

    // If nothing was found
    if (data.results && data.results.length === 0) content = <div className="text-center">Sorry, nothing was found</div>;
    // console.log(data);

    // If something was found
    if (data.results && data.results.length > 0) {
        // const pagesArray = Array.from({ length: data.total_pages > 10 ? 9 : data.total_pages }, (_, i) => i + data.page);
        let pagesArray = Array.from({ length: data.total_pages ?? Math.ceil(data.count / data.results.length) }, (_, i) => i + 1);
        if (pagesArray[0] === 1) pagesArray.shift();
        pagesArray.pop();
        // console.log(pagesArray);
        // console.log(pagesArray[pagesArray.length - 1], data.total_pages);
        if (pagesArray[pagesArray.length - 1] >= data.total_pages)
            pagesArray = pagesArray.slice(0, pagesArray.indexOf(data.total_pages));
        content = (
            <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-12">
                    {/* SHOW WHAT WAS SEARCHED FOR */}
                    <div className="flex items-center space-x-4 mb-5">
                        <div className="text-lg font-bold">Search:</div>
                        <div>{runnedSearchTerm}</div>
                    </div>

                    {/* SHOW HOW MANY RESULTS WERE FOUND */}
                    <div className="flex items-center space-x-4 mb-5">
                        <div className="text-lg font-bold">Results:</div>
                        <div>
                            {/* {data.results.length}/ */}
                            {showType === 2 ? data.count : data.total_results}
                        </div>
                    </div>

                    {/* SHOW HOW MANY PAGES THERE ARE */}
                    <div className="flex items-center space-x-4 mb-5">
                        <div className="text-lg font-bold">Page:</div>
                        <div>
                            {showType !== 2 ? data.page : data.next.split("page=")[1].split("&")[0] - 1}/
                            {showType !== 2 ? data.total_pages : Math.ceil(data.count / data.results.length)}
                        </div>
                    </div>
                </div>

                {/* ITEMS CONTAINER */}
                <div className={`${gridStyles} auto-rows-fr`}>
                    {data.results &&
                        data.results.length > 0 &&
                        data.results.map((entry: any) => (
                            <Result
                                key={entry.id}
                                data={entry}
                                showType={showType}
                                setIsLoading={setIsLoading}
                                gameScreens={gameScreens}
                            />
                        ))}
                </div>

                {/* PAGINATION */}
                <Pagination
                    data={data}
                    showType={showType}
                    setIsLoading={setIsLoading}
                    setResults={setResults}
                    pagesArray={pagesArray}
                    runnedSearchTerm={runnedSearchTerm}
                    currentPage={data.page}
                    type="not genre"
                />
            </>
        );
    }

    return (
        <section data-name="Results" className="max-w-[1400px] px-5 sm:px-10 mx-auto py-6 pb-40">
            {content}
        </section>
    );
};

export default Results;
