import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/auth-context";
import { extendedToast as toast } from '../utils/toast';

const LogoutPage = () => {
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    // Simulate logout process and loading state
    useEffect(() => {
        const logoutHandler = async () => {
            const response = await logout();
            if (response.status === 'success') {
                toast.success(response.message, { id: '2fa-logout' });
                setLoading(false);
            } else {
                toast.error(response.message, { id: '2fa-logout', duration: 6000 });
            }
        };
        logoutHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-6">
            <div className="text-center">
                {loading ? (
                    <>
                        <h1 className="text-7xl font-extrabold text-blue-600">Logging Out</h1>
                        <p className="text-gray-600 mt-2">Please wait while we log you out...</p>
                        <div className="mt-6 flex justify-center items-center">
                            {/* Loading Spinner */}
                            <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-7xl font-extrabold text-blue-600">Logged Out</h1>
                        <h2 className="text-2xl font-semibold text-gray-800 mt-4">You have been logged out successfully</h2>
                        <Link
                            to="/login"
                            className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                        >
                            Go to Login Page
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default LogoutPage;