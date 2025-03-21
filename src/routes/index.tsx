import BounceText from '@/components/bonceText';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from '@/contexts/SessionContext';
import useFetch from '@/hooks/useFetch';
import { createUrl } from '@/lib/apiUrls';
import {
	createFileRoute,
	useNavigate,
	useSearch,
} from '@tanstack/react-router';
import { useState, FormEvent, useEffect } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	const search: { url: string } = useSearch({ from: '__root__' });

	const [longUrl, setLongUrl] = useState<string>(search.url);

	const { user, session } = useSession();

	const navigate = useNavigate();

	const {
		// loading,
		// error: createError,
		// data: createData,
		fn: fnCreate,
	} = useFetch(() =>
		createUrl({
			title: '',
			custom_url: null,
			original_url: longUrl,
			user_id: user?.id || null,
		})
	);

	const handleShorten = (e: FormEvent) => {
		e.preventDefault();

		if (!session) {
			toast('Session not found', {
				description: 'Please login to use this feature',
				action: { label: 'Close', onClick: () => {} },
			});
			return;
		}

		if (longUrl)
			fnCreate().then((res) =>
				navigate({
					to: '/link/$id',
					params: { id: res?.shorten_url + '' },
				})
			);
		else
			toast('Missing data', {
				description: 'Please enter the URL',
				action: { label: 'Close', onClick: () => {} },
			});
	};

	useEffect(() => {
		if (search.url && session)
			navigate({ to: '/dashboard', search: { url: search.url } });
		// navigate({ to: '/link/$id', params: { id: '' } });
	}, [search.url, navigate, session]);

	return (
		<>
			<div className='min-h-screen flex flex-col justify-between'>
				<Header className='' />
				<div className='flex flex-col h-[90vh] md:h-full justify-start items-center gap-8 md:gap-16 mx-4'>
					<span className='flex flex-col gap-4 md:gap-8'>
						<h1 className='text-3xl md:text-6xl font-bold text-center flex gap-4'>
							Shorten Your
							<span className='flex text-nowrap'>
								L
								<BounceText
									text='oooo'
									className='text-3xl md:text-6xl font-bold text-center'
								/>
								ng
							</span>
							Links {':)'}
						</h1>

						<h4 className='text-center'>
							<Badge
								variant='destructive'
								className='py-0.5 text-center text-md'
							>
								<span className=''>LETUrl</span>
								<span className='ml-2'>(LeTu URL)</span>
							</Badge>{' '}
							<span className=''>
								is an efficient and easy-to-use URL shortening service that
								streamlines your online experience.
							</span>
						</h4>
					</span>

					<form
						onSubmit={handleShorten}
						className='w-full flex flex-col md:flex-row justify-center items-center gap-2	'
					>
						<Input
							type='url'
							placeholder='Paste your URL here'
							value={longUrl}
							onChange={(e) => setLongUrl(e.target.value)}
							className='w-5/6 md:w-5/12'
						/>
						<Button
							type='submit'
							className='capitalize hover:scale-150 transition w-1/4 md:w-auto'
						>
							shorten
						</Button>
					</form>
				</div>
				<Footer className='' />
			</div>
		</>
	);
}
