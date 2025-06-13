import { useNavigate, useLocation } from "react-router-dom";
import fetchMovies from "../utils/fetchMovies";
import fetchSeries from "../utils/fetchSeries";
import fetchGames from "../utils/fetchGames";
import fetchByGenre from "../utils/fetchByGenre";

interface PagiTypes {
    data: any;
    showType: number;
    setIsLoading: any;
    setResults: any;
    pagesArray: any[];
    runnedSearchTerm: string;
    currentPage: any;
    type: string;
}

const Pagination = ({ data, showType, setIsLoading, setResults, pagesArray, runnedSearchTerm, currentPage, type }: PagiTypes) => {
    const navigate = useNavigate();

    // API keys
    const apiKeyMoviesSeries: string = import.meta.env.VITE_TMDB_API_KEY;
    const apiKeyGames: string = import.meta.env.VITE_RAWG_IO_API_KEY;

    // Fetch new page
    const fetchNewPage = async (pageNum: any, currentPage: any) => {
        if (currentPage === 1 && pageNum === "-1") return;
        if (currentPage === data.total_pages && pageNum === "+1") return;
        const apiKey = showType === 2 ? apiKeyGames : apiKeyMoviesSeries;
        setIsLoading(true);
        pageNum = pageNum === "-1" ? currentPage - 1 : pageNum === "+1" ? currentPage + 1 : pageNum;
        let results;
        if (showType === 0 && type === "not genre") results = await fetchMovies(apiKey, runnedSearchTerm, pageNum);
        if (showType === 1 && type === "not genre") results = await fetchSeries(apiKey, runnedSearchTerm, pageNum);
        if (showType === 2 && type === "not genre") results = await fetchGames(apiKey, runnedSearchTerm, pageNum);
        if (type === "genre") {
            const fetchType = showType === 0 ? "movie" : showType === 1 ? "tv" : "";
            results = await fetchByGenre(apiKey, data.genre, fetchType, pageNum);
        }
        setIsLoading(false);
        setResults(results);
        window.scrollTo({ top: 0 });
        navigate(`${location.pathname.split("?")[0]}?page=${pageNum}`);
    };

    const pageNow = showType !== 2 ? data.page : data.next.split("page=")[1].split("&")[0] - 1;

    const lastIndex: number = pagesArray.indexOf(pageNow + 9) === -1 ? pagesArray.length : pagesArray.indexOf(pageNow + 9);
    let slicedArray = pagesArray.slice(pagesArray.indexOf(pageNow), lastIndex);
    if (pageNow === 1) slicedArray = pagesArray.slice(0, 9);

    const totalPages: number = data.total_pages ? data.total_pages : Math.ceil(data.count / data.results.length);

    // console.log(totalPages, pageNow);

    return (
        <div className={`flex justify-center ${type === "genre" ? "pb-40" : ""}`}>
            <div className="join">
                {/* PREV PAGE */}
                <button className="join-item btn" onClick={() => fetchNewPage("-1", pageNow)}>
                    «
                </button>

                {/* PAGE 1 */}
                <button
                    className={`join-item btn ${1 === pageNow ? "bg-success text-black hover:bg-success" : ""}`}
                    onClick={() => fetchNewPage(1, pageNow)}
                >
                    1
                </button>

                {slicedArray[0] !== 2 && <button className="join-item btn pointer-events-none">...</button>}

                {/* PAGES */}
                {slicedArray.map((x, i) => {
                    return (
                        <button
                            key={i}
                            className={`join-item btn ${x === pageNow ? "bg-success text-black hover:bg-success" : ""} ${
                                x === "..." ? "pointer-events-none" : ""
                            }`}
                            onClick={() => fetchNewPage(x, pageNow)}
                        >
                            {x}
                        </button>
                    );
                })}

                {/* IF MANY PAGES */}
                {totalPages > 10 && (
                    <>
                        {slicedArray[slicedArray.length - 1] !== data.total_pages - 1 && (
                            <button className="join-item btn pointer-events-none">...</button>
                        )}
                    </>
                )}

                {/* LAST PAGE */}
                <button
                    onClick={() => fetchNewPage(data.total_pages, pageNow)}
                    className={`join-item btn ${totalPages === pageNow ? "bg-success text-black hover:bg-success" : ""}`}
                >
                    {totalPages}
                </button>

                {/* NEXT PAGE */}
                <button className="join-item btn" onClick={() => fetchNewPage("+1", data.page)}>
                    »
                </button>
            </div>
        </div>
    );
};

export default Pagination;
