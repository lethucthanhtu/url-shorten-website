import {
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from 'recharts';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type LineChartProps<TData> = {
	className?: string;
	chartConfig: ChartConfig;
	chartData: TData[];
	title?: string;
	description?: string;
	footerTitle?: string;
	footerDescription?: string;
	showTrending?: boolean;
};

export default function LTLineChart<TData>({
	chartConfig,
	chartData,
	className,
	title = 'Click Analytics',
	description = 'Daily click statistics',
	footerTitle = 'Total clicks tracked over time',
	footerDescription = 'Showing daily click statistics for your shortened URL',
	showTrending = true,
}: LineChartProps<TData>) {
	return (
		<Card className={cn('w-full', className)}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className='w-full md:max-h-[250px]'
				>
					<ResponsiveContainer width='100%' height={250}>
						<LineChart
							accessibilityLayer
							data={chartData}
							margin={{ left: 12, right: 12 }}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey='date'
								tickLine={false}
								axisLine={false}
								tickMargin={8}
							/>
							<YAxis hide />
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>
							<Line
								dataKey='clicks'
								type='linear'  // Changed from 'monotone' to 'linear'
								stroke='hsl(var(--chart-2))'
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col items-start gap-2 text-sm'>
				<div className='flex gap-2 font-medium leading-none'>
					{footerTitle} {showTrending && <TrendingUp className='h-4 w-4' />}
				</div>
				<div className='leading-none text-muted-foreground'>
					{footerDescription}
				</div>
			</CardFooter>
		</Card>
	);
}
