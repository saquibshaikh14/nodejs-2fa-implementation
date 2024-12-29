import { Navbar } from "../components";
import { useAuth } from "../context/auth-context";

const HomePage = () => {
    const { user } = useAuth();

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto px-6 py-8">
                    {/* Welcome Section */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome, {user?.firstName + " " + user?.lastName}! 👋
                        </h1>
                        <p className="text-gray-600 mt-2">
                            You're successfully authenticated with our secure 2FA system.
                        </p>
                    </div>

                    {/* Application Flow Section */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Application Flow
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="text-blue-600 font-semibold mb-2">1. Authentication</div>
                                <p className="text-gray-600">
                                    Users begin by signing up or logging in with their credentials.
                                    New users will create an account, while existing users can use their email and password.
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="text-green-600 font-semibold mb-2">2. 2FA Setup</div>
                                <p className="text-gray-600">
                                    After initial authentication, users set up 2FA by scanning a QR code
                                    with their preferred authenticator app (Google Authenticator, Authy, etc.).
                                </p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <div className="text-purple-600 font-semibold mb-2">3. Secure Access</div>
                                <p className="text-gray-600">
                                    Once 2FA is set up, users will need to provide both their password
                                    and a time-based one-time password (TOTP) for future logins.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Security Features Section */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Security Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h3 className="font-semibold text-lg text-gray-800">Two-Factor Authentication</h3>
                                <p className="text-gray-600">
                                    Enhanced security using TOTP-based two-factor authentication,
                                    protecting your account even if your password is compromised.
                                </p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                                <h3 className="font-semibold text-lg text-gray-800">Secure Sessions</h3>
                                <p className="text-gray-600">
                                    Your session is securely managed, along with automatic
                                    timeout protection for inactive sessions.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ------------saquib------ */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Development Tasks</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Authentication & Session Management */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Authentication & Session</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <p className="text-gray-600">
                                                Implement user signup, login, and email/password validation
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <p className="text-gray-600">
                                                Handle protected routes, blocking access until 2FA is verified/skipped
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <p className="text-gray-600">
                                                Implement secure session handling with session timeout for idle users
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Two-Factor Authentication (2FA) */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Two-Factor Authentication (2FA)</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <p className="text-gray-600">
                                                Enable 2FA prompt, QR code generation, and TOTP verification
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <p className="text-gray-600">
                                                Restore user session and 2FA prompt state on page refresh
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <p className="text-gray-600">
                                                Implement QR code scanning with authenticator app integration
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Error Handling & Logging */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Error & Responses</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <p className="text-gray-600">
                                                Centralize error handling and log API requests and errors
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <p className="text-gray-600">
                                                Uniform API response format throughout the application
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Security Enhancements */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Security Enhancements</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">☐</span>
                                            <p className="text-gray-600">
                                                Add backup 2FA recovery codes with email verification
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">☐</span>
                                            <p className="text-gray-600">
                                                Implement password reset functionality
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">☐</span>
                                            <p className="text-gray-600">
                                                More robust session management using Redis
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ------------------------ */}

                    <div className="mt-16 mb-8 text-gray-600 text-sm italic">
                        <p><strong>Note:</strong> This project is a demonstration of the Two-Factor Authentication (2FA) implementation. While key features related to session management, error handling, and API structure are included, the project is not focused on advanced security best practices. The primary aim is to showcase the 2FA flow and its integration.</p>
                    </div>
                </div>
            </div>
        </>
    );
}


export default HomePage;