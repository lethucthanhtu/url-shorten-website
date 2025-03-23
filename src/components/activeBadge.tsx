import { Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Url } from '@/lib/apiUrls';

type ActiveBadeProps = {
	iconShown?: boolean;
	active: Url['active'] | undefined;
	className?: string;
};

export default function ActiveBadge({
	iconShown = false,
	active,
	className,
}: ActiveBadeProps) {
	return (
		<Badge
			variant='default'
			className={cn(
				'ml-2 font-mono capitalize flex items-center justify-center gap-2 animate-pulse',
				active === undefined
					? 'bg-gray-500'
					: active
						? 'bg-green-500'
						: 'bg-red-500 ',
				className
			)}
		>
			{iconShown && <Activity className='size-4' />}
			{active === null ? 'unknown' : active ? 'active' : 'inactive'}
		</Badge>
	);
}
