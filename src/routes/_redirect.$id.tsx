import Logo from '@/components/logo';
import NotFound from '@/components/notFound';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import useFetch from '@/hooks/useFetch';
import { storeClicks } from '@/lib/apiClicks';
import { getRedirectUrl } from '@/lib/apiUrls';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

export const Route = createFileRoute('/_redirect/$id')({
	component: RouteComponent,
	notFoundComponent: NotFound,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { currentTheme } = useTheme();
	const { loading, error, data, fn } = useFetch(() => getRedirectUrl(id));

	const {
		// loading: loadingStats,
		fn: fnStats,
	} = useFetch(() =>
		storeClicks({
			url_id: data?.id ?? null,
			original_url: data?.original_url ?? '',
		})
	);

	useEffect(() => {
		fn();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!loading && data && !error) {
			fnStats().finally(() => {
				if (!data.nsfw) window.location.assign(data.original_url);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, data, error]);

	const original_url =
		data?.original_url.replace('https://', '').replace('http://', '') || '';
	const displayLength = 50;
	const displayURL =
		original_url?.length > displayLength
			? `${original_url?.substring(0, displayLength - 3)}...`
			: original_url;

	return (
		<>
			<article className='min-h-screen flex flex-col md:flex-row justify-center items-center gap-16'>
				<Logo className='!rounded-2xl size-72 duration-300 transition hover:scale-110' />
				<div className='space-y-3 flex flex-col gap-4'>
					{!error ? (
						<>
							<h1 className='text-4xl text-center font-bold capitalize tracking-tighter sm:text-5xl transition-transform hover:scale-110 flex gap-2 justify-center items-end'>
								navigating
								<BeatLoader
									className=''
									color={currentTheme === 'dark' ? 'white' : 'black'}
								/>
							</h1>
							{displayURL && (
								<p className='text-gray-500 text-center'>
									Next stop
									<Badge className='ml-2'>{displayURL}</Badge>
								</p>
							)}
							{data?.nsfw && (
								<>
									<Button
										className=''
										onClick={() => window.location.assign(data.original_url)}
									>
										Proceed
									</Button>
								</>
							)}
						</>
					) : (
						<>
							<h1 className='text-center tracking-tighter sm:text-5xl transition-transform hover:scale-110 '>
								<Badge
									className='text-4xl text-center font-bold capitalize'
									variant='destructive'
								>
									failed!
								</Badge>
							</h1>
							<p className='text-gray-500 text-center'>
								Look like this URL currently unavailable.
							</p>
						</>
					)}
				</div>
			</article>
		</>
	);
}
