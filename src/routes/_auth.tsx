import { useSession } from '@/contexts/SessionContext';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_auth')({
	component: RouteComponent,
});

function RouteComponent() {
	const { session } = useSession();

	const navigate = useNavigate();

	useEffect(() => {
		if (!session) {
			navigate({ to: '/', replace: true });
			toast('Permission not found!', {
				description: "Please make sure you're allow to use this feature.",
				action: { label: 'Close', onClick: () => {} },
				// duration: 2000,
			});
		}
	}, [navigate, session]);

	return (
		<>
			<Outlet />
		</>
	);
}
