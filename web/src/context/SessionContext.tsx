import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface Session {
    name: string;
    email: string;
}

interface SessionContextType {
    session: Session | null;
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    logout: () => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
    children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const storedSession = localStorage.getItem('session');
    const initialSession = storedSession ? JSON.parse(storedSession) : null;

    const [session, setSession] = useState<Session | null>(initialSession);

    useEffect(() => {
        if (session) {
            localStorage.setItem('session', JSON.stringify(session));
        } else {
            localStorage.removeItem('session');
        }
    }, [session]);

    const logout = () => {
        setSession(null);
    };

    return (
        <SessionContext.Provider value={{ session, setSession, logout }}>
            {children}
        </SessionContext.Provider>
    );
};
