import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import useFetch from '@/hooks/useFetch';
import { deleteUrl, Url } from '@/lib/apiUrls';
import { useNavigate } from '@tanstack/react-router';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '../ui/drawer';
import { Label } from '../ui/label';

type DeleteDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	url: Url;
	fetchURLs: () => Promise<unknown>;
};

export default function DeleteDialog({
	isOpen,
	onClose,
	url,
	fetchURLs,
}: DeleteDialogProps) {
	const isDesktop = window.matchMedia('(min-width: 768px)').matches;
	const navigate = useNavigate();

	const {
		loading: loadingDelete,
		// error: deleteError,
		fn: fnDelete,
	} = useFetch<void>(() => deleteUrl(url?.id || null));

	const handleDelete = () => {
		fnDelete(url?.id).then(() => {
			if (window.location.pathname !== '/dashboard')
				navigate({ to: '/dashboard', replace: true });
			else fetchURLs();
		});
	};

	const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

	const WarningForm = () => {
		return (
			<>
				<h4 className='w-full'>
					Are you sure you want to delete
					<span className='ml-1 text-foreground font-medium underline underline-offset-4'>
						{url.title || url.custom_url || url.shorten_url}
					</span>
					?
				</h4>
				<h5 className='w-full'>
					There is
					<Badge className='mx-1'>no undo!</Badge>. This process cannot be
					undone.
				</h5>
				<h5 className='w-full underline underline-offset-4'>
					You have been warned.
				</h5>
			</>
		);
	};

	const DeleteFrom = ({ className }: { className?: string }) => {
		return (
			<>
				<div
					className={cn('flex justify-between items-center w-full', className)}
				>
					<div className='flex gap-2'>
						<Checkbox
							id='terms'
							checked={isConfirmed}
							onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
						/>
						<Label
							htmlFor='terms'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							I understand & wish to proceed.
						</Label>
					</div>
					<Button
						disabled={loadingDelete || !isConfirmed}
						variant='destructive'
						onClick={handleDelete}
						className={cn('capitalize min-w-24', '')}
					>
						{loadingDelete ? (
							<LoaderCircle className='animate-spin w-max' />
						) : (
							<>delete</>
						)}
					</Button>
				</div>
			</>
		);
	};

	return (
		<>
			{isDesktop ? (
				<>
					<Dialog open={isOpen} onOpenChange={onClose}>
						<DialogContent>
							<DialogHeader className=''>
								<DialogTitle className='capitalize'>
									delete short link
								</DialogTitle>
								<DialogDescription className='w-full'>
									permanently delete this short link and all its
								</DialogDescription>
							</DialogHeader>
							<DialogDescription className='flex flex-col justify-center items-center gap-4 ml-4 mt-2'>
								<WarningForm />
							</DialogDescription>
							<DialogFooter className='mt-2'>
								<DeleteFrom />
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
										delete short link
									</DrawerTitle>
									<DrawerDescription className=''>
										permanently delete this short link and all its
									</DrawerDescription>
								</DrawerHeader>
								<DrawerDescription className='flex flex-col justify-center items-center gap-4 ml-4 pl-4'>
									<WarningForm />
								</DrawerDescription>
								<DrawerFooter>
									<DeleteFrom />
								</DrawerFooter>
							</div>
						</DrawerContent>
					</Drawer>
				</>
			)}
		</>
	);
}
