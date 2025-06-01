import "./index.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Results from "./components/Results";
import Details from "./components/Details";
import { useContext } from "react";
import MyContext from "./context/MyContext";
import spinnerImg from "./img/spinner.png";

function App() {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { results, showType, details, isLoading, setIsLoading } = context;

    return (
        <>
            <Header />
            {Object.keys(details).length === 0 && <Search />}
            {Object.keys(details).length === 0 && <Results data={results} showType={showType} setIsLoading={setIsLoading} />}
            {Object.keys(details).length > 0 && <Details />}
            {isLoading && (
                <div className="fixed top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <img
                        src={spinnerImg}
                        alt="loading spinner"
                        className="w-[400px] opacity-70"
                        style={{ animation: "spin 0.75s linear infinite" }}
                    />
                </div>
            )}
        </>
    );
}

export default App;
