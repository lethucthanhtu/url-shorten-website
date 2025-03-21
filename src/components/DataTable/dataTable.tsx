import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	footerHidden?: boolean;
};

export default function DataTable<TData, TValue>({
	data,
	columns,
	footerHidden = false,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	const [filter, setFilter] = useState<string>(
		table.getAllColumns().filter((column) => column.getCanHide())[0].id
	);

	return (
		<>
			<div className='flex items-center py-4'>
				<div className='w-full flex gap-2'>
					<Input
						placeholder={`Filter ${filter.replace(/_/g, ' ')}...`}
						value={(table.getColumn(filter)?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn(filter)?.setFilterValue(event.target.value)
						}
						className='max-w-sm'
					/>
					<DropdownMenu>
						<DropdownMenuTrigger className=''>
							<Button variant='outline' className='ml-auto capitalize'>
								{filter.replace(/_/g, ' ')} <ChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => (
									<>
										<DropdownMenuRadioGroup
											value={filter}
											onValueChange={setFilter}
											className='capitalize'
										>
											<DropdownMenuRadioItem value={column.id} key={column.id}>
												{column.id.replace(/_/g, ' ')}
											</DropdownMenuRadioItem>
										</DropdownMenuRadioGroup>
									</>
								))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Columns <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Table className=''>
				<TableHeader className=''>
					{table.getHeaderGroups().map((headerGroup) => (
						<>
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<>
										<TableHead key={header.id}>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
										</TableHead>
									</>
								))}
							</TableRow>
						</>
					))}
				</TableHeader>
				<TableBody className=''>
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<>
								<TableRow key={row.id} className=''>
									{row.getVisibleCells().map((cell) => (
										<>
											<TableCell key={cell.id} className=''>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										</>
									))}
								</TableRow>
							</>
						))
					) : (
						<>
							<TableRow className=''>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center capitalize'
								>
									No result
								</TableCell>
							</TableRow>
						</>
					)}
				</TableBody>
				<TableFooter hidden={footerHidden} className=''>
					{table.getFooterGroups().map((footerGroup) => (
						<>
							<TableRow key={footerGroup.id} className=''>
								{footerGroup.headers.map((footer) => (
									<>
										<TableCell
											key={footer.id}
											colSpan={footer.colSpan}
											className=''
										>
											{flexRender(
												footer.column.columnDef.footer,
												footer.getContext()
											)}
										</TableCell>
									</>
								))}
							</TableRow>
						</>
					))}
				</TableFooter>
			</Table>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<div className='flex-1 text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className='space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</>
	);
}
