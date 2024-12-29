import { createContext, useContext } from "react";

export interface AuthContextType {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        twoFactorEnabled: boolean;
        twoFAStatus: "required" | "skip" | "complete" | "setup";
    } | null;
    lastURL: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    setUser: (user: AuthContextType["user"]) => void;

    setLastURL: (url: string) => void;

    register: (firstname: string, lastname: string, email: string, password: string) => Promise<TwoFAClient.AuthResponse>

    login: (email: string, password: string) => Promise<TwoFAClient.AuthResponse>;

    logout: () => Promise<TwoFAClient.AuthResponse>;

    handle2FA: (action: TwoFAClient.TwoFaAction, totp?: string) => Promise<TwoFAClient.AuthResponse>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}