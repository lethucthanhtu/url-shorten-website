import { ChangeEvent, useState } from 'react';
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
import { z } from 'zod';
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [error, setError] = useState<Error | null>(null);
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
			.nullable()
			.optional(),
	});

	const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const {
		loading,
		// error: updateError,
		// data: updateData,
		fn: fnUpdate,
	} = useFetch(() => updateUrl({ ...formData, id: url.id }));

	const handleUpdateUrl = async () => {
		try {
			await schema.parse(formData);
			await fnUpdate()
				.then(() => fetchURLs())
				.then(() => {
					// setTimeout(() => onClose(), 1000);
					onClose();
				});
		} catch (error) {
			setError(error as Error);
		}
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader className=''>
						<DialogTitle className='capitalize'>update short link</DialogTitle>
						<DialogDescription className=''>
							Update link here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label className='capitalize text-right'>title</Label>
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
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label className='capitalize text-right'>
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
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label className='capitalize text-right'>custom url</Label>
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
					<DialogFooter className=''>
						<div className='flex justify-between w-full'>
							<DropdownMenu>
								<DropdownMenuTrigger className=''>
									<Button
										variant='outline'
										className={cn(
											'capitalize min-w-28',
											active === 'active' ? `text-green-500` : `text-red-500`
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
											setFormData({ ...formData, active: value === 'active' });
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
								disabled={loading}
								onClick={handleUpdateUrl}
								className='capitalize min-w-24'
							>
								{loading ? (
									<LoaderCircle className='animate-spin w-max' />
								) : (
									'update'
								)}
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
