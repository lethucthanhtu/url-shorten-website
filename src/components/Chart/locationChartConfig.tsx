import { ChartConfig } from '@/components/ui/chart';

export const locationChartConfig = {

	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--chart-1))',
	},
	mobile: {
		label: 'Mobile',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;
