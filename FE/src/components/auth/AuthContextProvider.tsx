'use client'
import React from 'react';
type AuthContextType = {
    selectedDate? : Date;
    setSelectedDate? : React.Dispatch<React.SetStateAction<Date>>;
    displayedDate? : Date;
    setDisplayedDate? : React.Dispatch<React.SetStateAction<Date>>;
    events? : Event[];
    setEvents? : React.Dispatch<React.SetStateAction<Event[]>>;
}

type AuthContextProps = {
    initialValue?: User | null;
    children?: React.ReactNode;
}

export const AuthContext = React.createContext({
    currentUser: null as User | null,
    setCurrentUser: false,
} as AuthContextType);


const AuthContextProvider = ({ children}: AuthContextProps) => {
    const [currentUser, setCurrentUser] = React.useState<User | null>(null)
    const providerValues = {
        currentUser,
        setCurrentUser,
    }

    return (
        <AuthContext.Provider value={providerValues} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;