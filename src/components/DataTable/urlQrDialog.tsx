import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Url } from '@/lib/apiUrls';
import { cn, makeURL } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

type QRDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	url: Url;
};

export default function QRDialog({ isOpen, onClose, url }: QRDialogProps) {
	const navUrl = makeURL(url.custom_url || url.shorten_url);
	const [copy, setCopy] = useState<boolean>(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(makeURL(navUrl));
		setCopy(true);
		setInterval(() => {
			setCopy(false);
		}, 1000);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center'>
						<h2 className='capitalize text-2xl'>Scan QR Code</h2>
						<p className='capitalize text-sm font-light'>
							Scan this code to navigate to the website
						</p>
					</DialogTitle>
				</DialogHeader>
				<DialogDescription className='flex flex-col justify-center items-center'>
					<Link
						to='/$id'
						params={{ id: url.custom_url || url.shorten_url }}
						className='size-full p-8'
					>
						<div className='aspect-square ring-2 ring-black dark:ring-white rounded-xl duration-300 transition hover:scale-110'>
							<QRCodeSVG
								value={navUrl}
								className='size-full scale-90 aspect-square ring-2 ring-black dark:ring-white rounded-xl'
							/>
						</div>
					</Link>
					<span className='flex gap-2 justify-center items-center'>
						<span className='h-0.5 min-w-24 bg-gray-300 text-gray-300' />
						<span className=''>or manually go to this URL</span>
						<span className='h-0.5 min-w-24 bg-gray-300 text-gray-300' />
					</span>
				</DialogDescription>
				<DialogFooter className='flex justify-between items-center'>
					<Input disabled readOnly value={navUrl} className='!cursor-default' />
					<Button
						size='icon'
						variant='outline'
						onClick={handleCopy}
						className={cn('', copy ? 'animate-ping' : '')}
					>
						{copy ? <Check /> : <Copy />}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
