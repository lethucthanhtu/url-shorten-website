import Footer from '@/components/footer';
import Header from '@/components/header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/_default')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<main className='min-h-screen flex flex-col justify-between'>
				<Header className='' />
				<Outlet />
				<Footer className='' />
			</main>
		</>
	);
}
