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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy, Facebook, Mail } from 'lucide-react';
import { useState } from 'react';

type ShareDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	url: Url;
};

export default function ShareDialog({
	isOpen,
	onClose,
	url,
}: ShareDialogProps) {
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
						<h2 className='capitalize text-2xl'>Share your LetUrl Link</h2>
					</DialogTitle>
				</DialogHeader>
				<DialogDescription className='flex justify-center items-center gap-6'>
					<a
						target='_blank'
						href={`https://facebook.com/sharer.php?u=${navUrl}`}
						aria-label='Share to Facebook'
						title='Share to Facebook'
						className='flex flex-col gap-2 justify-center items-center'
					>
						<Button variant='outline' className=''>
							<Facebook />
						</Button>
						<span className='text-center capitalize'>facebook</span>
					</a>
					<a
						target='_blank'
						href={`mailto:?subject=Check out my shorten link&body=Check out this link shorten with LetUrl ${navUrl}`}
						aria-label='Share via Email'
						title='Share via Email'
						className='flex flex-col gap-2 justify-center items-center'
					>
						<Button variant='outline' className=''>
							<Mail />
						</Button>
						<span className='text-center capitalize'>mail</span>
					</a>
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
