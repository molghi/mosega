import { useContext } from "react";
import Result from "./Result";
import MyContext from "../context/MyContext";

const Bookmarked = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { bookmarked, setIsLoading } = context;

    return (
        <section className="max-w-[1200px] mx-auto px-4 py-6 pb-30">
            <div className="flex justify-between items-center mb-10">
                <div className="text-5xl font-bold">Bookmarked ({bookmarked.length})</div>
                <button className="btn">Back to Home</button>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {bookmarked.map((item) => {
                    // console.log(item);

                    const type = item.type === "movie" ? 0 : item.type === "series" ? 1 : 2;
                    console.log(type);

                    return <Result key={item.id} data={item} showType={type} setIsLoading={setIsLoading} gameScreens />;
                })}
            </div>
        </section>
    );
};

export default Bookmarked;
