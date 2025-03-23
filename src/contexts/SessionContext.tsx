/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import supabase from '@/lib/supabase';
import {
	Session,
	SignInWithOAuthCredentials,
	User,
} from '@supabase/supabase-js';
import { toast } from 'sonner';

type SessionContextType = {
	session: Session | null;
	user: User | null;
	signOut: () => Promise<void>;
	signIn: (credentials: SignInWithOAuthCredentials) => Promise<void>;
	googleSignIn: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
		};

		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			if (session) fetchUser();
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			if (session) fetchUser();
			else setUser(null);
		});

		return () => subscription.unsubscribe();
	}, []);

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error)
			toast('Error signing out', {
				description: error.message,
				action: { label: 'Close', onClick: () => {} },
			});
		else
			toast('Signed out', {
				description: 'You have successfully signed out',
				action: { label: 'Close', onClick: () => {} },
			});

		setSession(null);
		setUser(null);
	};

	const signIn = async (credentials: SignInWithOAuthCredentials) => {
		const { error } = await supabase.auth.signInWithOAuth({
			...credentials,
		});
		if (error)
			toast(`Error signing in with ${credentials.provider.toUpperCase()}`, {
				description: error.message,
				action: {
					label: 'Login',
					onClick: () => signIn(credentials),
				},
			});
	};

	const googleSignIn = async () =>
		signIn({
			provider: 'google',
			options: {
				redirectTo: window.location.origin,
			},
		});

	return (
		<SessionContext.Provider
			value={{ session, user, signOut, signIn, googleSignIn }}
		>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = () => {
	const context = useContext(SessionContext);
	if (context === undefined)
		throw new Error('useSession must be used within a SessionProvider');

	return context;
};
