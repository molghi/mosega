import { createContext, ReactNode, useState } from "react";

// Define types
interface MyContextType {
    results: any;
    setResults: React.Dispatch<React.SetStateAction<any>>;
    details: { [key: string]: any };
    setDetails: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    personData: { [key: string]: any };
    setPersonData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    showType: number;
    setShowType: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    gameScreens: any;
    setGameScreens: React.Dispatch<React.SetStateAction<any>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    runnedSearchTerm: string;
    setRunnedSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    popularNow: any;
    setPopularNow: React.Dispatch<React.SetStateAction<any>>;
    favorited: any[];
    setFavorited: React.Dispatch<React.SetStateAction<any[]>>;
    bookmarked: any[];
    setBookmarked: React.Dispatch<React.SetStateAction<any[]>>;
    favoritesShown: boolean;
    setFavoritesShown: React.Dispatch<React.SetStateAction<boolean>>;
    bookmarkedShown: boolean;
    setBookmarkedShown: React.Dispatch<React.SetStateAction<boolean>>;
    localStorageFavesKey: string;
    localStorageBookmarkedKey: string;
    sluggify: (value: string) => string;
    addOne: (where: string, dataObject: any, setIsFaved: any, setIsBooked: any) => void;
    containerStyles: string;
    gridStyles: string;
}

// Create Context
const MyContext = createContext<MyContextType | undefined>(undefined);

// Context Provider Props
interface ContextProviderProps {
    children: ReactNode;
}

// ===============================================================================================================

// Context Provider
export const ContextProvider = ({ children }: ContextProviderProps) => {
    // Key names in local storage
    const localStorageFavesKey: string = `mosega_faves`;
    const localStorageBookmarkedKey: string = `mosega_bookmarked`;

    // Fetched from local storage
    const favesFromLS: any = JSON.parse(localStorage.getItem(localStorageFavesKey) ?? "[]");
    const bookmarksFromLS: any = JSON.parse(localStorage.getItem(localStorageBookmarkedKey) ?? "[]");

    const [results, setResults] = useState<any[]>([]); // type: array of objects (found results)
    const [details, setDetails] = useState<{ [key: string]: any }>({}); // for details page
    const [personData, setPersonData] = useState<{ [key: string]: any }>({}); // for personality page
    const [showType, setShowType] = useState<number>(0); // 0 for Movies, 1 for Series, 2 for Games
    const [isLoading, setIsLoading] = useState<boolean>(false); // to show the spinner
    const [gameScreens, setGameScreens] = useState<any>(null); // additional game screenshots
    const [searchTerm, setSearchTerm] = useState<string>(""); // in Search
    const [runnedSearchTerm, setRunnedSearchTerm] = useState<string>(""); // to show what was searched for
    const [popularNow, setPopularNow] = useState<any>(null); // for popular movies, series and games
    const [favorited, setFavorited] = useState<any[]>(favesFromLS); // fetched from local storage what was saved earlier
    const [bookmarked, setBookmarked] = useState<any[]>(bookmarksFromLS); // fetched from local storage what was saved earlier
    const [favoritesShown, setFavoritesShown] = useState<boolean>(false); // is favorites section shown?
    const [bookmarkedShown, setBookmarkedShown] = useState<boolean>(false); // is bookmarked section shown?

    const containerStyles: string = "max-w-[1200px] mx-auto px-2 sm:px-4 py-6 pb-30"; // tailwind topmost container styles

    const gridStyles: string = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 pb-20";

    // sluggify a string
    const sluggify = (value: string): string =>
        value
            ? value
                  .replace(/[^a-zA-Z0-9\s]/g, "")
                  .toLowerCase()
                  .split(" ")
                  .join("-")
            : "";

    // add one to Favorites or Bookmarked
    const addOne = (where: string, dataObject: any, setIsFaved: any, setIsBooked: any) => {
        if (!dataObject || !dataObject.id) return;
        // adding a favorite
        if (where === "faves") {
            const alreadyFaved = favorited.some((item: any) => item.id === dataObject.id);
            if (!alreadyFaved) {
                const newFiles = [...favorited, dataObject];
                setFavorited(newFiles);
                localStorage.setItem(localStorageFavesKey, JSON.stringify(newFiles));
            }
            setIsFaved(true);
        }
        // adding a bookmark
        if (where === "bookmarks") {
            const alreadyBooked = bookmarked.some((item: any) => item.id === dataObject.id);
            if (!alreadyBooked) {
                const newFiles = [...bookmarked, dataObject];
                setBookmarked(newFiles);
                localStorage.setItem(localStorageBookmarkedKey, JSON.stringify(newFiles));
            }
            setIsBooked(true);
        }
    };

    return (
        <MyContext.Provider
            value={{
                results,
                setResults,
                showType,
                setShowType,
                details,
                setDetails,
                isLoading,
                setIsLoading,
                gameScreens,
                setGameScreens,
                searchTerm,
                setSearchTerm,
                runnedSearchTerm,
                setRunnedSearchTerm,
                popularNow,
                setPopularNow,
                favorited,
                setFavorited,
                bookmarked,
                setBookmarked,
                favoritesShown,
                setFavoritesShown,
                bookmarkedShown,
                setBookmarkedShown,
                localStorageFavesKey,
                localStorageBookmarkedKey,
                sluggify,
                personData,
                setPersonData,
                addOne,
                containerStyles,
                gridStyles,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
