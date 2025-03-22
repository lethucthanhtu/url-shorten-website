import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpDown, Copy, ExternalLink, FileSearch2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { makeURL } from '@/lib/utils';
import { Url } from '@/lib/apiUrls';
import UrlAction from '@/components/DataTable/urlAction';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';

export const get_md_URLColumns = (
	fetchURLs: () => Promise<unknown>
): ColumnDef<Url>[] => [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
				className=''
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
				className=''
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<>
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className='capitalize'
				>
					title
					<ArrowUpDown />
				</Button>
			</>
		),
	},
	{
		accessorKey: 'original_url',
		header: ({ column }) => (
			<>
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className='capitalize'
				>
					original URL
					<ArrowUpDown />
				</Button>
			</>
		),
		cell: ({ row }) => {
			const url = row.original;
			const original_url = url.original_url;
			const maxLength = 25;
			let display_url = original_url
				.replace('https://', '')
				.replace('http://', '')
				.replace('www.', '');
			display_url =
				display_url.length > maxLength
					? `${display_url.substring(0, maxLength - 3)}...`
					: display_url;

			return (
				<>
					<div className='w-fit'>
						<a
							href={original_url}
							className='flex gap-1 items-center hover:underline'
						>
							{display_url}
							<ExternalLink className='size-4' />
						</a>
					</div>
				</>
			);
		},
	},
	{
		accessorKey: 'shorten_url',
		header: ({ column }) => (
			<>
				<div className='flex justify-center'>
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className='capitalize'
					>
						shorten URL
						<ArrowUpDown />
					</Button>
				</div>
			</>
		),
		cell: ({ row }) => {
			const url = row.original;
			const shorten_url = url.shorten_url;

			return (
				<>
					<div className='flex justify-center'>
						<a href={makeURL(shorten_url)} className='text-center'>
							<Badge variant='secondary'>{shorten_url}</Badge>
						</a>
					</div>
				</>
			);
		},
	},
	{
		accessorKey: 'custom_url',
		header: ({ column }) => (
			<>
				<div className='flex justify-center'>
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className='capitalize'
					>
						custom URL
						<ArrowUpDown />
					</Button>
				</div>
			</>
		),
		cell: ({ row }) => {
			const url = row.original;
			const custom_url = url.custom_url;

			return (
				<>
					{custom_url ? (
						<>
							<div className='flex justify-center'>
								<a href={makeURL(custom_url + '')} className='text-center'>
									<Badge variant='secondary'>{custom_url}</Badge>
								</a>
							</div>
						</>
					) : (
						<></>
					)}
				</>
			);
		},
	},
	{
		id: 'created_at',
		accessorKey: 'created_at',
		header: ({ column }) => (
			<>
				<div className=''>
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className='capitalize'
					>
						create date
						<ArrowUpDown />
					</Button>
				</div>
			</>
		),
		cell: ({ row }) => {
			const url = row.original;
			const created_at = new Date(url.created_at).toLocaleString('en-GB', {
				timeZone: 'UTC',
			});

			return (
				<>
					<Badge variant='outline' className=''>
						{created_at}
					</Badge>
				</>
			);
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const url = row.original;

			return (
				<>
					<UrlAction url={url} fetchURLs={fetchURLs} />
				</>
			);
		},
	},
];

export const get_sm_URLColumns = (
	fetchURLs: () => Promise<unknown>
): ColumnDef<Url>[] => [
	// {
	// 	id: 'select',
	// 	header: ({ table }) => (
	// 		<Checkbox
	// 			checked={
	// 				table.getIsAllPageRowsSelected() ||
	// 				(table.getIsSomePageRowsSelected() && 'indeterminate')
	// 			}
	// 			onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
	// 			aria-label='Select all'
	// 			className=''
	// 		/>
	// 	),
	// 	cell: ({ row }) => (
	// 		<Checkbox
	// 			checked={row.getIsSelected()}
	// 			onCheckedChange={(value) => row.toggleSelected(!!value)}
	// 			aria-label='Select row'
	// 			className=''
	// 		/>
	// 	),
	// 	enableSorting: false,
	// 	enableHiding: false,
	// },
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<>
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className='capitalize'
				>
					title
					<ArrowUpDown />
				</Button>
			</>
		),
		// cell: ({ row }) => {
		// 	return (
		// 		<>
		// 			<span className='text-wrap'>{row.original.title}</span>
		// 			<div className=''></div>
		// 		</>
		// 	);
		// },
	},
	{
		accessorKey: 'shorten_url',
		header: ({ column }) => (
			<>
				<div className='flex justify-center'>
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className='capitalize'
					>
						shorten URL
						<ArrowUpDown />
					</Button>
				</div>
			</>
		),
		cell: ({ row }) => {
			const url = row.original;
			const showURL = url.custom_url || url.shorten_url;

			return (
				<>
					<div
						onClick={() => navigator.clipboard.writeText(makeURL(showURL))}
						className='text-center flex gap-2 justify-end items-center mr-4'
					>
						<Badge variant='secondary'>{showURL}</Badge>
						<Copy className='size-4' />
					</div>
				</>
			);
		},
	},
	{
		id: 'actions',
		// header: () => {
		// 	return (
		// 		<>
		// 			<div className='flex justify-center'>
		// 				<span className='text-center capitalize'>actions</span>
		// 			</div>
		// 		</>
		// 	);
		// },
		enableHiding: false,
		cell: ({ row }) => {
			const url = row.original;

			return (
				<>
					<div className='flex gap-2'>
						<Link to='/link/$id' params={{ id: url.shorten_url }}>
							<Button variant='outline' size='icon' className='capitalize'>
								<FileSearch2 />
							</Button>
						</Link>

						<Button
							variant='destructive'
							onClick={() => fetchURLs()}
							className='capitalize hidden'
						>
							remove
						</Button>
					</div>
				</>
			);
		},
	},
];
