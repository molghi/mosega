import { useState, useEffect, useRef, useContext } from "react";
import MyContext from "../context/MyContext";
import fetchMovies from "../utils/fetchMovies";
import fetchSeries from "../utils/fetchSeries";
import fetchGames from "../utils/fetchGames";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const {
        setResults,
        setShowType,
        showType,
        setIsLoading,
        searchTerm,
        setSearchTerm,
        setRunnedSearchTerm,
        sluggify,
        containerStyles,
    } = context;

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<number>(showType); // 0 for Movies, 1 for Series, 2 for Games
    const inputEl = useRef<HTMLInputElement>(null);

    const searchOptions: string[] = ["Movies", "Series", "Games"]; // What can be searched for

    // API keys
    const apiKeyMoviesSeries: string = import.meta.env.VITE_TMDB_API_KEY;
    const apiKeyGames: string = import.meta.env.VITE_RAWG_IO_API_KEY;

    // Submit form and fetch results
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        let response, type;
        setIsLoading(true);
        if (activeTab === 0) {
            response = await fetchMovies(apiKeyMoviesSeries, searchTerm); // Fetch movies
            type = "movie";
        }
        if (activeTab === 1) {
            response = await fetchSeries(apiKeyMoviesSeries, searchTerm); // Fetch series
            type = "serie";
        }
        if (activeTab === 2) {
            response = await fetchGames(apiKeyGames, searchTerm); // Fetch games
            type = "game";
        }
        setIsLoading(false);
        setResults(response);
        setRunnedSearchTerm(searchTerm);
        setSearchTerm("");
        setShowType(activeTab); // To know if fetching movies, series or games
        navigate(`/results/${type}s/${sluggify(searchTerm)}`); // Show Results page
    };

    // Focus form input
    useEffect(() => {
        if (inputEl?.current) inputEl.current.focus();
    }, [activeTab]);

    return (
        <section data-name="Search" className={`${containerStyles} mb-5`}>
            <div className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:space-x-8">
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
                <form className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-3" onSubmit={submitForm}>
                    <input
                        ref={inputEl}
                        type="text"
                        placeholder="Search..."
                        className="input input-bordered border-2 focus:border-primary focus:outline-none flex-grow w-full"
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
