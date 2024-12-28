import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_main_layout/')({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	navigate({ to: '/home' });
}
