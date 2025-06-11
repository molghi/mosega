import { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";
import YouTubeModal from "./YouTubeModal";
import GameDetails from "./GameDetails";
import MovieDetails from "./MovieDetails";
import SerieDetails from "./SerieDetails";

const Details = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { details, showType, setShowType, gameScreens, favorited, bookmarked } = context;

    if (details.hasOwnProperty("first_air_date")) setShowType(1);
    else if (details.hasOwnProperty("developers")) setShowType(2);
    else setShowType(0);

    let theElement: JSX.Element | null = null; // Final element to be shown

    const [additionalScreens, setAdditionalScreens] = useState<any>(); // Additional screenshots for the game
    const [isFaved, setIsFaved] = useState<boolean>(false); // Is faved section shown
    const [isBooked, setIsBooked] = useState<boolean>(false); // Is booked section shown
    const [epsData, setEpsData] = useState<any>([]); // Episodes data
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Is Youtube modal open
    const [clickedVideo, setClickedVideo] = useState(); // Clicked video data

    // Set additional game screenshots
    useEffect(() => {
        let showtype = 0;
        if (details.hasOwnProperty("budget")) showtype = 0; // It's a movie
        else if (details.hasOwnProperty("first_air_date")) showtype = 1; // It's a series
        else showtype = 2; // It's a game
        setShowType(showtype);
        if (showtype === 2 && gameScreens && gameScreens.length > 0) {
            setAdditionalScreens(gameScreens.find((x: any) => x.slug === details.slug)?.short_screenshots);
        }
    }, [details, gameScreens]);

    // For showing series
    useEffect(() => {
        if (showType !== 1 || !details.episodesData || details.episodesData?.length === 0) return; // Return if not showing series
        // Get episode number, name and its runtime for each season
        const formatted = details.episodesData.map((season: any) =>
            season.episodes.map((episode: any) => `${episode.episode_number}. ${episode.name} (${episode.runtime}m)`)
        );
        setEpsData(formatted);
    }, [showType, details]);

    // For showing movies
    useEffect(() => {
        if (showType !== 0) return; // Return if not showing movies
        // Button section: elements are either btns 'Add to Favorites/Bookmarked' or badges 'In Favorites/Bookmarked'
        if (favorited.map((fav: any) => fav.id).includes(details.id)) setIsFaved(true);
        if (bookmarked.map((fav: any) => fav.id).includes(details.id)) setIsBooked(true);
    }, []);

    // Get markup of a movie
    if (showType === 0)
        theElement = (
            <MovieDetails
                setIsFaved={setIsFaved}
                setIsBooked={setIsBooked}
                isFaved={isFaved}
                isBooked={isBooked}
                setIsModalOpen={setIsModalOpen}
                setClickedVideo={setClickedVideo}
            />
        );

    // Get markup of a series
    if (showType === 1)
        theElement = (
            <SerieDetails
                setIsFaved={setIsFaved}
                setIsBooked={setIsBooked}
                isFaved={isFaved}
                isBooked={isBooked}
                setIsModalOpen={setIsModalOpen}
                setClickedVideo={setClickedVideo}
                epsData={epsData}
            />
        );

    // Get markup of a game
    if (showType === 2)
        theElement = (
            <GameDetails
                additionalScreens={additionalScreens}
                setIsFaved={setIsFaved}
                setIsBooked={setIsBooked}
                isFaved={isFaved}
                isBooked={isBooked}
            />
        );

    return (
        <section className="max-w-[1400px] px-5 mx-auto py-6 pb-60">
            {theElement}

            {/* Youtube iframe modal window */}
            <YouTubeModal videoDate={clickedVideo} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
};

export default Details;
