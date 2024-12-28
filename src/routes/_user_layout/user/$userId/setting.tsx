import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_user_layout/user/$userId/setting')({
	component: RouteComponent,
});

function RouteComponent() {
	const { userId } = Route.useParams();
	return <div>Hello "/_profile_layout/user/{userId}/setting"!</div>;
}
