import { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";
import getDetailsGameMarkup from "../utils/getDetailsGameMarkup";
import getDetailsSerieMarkup from "../utils/getDetailsSerieMarkup";
import getDetailsMovieMarkup from "../utils/getDetailsMovieMarkup";

const Details = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { details, showType, setDetails, gameScreens } = context;

    let theElement: JSX.Element | null = null;

    const backToSearch = () => {
        setDetails({});
        // setResults([]);
    };

    // Format date
    const formatDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long", // full month name
        day: "numeric",
    });

    // Format budget
    const formatBudget = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });

    // Format runtime
    const formatRuntime = (runtime: number): string => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    };

    // Additional screenshots for the game
    const [additionalScreens, setAdditionalScreens] = useState();
    useEffect(() => {
        setAdditionalScreens(gameScreens.find((x: any) => x.slug === details.slug)?.short_screenshots);
    }, [gameScreens]);

    // Show movie
    if (showType === 0) theElement = getDetailsMovieMarkup(details, formatRuntime, formatDate, formatBudget);

    // Show series
    if (showType === 1) theElement = getDetailsSerieMarkup(details);

    // Show game
    if (showType === 2) theElement = getDetailsGameMarkup(details, additionalScreens);

    return (
        <section className="max-w-[1400px] px-5 mx-auto py-6 pb-60">
            <button onClick={backToSearch} className="btn btn-success opacity-30 hover:opacity-100 transition-all duration-200">
                Back To Search
            </button>
            {theElement}
        </section>
    );
};

export default Details;
