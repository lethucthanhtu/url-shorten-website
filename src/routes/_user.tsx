import Header from '@/components/header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_user')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
    <>
_user
			<Header className='' />
			<Outlet />
		</>
	);
}
