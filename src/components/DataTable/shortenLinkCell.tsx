import { Badge } from '@/components/ui/badge';
import { makeURL } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export default function ShortenLink({ url }: { url: string }) {
	const [copy, setCopy] = useState(false);

	const handleCopy = () => {
		setCopy(true);
		navigator.clipboard.writeText(makeURL(url));
		setTimeout(() => {
			setCopy(false);
		}, 1000);
	};

	return (
		<>
			<div
				onClick={handleCopy}
				className='flex justify-center cursor-pointer items-center gap-2'
			>
				<Badge
					variant='secondary'
					className='min-w-20 font-mono text-center flex justify-center'
				>
					{url}
				</Badge>
				{copy ? <Check className='size-4' /> : <Copy className='size-4' />}
			</div>
		</>
	);
}
