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
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import useFetch from '@/hooks/useFetch';
import CreateLinkButton from '@/components/createLinkButton';
import BeatLoader from 'react-spinners/BeatLoader';
import DataTable from '@/components/DataTable/dataTable';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, Asterisk, Link } from 'lucide-react';
import { getURLColumns } from '@/components/DataTable/urlColumns';
import CountUp from 'react-countup';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_auth/_default/dashboard')({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
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

	const largeScreenColumns = useMemo(() => getURLColumns(fnUrls), [fnUrls]);

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
						<div className='w-full'>
							<Button variant='ghost' onClick={() => navigate({ to: '/' })}>
								<ArrowLeft /> Go back to home
							</Button>
						</div>
						<div className='flex justify-center items-center gap-4 w-full'>
							<Card className='w-full basis-1/2'>
								<CardHeader className=''>
									<CardTitle className='capitalize'>links created</CardTitle>
								</CardHeader>
								<CardContent className='flex justify-end items-center'>
									<CountUp
										end={urls?.length || 0}
										className='text-3xl font-mono'
									/>
								</CardContent>
								{/* <CardFooter className=''></CardFooter> */}
							</Card>
							<Card className='w-full basis-1/2'>
								<CardHeader className=''>
									<CardTitle className='capitalize'>total clicks</CardTitle>
								</CardHeader>
								<CardContent className='flex justify-end items-center'>
									<CountUp
										end={clicks?.length || 0}
										className='text-3xl font-mono'
									/>
								</CardContent>
								{/* <CardFooter className=''></CardFooter> */}
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
													initialState={{
														columnVisibility: {
															updated_at: false,
														},
														sorting: [
															{
																id: 'updated_at',
																desc: true,
															},
														],
													}}
												/>
											</div>
											<div className='md:hidden'>
												<DataTable
													data={urls}
													columns={largeScreenColumns}
													footerHidden
													initialState={{
														columnVisibility: {
															select: false,
															updated_at: false,
															original_url: false,
															custom_url: false,
															created_at: false,
															active: false,
														},
														sorting: [
															{
																id: 'updated_at',
																desc: true,
															},
														],
													}}
												/>
											</div>
										</>
									)}
								</CardContent>
								<CardFooter className=''>
									<Badge variant={'secondary'} className='hidden md:flex'>
										<Asterisk className='text-red-500' />
										Note: Hold Ctrl to sort by multiple columns.
									</Badge>
								</CardFooter>
							</Card>
						</div>
					</div>
				</>
			)}
		</>
	);
}
