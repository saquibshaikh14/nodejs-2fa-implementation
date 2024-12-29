import { useEffect, useState } from "react";
import { getUserLoginStatus, handleUser2FA, loginUser, logoutUser, registerUser } from "../../api";
import { AuthContext, AuthContextType } from ".";
import { extendedToast as toast } from '../../utils/toast';


interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<AuthContextType["user"] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [lastURL, setLastURL] = useState<string>("/");


    // Check for existing session on component mount
    useEffect(() => {
        async function getLoginStatus() {
            const response = await getUserLoginStatus();
            if (response.status === 'success') {
                setUser((response.data as { user: AuthContextType["user"] }).user);
            } else if (response.status === 'error' && response.error?.type === 'AuthenticationError') {
                //do nothing
            } else {
                toast.error(response.message, { id: '2fa-error' });
            }
            setIsLoading(false);
        }
        getLoginStatus();
    }, []);

    const register = async (firstname: string, lastname: string, email: string, password: string): Promise<TwoFAClient.AuthResponse> => {
        const response = await registerUser(firstname, lastname, email, password);
        if (response.status === 'success') {
            setUser((response.data as { user: AuthContextType["user"] }).user);
            return { status: response.status, message: response.message };
        }
        // Handle error
        if (user) {
            setUser(null);
        }
        return { status: response.status, message: response.message, error: response.error! };

    }

    const login = async (email: string, password: string): Promise<TwoFAClient.AuthResponse> => {
        // Implement login functionality here
        const response = await loginUser(email, password);
        if (response.status === 'success') {
            setUser((response.data as { user: AuthContextType["user"] }).user);
            return { status: response.status, message: response.message };
        }
        // Handle error
        if (user) {
            setUser(null);
        }
        return { status: response.status, message: response.message, error: response.error! };

    }

    const logout = async (): Promise<TwoFAClient.AuthResponse> => {
        // Implement logout functionality here
        const response = await logoutUser();
        if (response.status === 'success') {
            setUser(null);
        } else {
            // Handle error
            setError(response.message);
        }
        return { status: response.status, message: response.message, error: response.error! };
    }

    const handle2FA = async (action: "skip" | "enable" | "verify", totp?: string): Promise<TwoFAClient.AuthResponse> => {
        // Implement 2FA handling here
        const response = await handleUser2FA(action, totp);
        if (response.status === 'success') {
            if ((response.data as { user: AuthContextType["user"] }).user) {
                setUser((response.data as { user: AuthContextType["user"] }).user);
                return { status: response.status, message: response.message };
            }
            if ((response.data as { twoFAStatus: 'skip' }).twoFAStatus === 'skip') {
                setUser({ ...user!, twoFAStatus: 'skip' });
                return { status: response.status, message: response.message };
            }
            if ((response.data as { twoFAStatus: 'setup' }).twoFAStatus === 'setup') {
                setUser({ ...user!, twoFAStatus: 'setup' });
                return { status: response.status, message: response.message, data: response.data! };
            }
        }
        if (response?.meta.redirect === 'login') {
            //redirect to login page, if session expired or not loggedIn
            location.href = "/login";
        }
        //handle error
        return { status: response.status, message: response.message, error: response.error! };

    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            register,
            login,
            logout,
            handle2FA,
            isAuthenticated: !!user,
            isLoading,
            error,
            setLastURL,
            lastURL
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;