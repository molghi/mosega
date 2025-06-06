import Search from "../components/Search";
import PopularNow from "../components/PopularNow";
import { useContext } from "react";
import MyContext from "../context/MyContext";

const Homepage = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { popularNow, results } = context;

    return (
        <>
            <Search />

            {results.length === 0 && <div className="italic text-center mt-3 mb-10">Start searching!</div>}

            {popularNow && Object.keys(popularNow).length > 0 ? (
                <PopularNow />
            ) : (
                <div className="italic text-center text-lg">Fetching this month's populars...</div>
            )}
        </>
    );
};

export default Homepage;
