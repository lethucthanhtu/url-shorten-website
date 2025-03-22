import { Outlet, createRootRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import NotFound from '@/components/notFound';
import { Toaster } from '@/components/ui/sonner';
import { Theme } from '@/contexts/ThemeContext';

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: NotFound,
});

const TanStackRouterDevtools = import.meta.env.PROD
	? () => null // Render nothing in production
	: lazy(() =>
			// Lazy load in development
			import('@tanstack/router-devtools').then((res) => ({
				default: res.TanStackRouterDevtools,
				// For Embedded Mode
				// default: res.TanStackRouterDevtoolsPanel
			}))
		);

function RootComponent() {
	const root = window.document.documentElement;
	const currentTheme = root.classList[1] as Theme;

	// // Inspect prevent handler
	// useEffect(() => {
	// 	if (import.meta.env.PROD) handleInspect();
	// }, []);

	return (
		<>
			<Outlet />
			<Toaster
				className=''
				duration={3000}
				theme={currentTheme === 'dark' ? 'light' : 'dark'}
			/>
			<Suspense>
				<TanStackRouterDevtools />
			</Suspense>
		</>
	);
}
