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
	title,
	description,
	footerTitle,
	footerDescription,
	showTrending = true,
}: LineChartProps<TData>) {
	return (
		<Card className={cn('w-full', className)}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				{chartData.length > 0 ? (
					<>
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
										type='linear' // Changed from 'monotone' to 'linear'
										stroke='hsl(var(--chart-2))'
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</ResponsiveContainer>
						</ChartContainer>
					</>
				) : (
					<>
						<div className='flex flex-col items-center justify-center p-8 text-center'>
							<p className='text-muted-foreground text-lg'>
								No click data available for this time period
							</p>
							<p className='text-sm text-muted-foreground'>
								Try selecting a different time range or check back later
							</p>
						</div>
					</>
				)}
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
