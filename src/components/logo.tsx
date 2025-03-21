import { Link, LinkComponentProps } from '@tanstack/react-router';

import logo from '@/assets/svg/logo.svg';
import { cn } from '@/lib/utils';

type LogoProps = {} & Omit<LinkComponentProps, 'to'>;

export default function Logo({ ...props }: LogoProps) {
	return (
		<>
			<Link to='/' className={cn('aspect-square', props.className)}>
				<img
					src={logo}
					alt='LeTu Logo'
					className={cn('aspect-square bg-white', props.className)}
				/>
			</Link>
		</>
	);
}
