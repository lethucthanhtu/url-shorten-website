import { cn } from '@/lib/utils';

type BounceTextProps = {
	text: string;
	className?: string;
};

export default function BounceText({ ...props }: BounceTextProps) {
	const letters = props.text.split('');

	return (
		<>
			<div className='flex'>
				{letters.map((letter, index) => (
					<div
						key={index}
						className={cn('mx-auto animate-bounceDelay', props.className)}
						style={{ animationDelay: `${index * 0.1}s` }}
					>
						{letter}
					</div>
				))}
			</div>
		</>
	);
}
