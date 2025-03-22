import { Url } from '@/lib/apiUrls';
import { Badge } from '../ui/badge';
import { makeURL } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export default function ShortenLink({ url }: { url: Url }) {
	const shorten_url = url.shorten_url;

	const [copy, setCopy] = useState(false);

	const handleCopy = () => {
		setCopy(true);
		navigator.clipboard.writeText(makeURL(shorten_url));
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
				<Badge variant='secondary'>{shorten_url}</Badge>
				{copy ? <Check className='size-4' /> : <Copy className='size-4' />}
			</div>
		</>
	);
}
