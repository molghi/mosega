import { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";
import getDetailsGameMarkup from "../utils/getDetailsGameMarkup";
import getDetailsSerieMarkup from "../utils/getDetailsSerieMarkup";
import getDetailsMovieMarkup from "../utils/getDetailsMovieMarkup";
import { formatDate, formatBudget, formatRuntime } from "../utils/formatters";

const Details = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const {
        details,
        showType,
        gameScreens,
        setShowType,
        favorited,
        bookmarked,
        setPersonData,
        addOne,
        setResults,
        setIsLoading,
    } = context;

    let theElement: JSX.Element | null = null;

    // Additional screenshots for the game
    const [additionalScreens, setAdditionalScreens] = useState<any>();
    const [isFaved, setIsFaved] = useState<boolean>(false);
    const [isBooked, setIsBooked] = useState<boolean>(false);
    const [epsData, setEpsData] = useState<any>([]);

    useEffect(() => {
        // Set additional game screenshots
        let showtype = 0;
        if (details.hasOwnProperty("budget")) showtype = 0;
        else if (details.hasOwnProperty("first_air_date")) showtype = 1;
        else showtype = 2;
        setShowType(showtype);

        if (showtype === 2 && gameScreens && gameScreens.length > 0) {
            setAdditionalScreens(gameScreens.find((x: any) => x.slug === details.slug)?.short_screenshots);
        }
    }, [details, gameScreens]);

    useEffect(() => {
        // For showing series
        if ((showType !== 1 && !details.episodesData) || details.episodesData?.length === 0) return;

        const formatted = details.episodesData.map((season: any) =>
            season.episodes.map((episode: any) => `${episode.episode_number}. ${episode.name} (${episode.runtime}m)`)
        );

        setEpsData(formatted);
    }, [showType, details]);

    useEffect(() => {
        // For showing movies
        if (showType !== 0) return;
        if (favorited.map((fav: any) => fav.id).includes(details.id)) setIsFaved(true);
        if (bookmarked.map((fav: any) => fav.id).includes(details.id)) setIsBooked(true);
    }, []);

    // Show movie
    if (showType === 0)
        theElement = getDetailsMovieMarkup(
            details,
            formatRuntime,
            formatDate,
            formatBudget,
            isFaved,
            setIsFaved,
            isBooked,
            setIsBooked,
            setPersonData,
            addOne,
            setResults,
            setIsLoading
        );

    // Show series
    if (showType === 1)
        theElement = getDetailsSerieMarkup(details, epsData, isFaved, setIsFaved, isBooked, setIsBooked, addOne, setPersonData);

    // Show game
    if (showType === 2)
        theElement = getDetailsGameMarkup(details, additionalScreens, isFaved, setIsFaved, isBooked, setIsBooked, addOne);

    return <section className="max-w-[1400px] px-5 mx-auto py-6 pb-60">{theElement}</section>;
};

export default Details;
