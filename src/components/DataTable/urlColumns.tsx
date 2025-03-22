import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpDown, ExternalLink, FileSearch2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Url } from '@/lib/apiUrls';
import UrlAction from '@/components/DataTable/urlAction';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';
import ShortenLink from '@/components/DataTable/shortenLinkCell';

export const getURLColumns = (
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
		accessorKey: 'active',
		header: ({ column }) => (
			<>
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className='capitalize'
				>
					status
					<ArrowUpDown />
				</Button>
			</>
		),
		cell: ({ row }) => {
			const url = row.original;
			return (
				<>
					<Badge
						variant='outline'
						className={cn(
							'animate-pulse w-16 text-center',
							url.active ? 'bg-green-500' : 'bg-red-500'
						)}
					>
						<span className='text-center w-full'>
							{url.active ? 'active' : 'inactive'}
						</span>
					</Badge>
				</>
			);
		},
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
			return (
				<>
					<ShortenLink url={url.shorten_url} />
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
							<ShortenLink url={custom_url} />
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
				timeZone: 'Asia/Ho_Chi_Minh',
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
		id: 'updated_at',
		accessorKey: 'updated_at',
		enableHiding: true,
		header: ({ column }) => (
			<>
				<div className=''>
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						className='capitalize'
					>
						update date
						<ArrowUpDown />
					</Button>
				</div>
			</>
		),
		cell: ({ row }) => {
			const url = row.original;
			const updated_at = new Date(url.updated_at).toLocaleString('en-GB', {
				timeZone: 'Asia/Ho_Chi_Minh',
			});

			return (
				<>
					<Badge variant='outline' className=''>
						{updated_at}
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
					<div className='flex gap-2'>
						<Link to='/link/$id' params={{ id: url.shorten_url }}>
							<Button variant='outline' size='default' className='capitalize'>
								<FileSearch2 />
								<span className='hidden md:block'>details</span>
							</Button>
						</Link>
						<UrlAction
							url={url}
							fetchURLs={fetchURLs}
							className='hidden md:block'
						/>
					</div>
				</>
			);
		},
	},
];
