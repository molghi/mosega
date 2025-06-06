import { useContext } from "react";
import MyContext from "../context/MyContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { setFavoritesShown, setBookmarkedShown } = context;

    const navigate = useNavigate();

    return (
        <header className="bg-base-200 mb-7 relative" style={{ zIndex: 1 }}>
            <div className="max-w-[1200px] mx-auto">
                <div className="navbar px-1 py-5 sm:py-6 sm:px-4">
                    {/* LOGO / SLOGAN */}
                    <div className="flex-1 flex items-center">
                        <Link to="/" className="btn btn-ghost normal-case text-3xl">
                            <h1 title="MOvies, SEries, GAmes" className="mr-6 hover:scale-125 transition duration-300">
                                MoSeGa
                            </h1>
                        </Link>
                        <span className="text-sm italic hidden md:block">Discover Movies, Series & Games in One Place!</span>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex-none space-x-3 mr-3 ">
                        <button
                            className="btn btn-secondary"
                            title="View titles marked as favorite"
                            onClick={() => navigate("/favorites")}
                        >
                            Favorites
                        </button>
                        <button
                            className="btn btn-primary"
                            title="View bookmarked titles"
                            onClick={() => navigate("/bookmarked")}
                        >
                            Bookmarked
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
