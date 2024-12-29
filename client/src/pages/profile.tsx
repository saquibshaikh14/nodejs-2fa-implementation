import { useEffect, useState } from 'react';
import { AuthContextType, useAuth } from '../context/auth-context';
import { ActionButton, Navbar } from '../components';
import { getUser, updateUser } from '../api';
import { extendedToast as toast } from '../utils/toast';
import { useLocation, useNavigate } from 'react-router';

const ProfilePage = () => {
    const { isAuthenticated, setLastURL } = useAuth();
    const [user, setUser] = useState<Partial<AuthContextType["user"]>>({});
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        async function loadUserData() {
            const response = await getUser();
            setFetching(false);
            if (response.status === 'success') {
                const user = (response.data as { user: AuthContextType["user"] }).user;
                setUser(user);
                setFirstName(user?.firstName || '');
                setLastName(user?.lastName || '');
                return;
            }
            if (response.status === 'error' && response.error?.type === 'ValidationError') {
                toast.error(response.error.details.join('\n'), {
                    id: 'profile-page'
                });
                return;
            }
            if (response.status === 'error') {
                if (response?.meta.redirect === 'login') {
                    //redirect to login page, if session expired or not loggedIn
                    setLastURL(location.pathname);
                    navigate('/login');
                }
            }
            toast.error(response.message, { id: 'prfile-page' });

        }
        loadUserData();
    }, []);

    const updateProfile = async () => {
        if (!firstName || !lastName) {
            setError("First Name and Last Name are required.");
            return;
        }

        setIsUpdating(true); //for indicator

        const response = await updateUser({ firstName, lastName });

        setIsUpdating(false);

        if (response.status === 'success') {
            if (response.meta.action !== '2fa') {
                const updatedUser = (response.data as { user: AuthContextType["user"] }).user;
                toast.success(response.message, { id: "profile-page" });
                setUser(updatedUser);
                return;
            }
        }
        if (response.status === 'error') {
            if (response.error?.type === 'ValidationError') {
                toast.error(response.error.details.join('\n'), { id: 'profile-page' });
                return;
            }
            if (response?.meta.redirect === 'login') {
                //redirect to login page, if session expired or not loggedIn
                setLastURL(location.pathname);
                navigate('/login');
            }
        }
        toast.error(response.message, { id: "profile-page" });
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                    <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                    <p className="text-gray-600 mt-2">You need to be logged in to access this page.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome, {user?.firstName} {user?.lastName} 👋
                        </h1>
                        <p className="text-gray-600 mt-2">
                            This is a protected route and can only be accessed once you are logged in.
                        </p>
                    </div>

                    {isFetching ? (<>
                        <div className="mt-6 flex justify-center items-center">
                            {/* Loading Spinner */}
                            <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    </>) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Details</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                                        <p className="text-lg text-gray-800 font-semibold">Email:</p>
                                        <p className="text-lg text-gray-800">{user?.email}</p>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                                        <p className="text-lg text-gray-800 font-semibold">First Name:</p>
                                        <p className="text-lg text-gray-800">{user?.firstName}</p>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                                        <p className="text-lg text-gray-800 font-semibold">Last Name:</p>
                                        <p className="text-lg text-gray-800">{user?.lastName}</p>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                                        <p className="text-lg text-gray-800 font-semibold">Created At:</p>
                                        <p className="text-lg text-gray-800">{new Date(user?.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                                        <p className="text-lg text-gray-800 font-semibold">Updated At:</p>
                                        <p className="text-lg text-gray-800">{new Date(user?.updatedAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>
                                <div className="space-y-6">
                                    <div className="flex flex-col">
                                        <label htmlFor="firstName" className="text-lg text-gray-800 font-semibold mb-2">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="lastName" className="text-lg text-gray-800 font-semibold mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                                    <div className="mt-6">
                                        <ActionButton isLoading={isUpdating} text="Update" onClick={updateProfile} textLoading="updating..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </>
    );
};

export default ProfilePage;














// const ProfilePage = () => {


//     return (
//         <div className="bg-gray-100 min-h-screen py-8 px-4">
//             <div className="max-w-4xl mx-auto">
//                 {/* Protected Route Message */}
//                 <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//                     <h1 className="text-3xl font-bold text-gray-800">
//                         Welcome 👋
//                     </h1>
//                     <p className="text-gray-600 mt-2">
//                         This is a protected route and can only be accessed once you are logged in.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;