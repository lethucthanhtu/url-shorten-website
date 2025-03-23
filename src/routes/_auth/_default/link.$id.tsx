import LTLineChart from '@/components/Chart/lineChart';
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
import { cn, makeURL } from '@/lib/utils';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
	ArrowLeft,
	Calendar,
	Check,
	Clock,
	Copy,
	Download,
	Edit,
	ExternalLink,
	Globe,
	MousePointerClick,
	Share,
	Trash,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState, useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import { toPng } from 'html-to-image';
import CountUp from 'react-countup';
import { Badge } from '@/components/ui/badge';
import { ChartConfig } from '@/components/ui/chart';
import LTPieChart from '@/components/Chart/pieChart';
import ActiveBadge from '@/components/activeBadge';

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
	const [qrShow, setQrShow] = useState<boolean>(true);

	const {
		loading: loadingURL,
		// error: errorURL,
		data: url,
		fn: fnGetURL,
	} = useFetch<Url>(() => getLongUrl(id));

	const {
		loading: loadingStats,
		// error: errorStats,
		data: stats,
		fn: fnGetStats,
	} = useFetch<Click[]>(() => getClicksForURL(url?.id || null));

	const {
		loading: loadingDelete,
		// error: deleteError,
		fn: fnDelete,
	} = useFetch<void>(() => deleteUrl(url?.id || null));

	useEffect(() => {
		fnGetURL().then((res) => {
			if (!res || res.user_id !== user?.id)
				navigate({ to: '/', replace: true });
			else if (res.custom_url === id)
				navigate({
					to: '/link/$id',
					params: { id: res.shorten_url },
					replace: true,
				});
			// else fnGetStats();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, navigate, user?.id]);

	useEffect(() => {
		if (url && url.id) fnGetStats();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

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

	const aggregateDeviceData = (stats: Click[] | undefined) => {
		if (!stats) return {};

		return stats.reduce(
			(acc, click) => {
				const device = click.device || 'Unknown';
				acc[device] = (acc[device] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>
		);
	};

	const aggregateClickData = (stats: Click[] | undefined) => {
		if (!stats) return [];

		const clicksByDate = stats.reduce(
			(acc, click) => {
				const date = new Date(click.created_at).toLocaleDateString('en-GB');

				const existingEntry = acc.find((entry) => entry.date === date);
				if (existingEntry) {
					existingEntry.numberOfClicks++;
				} else {
					acc.push({ date, numberOfClicks: 1 });
				}
				return acc;
			},
			[] as { date: string; numberOfClicks: number }[]
		);

		return clicksByDate.sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
		);
	};

	const [timeRange, setTimeRange] = useState('7d');

	const filterDataByTimeRange = (data: { date: string; clicks: number }[]) => {
		const now = new Date();
		const ranges = {
			'7d': 7,
			'90d': 90,
			'1y': 365,
			all: Infinity,
		};

		return data.filter((item) => {
			const itemDate = new Date(item.date.split('/').reverse().join('-'));
			const diffDays = Math.ceil(
				(now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24)
			);
			return diffDays <= ranges[timeRange as keyof typeof ranges];
		});
	};

	const chartClicksData = filterDataByTimeRange(
		aggregateClickData(stats).map((item) => ({
			date: item.date,
			clicks: item.numberOfClicks,
		}))
	);

	const deviceStats = aggregateDeviceData(stats);

	const chartDevicesData = Object.entries(deviceStats).map(
		([device, count]) => ({
			name: device,
			value: count,
			fill: `hsl(var(--chart-${Math.floor(Math.random() * 5 + 1)}))`,
		})
	);

	const chartDevicesConfig = {
		value: {
			label: 'Clicks',
		},
		...Object.fromEntries(
			Object.keys(deviceStats).map((device) => [
				device,
				{
					label: device,
					color: `hsl(var(--chart-${Math.floor(Math.random() * 5 + 1)}))`,
				},
			])
		),
	} satisfies ChartConfig;

	const chartClicksConfig = {
		clicks: {
			label: 'Clicks',
			color: 'hsl(var(--chart-2))',
		},
	} satisfies ChartConfig;

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
									<CardTitle className='capitalize flex gap-4 justify-center'>
										<span className='text-3xl'>{url?.title || 'untitled'}</span>
										<ActiveBadge active={url?.active} className='my-2' iconShown/>
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
									<div className='text-start w-full'>
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
													<span className='hidden md:block'>
														{url?.original_url && url?.original_url.length > 100
															? `${url?.original_url.slice(0, 100 - 3)}...`
															: url?.original_url}
													</span>
													<span className='md:hidden'>
														{url?.original_url && url?.original_url.length > 40
															? `${url?.original_url.slice(0, 40 - 3)}...`
															: url?.original_url}
													</span>
													<ExternalLink className='' />
												</Button>
											</a>
										</h5>
									</div>
								</CardDescription>
								<Separator className='' />
							</CardContent>
							<CardFooter className='flex gap-4 justify-start items-center'>
								<span className='flex gap-2 justify-center items-center'>
									<Calendar />
									<Badge variant='outline'>
										{new Date(url?.created_at || '').toLocaleString('en-GB', {
											timeZone: 'Asia/Ho_Chi_Minh',
										})}
									</Badge>
								</span>
								<span className='flex gap-2 justify-center items-center'>
									<Clock />
									<Badge variant='outline'>
										{new Date(url?.updated_at || '').toLocaleString('en-GB', {
											timeZone: 'Asia/Ho_Chi_Minh',
										})}
									</Badge>
								</span>
							</CardFooter>
						</Card>
						<div className='w-full flex flex-col md:flex-row md:justify-between items-start gap-4'>
							<Card className='md:basis-1/3 w-full h-full md:sticky top-[5.75rem]'>
								<CardHeader className=''>
									<CardTitle className='capitalize text-2xl text-center'>
										QR code
									</CardTitle>
								</CardHeader>
								<CardContent
									onClick={() => setQrShow(!qrShow)}
									className='relative'
								>
									<CardDescription
										ref={qrRef}
										className={cn(
											'aspect-square w-full scale-90 ring-2 ring-black dark:ring-white rounded-xl duration-300 transition ',
											qrShow ? 'blur-xl' : 'blur-none hover:scale-100'
										)}
									>
										<QRCodeSVG
											value={URL}
											className='size-full aspect-square ring-2 ring-black dark:ring-white rounded-xl'
										/>
									</CardDescription>
									<Badge
										variant={'default'}
										className={cn(
											'flex gap-2 absolute scale-150 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50',
											qrShow ? '' : 'hidden'
										)}
									>
										<MousePointerClick className='' /> Click to reveal
									</Badge>
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
							<Card className='md:basis-2/3 w-full h-full'>
								<CardHeader className=''>
									<CardTitle className='flex justify-between items-start'>
										<span className='capitalize text-2xl'>engagements</span>
										<CountUp
											end={stats?.length || 0}
											className='capitalize text-4xl'
										/>
									</CardTitle>
									<div className='flex gap-2 !mt-4 justify-end'>
										<Button
											variant={timeRange === '7d' ? 'default' : 'outline'}
											onClick={() => setTimeRange('7d')}
											size='sm'
										>
											7 days
										</Button>
										<Button
											variant={timeRange === '90d' ? 'default' : 'outline'}
											onClick={() => setTimeRange('90d')}
											size='sm'
										>
											90 days
										</Button>
										<Button
											variant={timeRange === '1y' ? 'default' : 'outline'}
											onClick={() => setTimeRange('1y')}
											size='sm'
										>
											1 year
										</Button>
										<Button
											variant={timeRange === 'all' ? 'default' : 'outline'}
											onClick={() => setTimeRange('all')}
											size='sm'
										>
											All time
										</Button>
									</div>
								</CardHeader>
								<CardContent className='w-full'>
									<CardDescription className='w-full flex flex-col gap-4'>
										<LTLineChart
											chartConfig={chartClicksConfig}
											chartData={chartClicksData}
											title='Click Analytics'
											description='Daily click statistics'
											footerTitle='Total clicks tracked over time'
											footerDescription='Showing daily click statistics for your shortened URL'
										/>

										<div className='flex flex-col md:flex-row gap-4 justify-center items-center w-full'>
											<LTPieChart
												chartConfig={chartDevicesConfig}
												chartData={chartDevicesData}
												className='md:basis-1/2 w-full'
												title='Device Distribution'
												description='Click statistics by device type'
												footerTitle={`Total Devices: ${chartDevicesData.length}`}
												footerDescription='Distribution of devices accessing your link'
											/>
											<div className='relative md:basis-1/2 w-full'>
												<LTPieChart
													chartConfig={chartDevicesConfig}
													chartData={[]}
													className='md:basis-1/2 w-full blur-sm'
													title='Location Distribution'
													description='Click statistics by location'
													footerTitle={`Total Devices: ${chartDevicesData.length}`}
													footerDescription='Distribution of location accessing your link'
												/>
												<Badge className='scale-150 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 capitalize'>
													coming soon
												</Badge>
											</div>
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
