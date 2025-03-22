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
	title?: string;
	description?: string;
	footerTitle?: string;
	footerDescription?: string;
	showTrending?: boolean;
};

export default function LTPieChart<TData>({
	chartConfig,
	chartData,
	className,
	title,
	description,
	footerTitle,
	footerDescription,
	showTrending = true,
}: PieChartProps<TData>) {
	return (
		<Card className={cn('flex flex-col', className)}>
			<CardHeader className='items-center pb-0'>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				{chartData.length > 0 ? (
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
								dataKey='value' // Changed from 'visitors'
								nameKey='name' // Changed from 'browser'
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
				) : (
					<>
						<div className='h-[250px] flex justify-center items-center'>
							<span className='text-center'>No device data available</span>
						</div>
					</>
				)}
			</CardContent>
			<CardFooter className='flex-col gap-2 text-sm'>
				<div className='flex items-center gap-2 font-medium leading-none'>
					{footerTitle} {showTrending && <TrendingUp className='h-4 w-4' />}
				</div>
				<div className='leading-none text-muted-foreground'>
					{footerDescription}
				</div>
			</CardFooter>
		</Card>
	);
}
