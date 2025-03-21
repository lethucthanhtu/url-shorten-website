import { deleteUrl, Url } from '@/lib/apiUrls';
import { Link } from '@tanstack/react-router';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import useFetch from '@/hooks/useFetch';
import { QRCodeSVG } from 'qrcode.react';

type LinkCardProps = {
	url: Url;
	fetchURLs: () => Promise<void>;
};

export default function LinkCard({ url, ...props }: LinkCardProps) {
	const {
		// loading: deleteLoading,
		// error: deleteError,
		fn: fnDelete,
	} = useFetch<void>(() => deleteUrl(url.id));

	return (
		<>
			<Card key={url.id} className='w-full'>
				<CardHeader className=''>
					<CardTitle className='capitalize'>{url.title}</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-col'>
					<Link to='/link/$id' params={{ id: url.id + '' }}>
						alo
					</Link>
					<Link to='/link/$id' params={{ id: url.shorten_url }}>
						<span className=''>{url.shorten_url}</span>
					</Link>
					<span className=''>{url.original_url}</span>
					<span className=''>{url.custom_url}</span>
					<span className=''>{url.qr}</span>
					<span className=''>
						{new Date(url.created_at).toLocaleDateString()}
					</span>
					<QRCodeSVG
						value={`${window.location.origin}/${url.shorten_url}`}
						className='ring ring-white  rounded-lg'
					/>
				</CardContent>
				<CardFooter>
					<Button
						size='icon'
						variant='ghost'
						onClick={() => fnDelete(url.id).then(() => props.fetchURLs())}
						className=''
					>
						<Trash />
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}
