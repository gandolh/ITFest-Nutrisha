import React, { createContext, useContext, useState } from "react";

// Define the type for the context value
interface AuthContextType {
	curentUser: User | null;
	setCurentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create a context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider for the context
// Restore the logged-in user from localStorage so a page refresh keeps the
// session (login writes the "authenticatedUser" key).
const loadStoredUser = (): User | null => {
	try {
		const stored = window.localStorage.getItem("authenticatedUser");
		return stored ? (JSON.parse(stored) as User) : null;
	} catch {
		return null;
	}
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [curentUser, setCurentUser] = useState<User | null>(loadStoredUser);

	return (
		<AuthContext.Provider value={{ curentUser, setCurentUser }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to consume the context
const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within a AuthProvider");
	}
	return context;
};

export { AuthProvider, useAuthContext };
