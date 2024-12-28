import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Error404 } from './_main_layout/404';
import { lazy, Suspense } from 'react';

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: Error404,
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
	return (
		<>
			<div className='px-8 md:mx-auto'>
				<Outlet />
				<Suspense>
					<TanStackRouterDevtools />
				</Suspense>
			</div>
		</>
	);
}
