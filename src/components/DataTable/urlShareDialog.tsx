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
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';

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
	const isDesktop = window.matchMedia('(min-width: 768px)').matches;
	const navUrl = makeURL(url.custom_url || url.shorten_url);
	const [copy, setCopy] = useState<boolean>(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(makeURL(navUrl));
		setCopy(true);
		setInterval(() => {
			setCopy(false);
		}, 1000);
	};

	const ShareForm = () => {
		return (
			<>
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
			</>
		);
	};

	return (
		<>
			{isDesktop ? (
				<>
					<Dialog open={isOpen} onOpenChange={onClose}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className='capitalize'>
									Share your LetUrl Link
								</DialogTitle>
								<DialogDescription className='w-full'>
									share your short link to your friends and
								</DialogDescription>
							</DialogHeader>
							<DialogDescription className='flex justify-center items-center gap-4 ml-4 mt-2'>
								<ShareForm />
							</DialogDescription>
							<DialogFooter className='flex justify-between items-center'>
								<Input
									disabled
									readOnly
									value={navUrl}
									className='!cursor-default'
								/>
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
				</>
			) : (
				<>
					<Drawer open={isOpen} onOpenChange={onClose}>
						<DrawerContent className=''>
							<div className='mx-auto w-full max-w-sm gap-4 py-4 flex flex-col'>
								<DrawerHeader className='text-start'>
									<DrawerTitle className='flex justify-between items-center capitalize'>
										share short link
									</DrawerTitle>
									<DrawerDescription className=''>
										permanently delete this short link and all its
									</DrawerDescription>
								</DrawerHeader>
								<DrawerDescription className='flex justify-center items-center gap-4'>
									<ShareForm />
								</DrawerDescription>
								<DrawerFooter></DrawerFooter>
							</div>
						</DrawerContent>
					</Drawer>
				</>
			)}
		</>
	);
}
