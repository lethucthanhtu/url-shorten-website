import TulttLogo from '@/assets/svg/TuLTTlogo.svg';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

import { ImgHTMLAttributes } from 'react';

type LogoProps = {
	showText?: boolean;
	border?: boolean;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export default function Logo({
	showText = false,
	border = false,
	...props
}: LogoProps) {
	return (
		<>
			<div
				className={cn(
					'flex justify-between items-center gap-2',
					border ? 'border border-black dark:border-white p-[2.5%]' : ''
				)}
			>
				<Link
					to='/'
					className={cn(
						'flex justify-center items-center gap-2 rounded',
						props.className
					)}
				>
					<img {...props} className={cn('dark:invert')} src={TulttLogo} />
					<span className='sr-only'>TuLTT</span>
				</Link>
				{showText && <h1 className='text-xl font-bold'>TuLTT</h1>}
			</div>
		</>
	);
}
