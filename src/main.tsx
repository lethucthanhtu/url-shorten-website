import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/index.css';

// Vercel
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from '@/routeTree.gen';

// Theme
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SessionProvider } from '@/contexts/SessionContext';

import { HelmetProvider } from 'react-helmet-async';

// Create a new router instance
const router = createRouter({
	routeTree,
	scrollRestoration: true,
	scrollRestorationBehavior: 'smooth',
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML)
	createRoot(rootElement).render(
		<StrictMode>
			<SessionProvider>
				<HelmetProvider>
					<ThemeProvider defaultTheme='light'>
						<RouterProvider router={router} />
						<Analytics />
						<SpeedInsights />
					</ThemeProvider>
				</HelmetProvider>
			</SessionProvider>
		</StrictMode>
	);
