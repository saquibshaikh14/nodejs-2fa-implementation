import { NavLink } from "react-router";
import { useAuth } from "../context/auth-context";

const Navbar = () => {
    const { isAuthenticated } = useAuth();

    return (
        <nav className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 h-[70px] flex justify-between items-center px-6 lg:px-20 text-white shadow-md">
            <div className="text-2xl font-semibold text-blue-500">2FA</div>

            <ul className="flex space-x-6">
                {isAuthenticated ? (
                    <>
                        <li>
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => 
                                    `${isActive ? "text-blue-400" : "text-gray-300 hover:text-blue-300"} text-lg font-medium`}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/profile" 
                                className={({ isActive }) => 
                                    `${isActive ? "text-blue-400" : "text-gray-300 hover:text-blue-300"} text-lg font-medium`}
                            >
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/logout" 
                                className={({ isActive }) => 
                                    `${isActive ? "text-blue-400" : "text-gray-300 hover:text-blue-300"} text-lg font-medium`}
                            >
                                Logout
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink 
                                to="/login" 
                                className={({ isActive }) => 
                                    `${isActive ? "text-blue-400" : "text-gray-300 hover:text-blue-300"} text-lg font-medium`}
                            >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/signup" 
                                className={({ isActive }) => 
                                    `${isActive ? "text-blue-400" : "text-gray-300 hover:text-blue-300"} text-lg font-medium`}
                            >
                                Signup
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;