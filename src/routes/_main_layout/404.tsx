import Logo from '@/components/logo';
import { ModeToggle } from '@/components/modeToggle';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_main_layout/404')({
	component: Error404,
});

export function Error404() {
	return (
		<>
			<div className='absolute top-4 left-4'>
				<Logo border className='size-8' />
			</div>
			<div className='absolute top-4 right-4'>
				<ModeToggle />
			</div>
			<div className='flex items-center min-h-screen w-screen overflow-hidden px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16'>
				<div className='w-full space-y-6 text-center'>
					<div className='space-y-3'>
						<h1 className='text-4xl font-bold tracking-tighter sm:text-5xl transition-transform hover:scale-110'>
							404
						</h1>
						<p className='text-gray-500'>
							Looks like you've ventured into the unknown digital realm.
						</p>
					</div>
					<Link
						to='/home'
						className='inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
					>
						Return to website
					</Link>
				</div>
			</div>
		</>
	);
}
