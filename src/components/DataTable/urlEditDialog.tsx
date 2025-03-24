import { ChangeEvent, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateUrl, Url } from '@/lib/apiUrls';
import { z, ZodError } from 'zod';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, LoaderCircle } from 'lucide-react';
import useFetch from '@/hooks/useFetch';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { Switch } from '@/components/ui/switch';

type EditDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	url: Url;
	fetchURLs: () => Promise<unknown>;
	fnExtend?: () => void;
};

export default function EditDialog({
	isOpen,
	onClose,
	url,
	fetchURLs,
}: EditDialogProps) {
	const isDesktop = window.matchMedia('(min-width: 768px)').matches;
	const [active, setActive] = useState(url.active ? 'active' : 'inactive');

	type FormData = {} & Pick<Url, 'title' | 'custom_url' | 'active'>;

	const [formData, setFormData] = useState<FormData>({ ...url });

	const schema = z.object({
		title: z.string().optional(),
		original_url: z.string().url('Must be a valid URL').nonempty('Required'),
		custom_url: z
			.string()
			.trim()
			.refine(
				(value) => value === '' || /^[a-zA-Z0-9-_]+$/.test(value),
				'Must be alphanumeric'
			)
			.refine(
				(value) => value !== url.shorten_url,
				"Really? That's your custom url?"
			)
			.nullable()
			.optional(),
	});

	const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
	};

	const {
		loading,
		// error: updateError,
		// data: updateData,
		fn: fnUpdate,
	} = useFetch<Url>(() => updateUrl({ ...formData, id: url.id }));

	const handleUpdateUrl = async () => {
		try {
			schema.parse(formData);

			await fnUpdate().then((res) => {
				if (res) {
					fetchURLs();
					onClose();
				}
			});
		} catch (error) {
			(error as ZodError).errors.map((error) => {
				toast('Error', {
					description: error.message,
				});
			});
		}
	};

	// check for changes
	const hasChanges = () => {
		return (
			formData.title?.trim() !== url.title ||
			formData.custom_url?.trim() !== url.custom_url ||
			formData.active !== url.active
		);
	};

	useEffect(() => {
		if (!isOpen) {
			setActive(url.active ? 'active' : 'inactive');
		}
	}, [isOpen, url.active]);

	const EditForm = ({ className }: { className?: string }) => {
		return (
			<>
				<div className={cn('grid gap-4 py-4', className)}>
					<div className='grid md:grid-cols-4 items-center gap-2'>
						<Label
							htmlFor='title'
							className='capitalize md:text-right ml-2 md:ml-0'
						>
							title
						</Label>
						<Input
							id='title'
							value={formData.title + ''}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
							placeholder='Name for your link (optional)'
							className='col-span-3'
						/>
					</div>
					<div className='grid md:grid-cols-4 items-center gap-2'>
						<Label
							htmlFor='original_url'
							className='capitalize md:text-right ml-2 md:ml-0'
						>
							original url
							<span className='ml-0.5 text-red-500'>*</span>
						</Label>
						<Input
							id='original_url'
							disabled
							value={url.original_url}
							type='url'
							required
							placeholder='https://example.com'
							className='col-span-3'
						/>
					</div>
					<div className='grid md:grid-cols-4 items-center gap-2'>
						<Label
							htmlFor='custom_url'
							className='capitalize md:text-right ml-2 md:ml-0'
						>
							custom url
						</Label>
						<div className='flex justify-center items-center w-full gap-2 col-span-3'>
							<Badge aria-label='url' className='text-sm'>
								{window.location.hostname}
							</Badge>
							/
							<Input
								id='custom_url'
								value={formData.custom_url || ''}
								onChange={handleChanges}
								placeholder='(optional)'
								className=''
							/>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			{isDesktop ? (
				<>
					<Dialog open={isOpen} onOpenChange={onClose}>
						<DialogContent className='sm:max-w-md'>
							<DialogHeader className=''>
								<DialogTitle className='capitalize'>
									update short link
								</DialogTitle>
								<DialogDescription className=''>
									Update link here. Click save when you're done.
								</DialogDescription>
							</DialogHeader>
							<EditForm className='' />
							<DialogFooter className=''>
								<div className='flex justify-between w-full'>
									<DropdownMenu>
										<DropdownMenuTrigger className=''>
											<Button
												variant='outline'
												className={cn(
													'capitalize min-w-28',
													active === 'active'
														? `text-green-500`
														: `text-red-500`
												)}
											>
												{active}
												<ChevronDown />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuRadioGroup
												value={active}
												onValueChange={(value) => {
													setActive(value);
													setFormData({
														...formData,
														active: value === 'active',
													});
												}}
												className=''
											>
												<DropdownMenuRadioItem
													value='active'
													className='text-green-500 capitalize'
												>
													active
												</DropdownMenuRadioItem>
												<DropdownMenuRadioItem
													value='inactive'
													className='text-red-500 capitalize'
												>
													inactive
												</DropdownMenuRadioItem>
											</DropdownMenuRadioGroup>
										</DropdownMenuContent>
									</DropdownMenu>

									<Button
										disabled={loading || !hasChanges()}
										onClick={handleUpdateUrl}
										className={cn('capitalize min-w-24', '')}
									>
										{loading ? (
											<LoaderCircle className='animate-spin w-max' />
										) : (
											<>update</>
										)}
									</Button>
								</div>
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
									<DrawerTitle className='capitalize'>
										update short link
									</DrawerTitle>
									<DrawerDescription className='w-full'>
										Update link here. Click save when you're done.
									</DrawerDescription>
								</DrawerHeader>
								<EditForm className='mx-4' />
								<DrawerFooter className='gap-4'>
									<div className='flex justify-between items-center'>
										<div className='inline-flex gap-2 justify-center items-center'>
											<Switch
												id='active'
												checked={active === 'active'}
												defaultChecked={active === 'active'}
												onCheckedChange={(checked) => {
													setActive(checked ? 'active' : 'inactive');
													setFormData({ ...formData, active: checked });
												}}
												className=''
											/>
											<Label
												htmlFor='active'
												className={cn(
													' capitalize text-right',
													active === 'active'
														? 'text-green-500'
														: 'text-red-500'
												)}
											>
												active
											</Label>
										</div>
										<Button
											disabled={loading || !hasChanges()}
											onClick={handleUpdateUrl}
											className={cn('capitalize min-w-24', '')}
										>
											{loading ? (
												<LoaderCircle className='animate-spin w-max' />
											) : (
												<>update</>
											)}
										</Button>
									</div>
								</DrawerFooter>
							</div>
						</DrawerContent>
						<DrawerFooter></DrawerFooter>
					</Drawer>
				</>
			)}
		</>
	);
}
