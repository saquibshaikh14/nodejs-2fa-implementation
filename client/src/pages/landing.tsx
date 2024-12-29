const LandingPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-6 lg:px-20 text-center text-gray-800 space-y-6">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-10">
                    Secure Your Applications with
                    <span className="text-blue-600"> Two-Factor Authentication (2FA)</span>
                </h1>

                {/* Description */}
                <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    This project demonstrates how to implement <span className="font-bold text-blue-600">Two-Factor Authentication (2FA)</span> in
                    <span className="font-bold"> React </span> and <span className="font-bold"> Node.js </span>, using <span className="font-bold">Speakeasy</span>, and <span className="font-bold">QRCode</span>. Learn how to generate QR codes, validate TOTP tokens, and integrate authentication seamlessly into your web applications.
                    Explore how <span className="font-bold">secure, scalable, and user-friendly 2FA</span> can enhance application security and protect user accounts from unauthorized access.
                </p>

                {/* Call to Action */}
                <div className="py-8">
                    <a
                        href="/login"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Explore the Demo
                    </a>
                </div>

                {/* Features Section */}
                <div className="mt-16 space-y-8">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Key Features of 2FA
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-blue-600">Enhanced Security</h3>
                            <p className="mt-2 text-gray-600">
                                Protect your application with an additional layer of security, preventing unauthorized access even if credentials are compromised.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-blue-600">QR Code Integration</h3>
                            <p className="mt-2 text-gray-600">
                                Easily generate QR codes for users to scan with their authenticator apps, ensuring smooth 2FA setup.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-blue-600">TOTP Token Validation</h3>
                            <p className="mt-2 text-gray-600">
                                Validate Time-based One-Time Password (TOTP) tokens to securely authenticate users during login.
                            </p>
                        </div>
                    </div>
                    <div className="mt-16 text-gray-600 text-sm italic" style={{ marginTop: '8rem', marginBottom: '8rem' }}>
                        <p><strong>Note:</strong> This project is a demonstration of the Two-Factor Authentication (2FA) implementation. While key features related to session management, error handling, and API structure are included, the project is not focused on advanced security best practices. The primary aim is to showcase the 2FA flow and its integration.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LandingPage;