import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <>
            <div className="text-center">
                <div className="text-[120px] font-bold mb-5">404</div>
                <div className="text-5xl font-bold mb-14">Not Found</div>
                <div className="mb-10 italic text-2xl mb-14">Perdón! The page you're looking for does not exist!</div>
                <Link to="/" className="btn btn-success">
                    Back to Home
                </Link>
            </div>
        </>
    );
};

export default NotFoundPage;
