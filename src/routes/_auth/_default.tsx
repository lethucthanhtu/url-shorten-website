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
				<div className='mx-4 my-4 md:mx-0'>
					<Outlet />
				</div>
				<Footer className='' />
			</main>
		</>
	);
}
