import { Link } from "react-router";

const NotFoundPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-7xl font-extrabold text-blue-600">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
                <p className="text-gray-600 mt-2">
                    Sorry, the page you are looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;