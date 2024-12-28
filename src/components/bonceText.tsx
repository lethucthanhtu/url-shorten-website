import { cn } from '@/lib/utils';

type BounceTextProps = {
	text: string;
	className?: string;
};

export default function BounceText({ ...props }: BounceTextProps) {
	const letters = props.text.split('');

	return (
		<>
			<span className='inline-flex'>
				{letters.map((letter, index) => (
					<span
						key={index}
						className={cn('mx-auto animate-bounceDelay', props.className)}
						style={{ animationDelay: `${index * 0.1}s` }}
					>
						{letter}
					</span>
				))}
			</span>
		</>
	);
}
