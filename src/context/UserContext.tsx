import { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/User';

type UserContextState = {
	user: User | undefined;
	setUser: (user: User | undefined) => void;
	handleLogout: () => void;
};

export const UserContext = createContext<UserContextState | undefined>(
	undefined
);

type UserProviderProps = {
	children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = useState<User | undefined>();

	useEffect(() => {
		const savedUser = localStorage.getItem('user');
		if (savedUser) setUser(JSON.parse(savedUser)); // Restore user on page load
	}, []);

	const handleLogout = () => {
		setUser(undefined);
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	};

	return (
		<UserContext.Provider value={{ user, setUser, handleLogout }}>
			{children}
		</UserContext.Provider>
	);
}
