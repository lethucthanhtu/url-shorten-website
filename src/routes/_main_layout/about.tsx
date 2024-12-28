import { user } from '@/store/userStore';
import { createFileRoute } from '@tanstack/react-router';
import { useStore } from '@tanstack/react-store';

export const Route = createFileRoute('/_main_layout/about')({
	component: RouteComponent,
});

function RouteComponent() {
	const userStore = useStore(user, (state) => state);

	return (
		<>
			<div>Hello "/_main_layout/about"!</div>
			{JSON.stringify(userStore)}
		</>
	);
}
