import { ActionButton, Navbar } from "../components";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { extendedToast as toast } from '../utils/toast';

const SignupPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string; password?: string }>({});
    const [isLoading, setLoading] = useState<boolean>(false);

    const { register, lastURL } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        // Password must have at least one letter, one number, one special character, and be 8+ characters
        return passwordRegex.test(password);
    };

    const handleSignupForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newErrors: { firstName?: string; lastName?: string; email?: string; password?: string } = {};

        // Validate first name
        if (!firstName.trim()) {
            newErrors.firstName = "First name is required.";
        }

        // Validate last name
        if (!lastName.trim()) {
            newErrors.lastName = "Last name is required.";
        }

        // Validate email
        if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Validate password
        if (!validatePassword(password)) {
            newErrors.password =
                "Password must be at least 8 characters long, include at least one number, one uppercase letter, and one special character.";
        }

        // If there are validation errors, update the state and stop the form submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Clear errors and proceed with the signup
        setErrors({});
        setLoading(true);

        const response = await register(firstName, lastName, email, password);

        setLoading(false);
        if (response.status === 'success') {
            toast.success('Registration Successful', { id: "2fa-signup" });
            navigate(lastURL || "/");
        }
        if (response.status === 'error' && response.error?.type === 'ValidationError') {
            toast.error(response.error.details.join('\n'), { duration: 5000, id: "2fa-signup" });
        }
        if (response.status === 'error') {
            toast.error(response.message, { id: "2fa-signup" });
        }

    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 lg:px-20 text-center text-gray-800 space-y-6">
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600">Create Your Account</h1>

                    {/* Signup Form */}
                    <div className="w-full max-w-md mx-auto">
                        <form className="space-y-4" onSubmit={handleSignupForm} method="POST">
                            {/* First Name Input */}
                            <div>
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="Enter first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full p-3 mt-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            {/* Last Name Input */}
                            <div>
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Enter last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full p-3 mt-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                )}
                            </div>

                            {/* Email Input */}
                            <div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 mt-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 mt-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6">
                                <ActionButton text="Sign Up" isLoading={isLoading} type="submit" />
                            </div>
                        </form>
                    </div>

                    {/* Navigation to Login page */}
                    <div className="mt-4 text-sm text-gray-600">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-500 hover:text-blue-600 font-semibold">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupPage;