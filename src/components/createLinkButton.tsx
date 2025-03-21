import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogFooter,
	DialogContent,
	DialogTrigger,
	DialogDescription,
} from '@/components/ui/dialog';
import { Button, ButtonProps } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { z } from 'zod';
import useFetch from '@/hooks/useFetch';
import { createUrl, Url } from '@/lib/apiUrls';
import { useSession } from '@/contexts/SessionContext';

import { LoaderCircle } from 'lucide-react';

type CreateLinkButtonProps = {} & ButtonProps;

export default function CreateLinkButton({ ...props }: CreateLinkButtonProps) {
	const search: { url: string } = useSearch({ from: '__root__' });

	const { user } = useSession();

	const navigate = useNavigate();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [error, setError] = useState<Error | unknown>();
	// const [open, setOpen] = useState<boolean>(false);

	type FormData = {} & Pick<Url, 'title' | 'original_url' | 'custom_url'>;

	const [formData, setFormData] = useState<FormData>({
		title: '',
		original_url: search.url || '',
		custom_url: '',
	});

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
			.optional(),
	});

	const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const {
		loading,
		error: createError,
		data: createData,
		fn: fnCreate,
	} = useFetch(() => createUrl({ ...formData, user_id: user?.id || null }));

	const handleCreateShortLink = async () => {
		try {
			await schema.parse(formData);
			await fnCreate();
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		if (!createError && createData)
			navigate({ to: '/link/$id', params: { id: createData.shorten_url } });
	}, [createData, createError, navigate]);

	return (
		<>
			<Dialog defaultOpen={!!search.url}>
				<DialogTrigger asChild className=''>
					<Button {...props} className={cn('capitalize', props.className)}>
						create link
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader className=''>
						<DialogTitle className='capitalize'>
							create new short link
						</DialogTitle>
						<DialogDescription className=''>
							Create new link here. Click save when you're done.
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
								value={formData.original_url}
								onChange={handleChanges}
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
									value={formData.custom_url + ''}
									onChange={handleChanges}
									placeholder='(optional)'
									className=''
								/>
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button
							disabled={loading || !formData.original_url}
							onClick={handleCreateShortLink}
							className='capitalize min-w-24'
						>
							{loading ? (
								<LoaderCircle className='animate-spin w-max' />
							) : (
								'create'
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
