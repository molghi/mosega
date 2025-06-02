import { useState, useEffect, useRef, useContext } from "react";
import MyContext from "../context/MyContext";
import fetchMovies from "../utils/fetchMovies";
import fetchSeries from "../utils/fetchSeries";
import fetchGames from "../utils/fetchGames";

const Search = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { setResults, setShowType, showType, setIsLoading, searchTerm, setSearchTerm, setRunnedSearchTerm } = context;

    const [activeTab, setActiveTab] = useState<number>(showType); // 0 for Movies, 1 for Series, 2 for Games
    const inputEl = useRef<HTMLInputElement>(null);

    const searchOptions: string[] = ["Movies", "Series", "Games"];

    const apiKeyMoviesSeries: string = import.meta.env.VITE_TMDB_API_KEY;
    const apiKeyGames: string = import.meta.env.VITE_RAWG_IO_API_KEY;

    // Submit search term and fetch results
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        let response;
        setIsLoading(true);
        if (activeTab === 0) response = await fetchMovies(apiKeyMoviesSeries, searchTerm); // Fetch movies
        if (activeTab === 1) response = await fetchSeries(apiKeyMoviesSeries, searchTerm); // Fetch series
        if (activeTab === 2) response = await fetchGames(apiKeyGames, searchTerm); // Fetch games
        setIsLoading(false);
        setResults(response);
        setRunnedSearchTerm(searchTerm);
        setSearchTerm("");
        setShowType(activeTab); // To know if fetching movies, series or games
    };

    useEffect(() => {
        // Focus form input
        if (inputEl?.current) inputEl.current.focus();
    }, [activeTab]);

    return (
        <section data-name="Search" className="max-w-[1200px] mx-auto px-4 py-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex space-x-8">
                    {/* TITLE */}
                    <h2 className="text-4xl font-bold mb-5">Search</h2>

                    {/* TABS */}
                    <div className="tabs tabs-boxed mb-4">
                        {searchOptions.map((name, index) => {
                            const activityClass =
                                index === activeTab ? "tab-active bg-primary" : "hover:bg-primary hover:opacity-70";
                            return (
                                <a
                                    key={index}
                                    className={`tab transition-all duration-200 ${activityClass}`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {name}
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* SEARCH FORM */}
                <form className="flex space-x-3" onSubmit={submitForm}>
                    <input
                        ref={inputEl}
                        type="text"
                        placeholder="Search..."
                        className="input input-bordered border-2 focus:border-primary focus:outline-none flex-grow"
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="btn btn-accent">
                        Search
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Search;
