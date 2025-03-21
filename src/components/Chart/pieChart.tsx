import { TrendingUp } from 'lucide-react';
import { Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
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
import { cn } from '@/lib/utils';

type PieChartProps<TData> = {
	className?: string;
	chartConfig: ChartConfig;
	chartData: TData[];
};

export default function LTPieChart<TData>({
	chartConfig,
	chartData,
	className,
}: PieChartProps<TData>) {
	return (
		<Card className={cn('flex flex-col', className)}>
			<CardHeader className='items-center pb-0'>
				<CardTitle>Pie Chart - Donut Active</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[250px]'
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey='visitors'
							nameKey='browser'
							innerRadius={60}
							strokeWidth={5}
							activeIndex={0}
							activeShape={({
								outerRadius = 0,
								...props
							}: PieSectorDataItem) => (
								<Sector {...props} outerRadius={outerRadius + 10} />
							)}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className='flex-col gap-2 text-sm'>
				<div className='flex items-center gap-2 font-medium leading-none'>
					Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
				</div>
				<div className='leading-none text-muted-foreground'>
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	);
}
