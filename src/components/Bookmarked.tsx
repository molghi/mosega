import { useContext } from "react";
import Result from "./Result";
import MyContext from "../context/MyContext";

const Bookmarked = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { bookmarked, setIsLoading, containerStyles, gridStyles } = context;

    return (
        <section className={containerStyles}>
            {/* BIG TITLE */}
            <div className="text-5xl font-bold mb-10">Bookmarked ({bookmarked.length})</div>

            {/* ITEMS */}
            <div className={gridStyles}>
                {bookmarked.map((item) => {
                    const type = item.type === "movie" ? 0 : item.type === "series" ? 1 : 2; // Define type
                    return (
                        <Result
                            key={item.id}
                            data={item}
                            showType={type}
                            setIsLoading={setIsLoading}
                            gameScreens
                            scenario="favesBookmarks"
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default Bookmarked;
