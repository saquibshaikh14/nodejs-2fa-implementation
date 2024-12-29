import { ActionButton, Navbar } from "../components";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { extendedToast as toast } from '../utils/toast';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setLoading] = useState<boolean>(false);

    const { login, lastURL } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleLoginForm = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        // Validation
        const newErrors: { email?: string; password?: string } = {};
        if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);

        const response = await login(email, password);

        setLoading(false);
        if (response.status === 'success') {
            toast.success("Login successful", { id: 'login-page' });
            navigate(lastURL || "/");
            return;
        }

        if (response.error.type === 'ValidationError') {
            toast.error(response.error.details.join('\n'), { id: 'login-page' });
            return;
        }

        toast.error(response.message, { id: 'login-page' });
        return;
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 lg:px-20 text-center text-gray-800 space-y-6">
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600">
                        Login to Your Account
                    </h1>

                    {/* Login Form */}
                    <div className="w-full max-w-md mx-auto">
                        <form className="space-y-4" onSubmit={handleLoginForm} method="POST">
                            <div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 mt-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 mt-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            <div className="mt-6">
                                <ActionButton isLoading={isLoading} text="Login" onClick={handleLoginForm} />
                            </div>
                        </form>
                    </div>

                    {/* Navigation to Signup page */}
                    <div className="mt-4 text-sm text-gray-600">
                        <p>
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-blue-500 hover:text-blue-600 font-semibold"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;