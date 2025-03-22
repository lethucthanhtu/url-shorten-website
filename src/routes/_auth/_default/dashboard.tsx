import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useSession } from '@/contexts/SessionContext';
import { getURLs, Url } from '@/lib/apiUrls';
import { getClicksForURLs, Click } from '@/lib/apiClicks';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import useFetch from '@/hooks/useFetch';
import CreateLinkButton from '@/components/createLinkButton';
import BeatLoader from 'react-spinners/BeatLoader';
import DataTable from '@/components/DataTable/dataTable';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'lucide-react';
import {
	get_md_URLColumns,
	get_sm_URLColumns,
} from '@/components/DataTable/urlColumns';

export const Route = createFileRoute('/_auth/_default/dashboard')({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useSession();
	const { currentTheme } = useTheme();

	const {
		loading,
		// error,
		data: urls,
		fn: fnUrls,
	} = useFetch<Url[]>(() => getURLs(user?.id));

	const {
		loading: loadingClicks,
		data: clicks,
		fn: fnClicks,
	} = useFetch<Click[]>(() =>
		getClicksForURLs(urls?.map((url) => url.id) ?? [])
	);

	useEffect(() => {
		fnUrls();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (urls?.length) fnClicks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [urls?.length]);

	const largeScreenColumns = useMemo(() => get_md_URLColumns(fnUrls), [fnUrls]);
	const smallScreenColumns = useMemo(() => get_sm_URLColumns(fnUrls), [fnUrls]);

	return (
		<>
			{loading || loadingClicks ? (
				<>
					<div className='size-full flex justify-center items-center'>
						<BeatLoader
							className=''
							color={currentTheme === 'dark' ? 'white' : 'black'}
						/>
					</div>
				</>
			) : (
				<>
					<div className='flex flex-col md:mx-12 justify-center items-center gap-8'>
						<div className='flex flex-col md:flex-row justify-center items-center gap-4 w-full'>
							<Card className='w-full md:basis-1/2'>
								<CardHeader className=''>
									<CardTitle className='capitalize'>links created</CardTitle>
								</CardHeader>
								<CardContent className=''>
									<span>{urls?.length}</span>
								</CardContent>
							</Card>
							<Card className='w-full md:basis-1/2'>
								<CardHeader className=''>
									<CardTitle className='capitalize'>total clicks</CardTitle>
								</CardHeader>
								<CardContent className=''>
									<span>{clicks?.length}</span>
								</CardContent>
							</Card>
						</div>
						<div className='w-full flex justify-center items-center'>
							<Card className='w-full'>
								<CardHeader className=''>
									<div className='w-full flex justify-between'>
										<h1 className='capitalize text-4xl font-extrabold md:inline-flex justify-center items-center gap-2 hidden'>
											My links
											<Link className='size-6' />
										</h1>
										<CreateLinkButton />
									</div>
								</CardHeader>
								<CardContent>
									{urls && (
										<>
											<div className='hidden md:block'>
												<DataTable
													data={urls}
													columns={largeScreenColumns}
													footerHidden
												/>
											</div>
											<div className='md:hidden'>
												<DataTable
													data={urls}
													columns={smallScreenColumns}
													footerHidden
												/>
											</div>
										</>
									)}
								</CardContent>
								<CardFooter className=''></CardFooter>
							</Card>
						</div>
					</div>
				</>
			)}
		</>
	);
}
