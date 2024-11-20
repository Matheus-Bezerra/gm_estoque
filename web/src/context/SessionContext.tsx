import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface Session {
    username: string;
    email: string;
}

interface SessionContextType {
    session: Session | null;
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    logout: () => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
    children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const storedSession = localStorage.getItem('@gm_estoque/session');
    const storedToken = localStorage.getItem('@gm_estoque/token');

    const initialSession = storedSession ? JSON.parse(storedSession) : null;
    const initialToken = storedToken ? storedToken : null;

    const [session, setSession] = useState<Session | null>(initialSession);
    const [token, setToken] = useState<string | null>(initialToken);

    useEffect(() => {
        if (session && token) {
            localStorage.setItem('@gm_estoque/session', JSON.stringify(session));
            localStorage.setItem('@gm_estoque/token', token);
        } else {
            localStorage.removeItem('@gm_estoque/session');
            localStorage.removeItem('@gm_estoque/token');
        }
    }, [session, token]);

    const logout = () => {
        setSession(null);
        setToken(null);
    };

    return (
        <SessionContext.Provider value={{ session, setSession, token, setToken, logout }}>
            {children}
        </SessionContext.Provider>
    );
};
