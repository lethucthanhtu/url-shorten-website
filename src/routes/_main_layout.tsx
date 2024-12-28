import Footer from '@/components/footer';
import Header from '@/components/header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_main_layout')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<div className='flex flex-col justify-between min-h-screen'>
				<Header />
				<div className='flex flex-col justify-center items-center'>
					<Outlet />
				</div>
				<Footer />
			</div>
		</>
	);
}
