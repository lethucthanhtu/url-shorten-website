import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { GoogleOAuthProvider } from '@react-oauth/google';

import { UserProvider } from './context/UserContext';

import { ThemeProvider } from './context/ThemeContext';

import './index.css';
import { lazy, Suspense } from 'react';

// Create a new router instance
const router = createRouter({
	routeTree,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

//
const queryClient = new QueryClient();

//
const ReactQueryDevtools = import.meta.env.PROD
	? () => null // Render nothing in production
	: lazy(() =>
			import('@tanstack/react-query-devtools').then((d) => ({
				default: d.ReactQueryDevtools,
			}))
		);

export default function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
					<UserProvider>
						<ThemeProvider defaultTheme='dark'>
							<RouterProvider router={router} />
							<Suspense>
								<ReactQueryDevtools />
							</Suspense>
						</ThemeProvider>
					</UserProvider>
				</GoogleOAuthProvider>
			</QueryClientProvider>
		</>
	);
}
