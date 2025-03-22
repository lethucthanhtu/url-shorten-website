import { cn, makeURL } from '@/lib/utils';
import {
	MoreHorizontal,
	FileChartLine,
	Copy,
	QrCode,
	Power,
	Trash,
	Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@tanstack/react-router';
import { deleteUrl, updateActive, Url } from '@/lib/apiUrls';
import useFetch from '@/hooks/useFetch';
import { useState } from 'react';
import QRDialog from '@/components/DataTable/urlQrDialog';
import EditDialog from '@/components/DataTable/urlEditDialog';

type UrlActionProps = {
	url: Url;
	fetchURLs: () => Promise<unknown>;
};

export default function UrlAction({ url, fetchURLs }: UrlActionProps) {
	const [isQrCodeDialogOpen, setIsQrCodeDialogOpen] = useState<boolean>(false);
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
	const {
		// loading: deleteLoading,
		// error: deleteError,
		fn: fnDelete,
	} = useFetch<void>(() => deleteUrl(url.id));

	const {
		// loading,
		// error,
		fn: fnUpdateActive,
	} = useFetch<Url>(() => updateActive({ id: url.id, active: !url.active }));

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='size-8 p-0'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<Link to='/link/$id' params={{ id: url.shorten_url }}>
						<DropdownMenuItem>
							<FileChartLine />
							View details
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>
						<Edit />
						Edit URL
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() =>
							navigator.clipboard.writeText(
								makeURL(url.custom_url || url.shorten_url)
							)
						}
					>
						<Copy />
						Copy shorten URL
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsQrCodeDialogOpen(true)}>
						<QrCode />
						Show QR code
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() =>
							fnUpdateActive(url.id, !url.active).then(() => fetchURLs())
						}
						className={cn('', url.active ? 'text-red-500' : 'text-green-500')}
					>
						<Power />
						{url.active ? <>De-Active URL</> : <>Active URL</>}
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => fnDelete(url.id).then(() => fetchURLs())}
						className='text-red-500'
					>
						<Trash /> Remove
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<QRDialog
				url={url}
				isOpen={isQrCodeDialogOpen}
				onClose={() => setIsQrCodeDialogOpen(false)}
			/>
			<EditDialog
				url={url}
				isOpen={isUpdateDialogOpen}
				onClose={() => setIsUpdateDialogOpen(false)}
				fetchURLs={fetchURLs}
			/>
		</>
	);
}
