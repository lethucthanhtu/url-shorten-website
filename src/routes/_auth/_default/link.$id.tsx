import { engagementChartConfig } from '@/components/Chart/engagementChartConfig';
import LTLineChart from '@/components/Chart/lineChart';
import { locationChartConfig } from '@/components/Chart/locationChartConfig';
import LTPieChart from '@/components/Chart/pieChart';
import EditDialog from '@/components/DataTable/urlEditDialog';
import ShareDialog from '@/components/DataTable/urlShareDialog';
import NotFound from '@/components/notFound';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSession } from '@/contexts/SessionContext';
import { useTheme } from '@/contexts/ThemeContext';
import useFetch from '@/hooks/useFetch';
import { Click, getClicksForURL } from '@/lib/apiClicks';
import { deleteUrl, getLongUrl, Url } from '@/lib/apiUrls';
import { makeURL } from '@/lib/utils';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
	ArrowLeft,
	Calendar,
	Check,
	Copy,
	Download,
	Edit,
	ExternalLink,
	Globe,
	Share,
	Trash,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState, useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import { toPng } from 'html-to-image';

export const Route = createFileRoute('/_auth/_default/link/$id')({
	component: RouteComponent,
	notFoundComponent: NotFound,
	errorComponent: NotFound,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { currentTheme } = useTheme();
	const { user } = useSession();
	const navigate = useNavigate();
	const [copy, setCopy] = useState<boolean>(false);
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
	const [isShareCodeDialogOpen, setIsShareCodeDialogOpen] =
		useState<boolean>(false);
	const qrRef = useRef<HTMLDivElement>(null);

	const {
		loading: loadingURL,
		// error: errorURL,
		data: url,
		fn: fnGetURL,
	} = useFetch<Url>(() => getLongUrl(id));

	const {
		loading: loadingStats,
		// error: errorStats,
		// data: stats,
		fn: fnGetStats,
	} = useFetch<Click[]>(() => getClicksForURL(url?.id || null));

	const {
		loading: loadingDelete,
		// error: deleteError,
		fn: fnDelete,
	} = useFetch<void>(() => deleteUrl(url?.id || null));

	useEffect(() => {
		fnGetURL();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (url && user && url.user_id !== user.id) navigate({ to: '/' });
		if (url && url.custom_url === id)
			navigate({
				to: '/link/$id',
				params: { id: url.shorten_url },
				replace: true,
			});
		else if (url && url.id) fnGetStats();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, user, navigate]);

	const URL = makeURL(url?.custom_url || url?.shorten_url || '');
	const DISPLAY_URL = URL.replace('https://', '')
		.replace('http://', '')
		.replace('www.', '');

	const handleCopy = () => {
		navigator.clipboard.writeText(makeURL(url?.shorten_url || ''));

		setCopy(true);
		setTimeout(() => {
			setCopy(false);
		}, 1500);
	};

	const handleDelete = () => {
		fnDelete(url?.id).then(() => navigate({ to: '/dashboard', replace: true }));
	};

	const handleDownload = () => {
		if (qrRef.current) {
			toPng(qrRef.current)
				.then((dataUrl) => {
					const link = document.createElement('a');
					link.download = 'qr-code.png';
					link.href = dataUrl;
					link.click();
				})
				.catch((err) => {
					console.error('Failed to download QR code', err);
				});
		}
	};

	const pieChartData = [
		{ month: 'January', desktop: 186, mobile: 80 },
		{ month: 'February', desktop: 305, mobile: 200 },
		{ month: 'March', desktop: 237, mobile: 120 },
		{ month: 'April', desktop: 73, mobile: 190 },
		{ month: 'May', desktop: 209, mobile: 130 },
		{ month: 'June', desktop: 214, mobile: 140 },
	];

	const engagementChartData = [
		{ browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
		{ browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
		{ browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
		{ browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
		{ browser: 'other', visitors: 90, fill: 'var(--color-other)' },
	];

	return (
		<>
			<div className='flex flex-col md:mx-12 justify-center items-center gap-8'>
				{loadingURL || loadingStats || loadingDelete ? (
					<>
						<BeatLoader
							color={currentTheme === 'dark' ? 'white' : 'black'}
							className=''
						/>
					</>
				) : (
					<>
						<div className='w-full'>
							<Button
								variant='ghost'
								onClick={() => navigate({ to: '/dashboard' })}
							>
								<ArrowLeft /> Go back to Dashboard
							</Button>
						</div>
						<Card className='w-full'>
							<CardHeader className='w-full'>
								<div className='flex flex-col md:flex-row gap-4 justify-between items-center'>
									<CardTitle className='capitalize text-3xl'>
										{url?.title || 'untitled'}
									</CardTitle>
									<div className='flex gap-2 justify-center items-center'>
										<Button
											variant='default'
											onClick={() => setIsUpdateDialogOpen(true)}
											className='capitalize'
										>
											<Edit className='' />
											<span className='capitalize hidden md:block'>edit</span>
										</Button>
										<Button
											variant='default'
											onClick={handleCopy}
											className='capitalize'
										>
											{copy ? <Check className='' /> : <Copy className='' />}
											<span className='capitalize hidden md:block'>copy</span>
										</Button>
										<Button
											variant='default'
											onClick={() => setIsShareCodeDialogOpen(true)}
											className='capitalize'
										>
											<Share className='' />
											<span className='capitalize hidden md:block'>share</span>
										</Button>
										<Button
											variant='destructive'
											onClick={handleDelete}
											className='capitalize'
										>
											<Trash className='' />
											<span className='capitalize hidden md:block'>remove</span>
										</Button>
									</div>
								</div>
							</CardHeader>
							<CardContent className='h-full mt-4 flex flex-col gap-4'>
								<CardDescription className='md:ml-4 flex md:gap-8 justify-between md:justify-start items-center'>
									<Globe className='h-full scale-[200%] rounded-full hidden md:block' />
									<div className='text-end md:text-start'>
										<h3 className=''>
											<a target='_blank' href={URL} className=''>
												<Button
													variant='link'
													className='text-blue-400 text-lg'
												>
													{DISPLAY_URL}
												</Button>
											</a>
										</h3>
										<h5 className=''>
											<a target='_blank' href={url?.original_url} className=''>
												<Button variant='link' className=''>
													{url?.original_url}
													<ExternalLink className='' />
												</Button>
											</a>
										</h5>
									</div>
								</CardDescription>
								<Separator className='' />
							</CardContent>
							<CardFooter className='flex gap-2 justify-start items-center'>
								<Calendar />{' '}
								{new Date(url?.created_at || '').toLocaleString('en-GB', {
									timeZone: 'UTC',
								})}
							</CardFooter>
						</Card>
						<div className='w-full flex flex-col md:flex-row md:justify-between items-start gap-4'>
							<Card className='md:basis-1/3 w-full h-full md:sticky top-[5.75rem]'>
								<CardHeader className=''>
									<CardTitle className='capitalize text-2xl text-center'>
										QR code
									</CardTitle>
								</CardHeader>
								<CardContent className=''>
									<CardDescription
										ref={qrRef}
										className='aspect-square w-full scale-90 ring-2 ring-black dark:ring-white rounded-xl duration-300 transition hover:scale-100'
									>
										<QRCodeSVG
											value={URL}
											className='size-full aspect-square ring-2 ring-black dark:ring-white rounded-xl'
										/>
									</CardDescription>
								</CardContent>
								<CardFooter className='w-full'>
									<Button
										variant='default'
										className='w-full'
										onClick={handleDownload}
									>
										<Download className='' />
										Download as .PNG
									</Button>
								</CardFooter>
							</Card>
							<Card className='md:basis-2/3 h-full'>
								<CardHeader className=''>
									<CardTitle className='capitalize text-2xl'>
										engagements
									</CardTitle>
								</CardHeader>
								<CardContent className=''>
									<CardDescription className='w-full flex flex-col gap-4'>
										<LTLineChart
											chartConfig={engagementChartConfig}
											chartData={engagementChartData}
											className=''
										/>
										<div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
											<LTPieChart
												chartConfig={locationChartConfig}
												chartData={pieChartData}
												className='md:basis-1/2'
											/>
											<LTPieChart
												chartConfig={locationChartConfig}
												chartData={pieChartData}
												className='md:basis-1/2'
											/>
										</div>
									</CardDescription>
								</CardContent>
								<CardFooter className=''></CardFooter>
							</Card>
						</div>
					</>
				)}
				{url && (
					<>
						<EditDialog
							url={url}
							isOpen={isUpdateDialogOpen}
							onClose={() => setIsUpdateDialogOpen(false)}
							fetchURLs={fnGetURL}
						/>
						<ShareDialog
							url={url}
							isOpen={isShareCodeDialogOpen}
							onClose={() => setIsShareCodeDialogOpen(false)}
						/>
					</>
				)}
			</div>
		</>
	);
}
