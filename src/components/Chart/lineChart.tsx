import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
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
import { GitCommitVertical, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type LineChartProps<TData> = {
	className?: string;
	chartConfig: ChartConfig;
	chartData: TData[];
};

export default function LTLineChart<TData>({
	chartConfig,
	chartData,
	className,
}: LineChartProps<TData>) {
	return (
		<Card className={cn('w-full', className)}>
			<CardHeader>
				<CardTitle>Line Chart - Custom Dots</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className='w-full md:max-h-[250px]'
				>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Line
							dataKey='desktop'
							type='natural'
							stroke='var(--color-desktop)'
							strokeWidth={2}
							dot={({ cx, cy, payload }) => {
								const r = 24;
								return (
									<GitCommitVertical
										key={payload.month}
										x={cx - r / 2}
										y={cy - r / 2}
										width={r}
										height={r}
										fill='hsl(var(--background))'
										stroke='var(--color-desktop)'
									/>
								);
							}}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col items-start gap-2 text-sm'>
				<div className='flex gap-2 font-medium leading-none'>
					Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
				</div>
				<div className='leading-none text-muted-foreground'>
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	);
}
