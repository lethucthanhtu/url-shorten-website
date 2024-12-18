import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableDemo } from '@/components/URL-table.component';
import { Link2 } from 'lucide-react';

export default function ShortenURL() {
	return (
		<>
			<section className='mt-16'>
				<div className='flex flex-col justify-center items-center w-screen gap-4'>
					<h1 className='text-4xl lg:text-5xl font-bold text-center'>
						Shorten Your Loooong Links {':)'}
					</h1>
					<p className='sm:w-1/2 lg:!w-1/3 text-center text-wrap text-base'>
						This is an efficient and easy-to-use URL shortening service that
						streamlines your online experience.
					</p>
					<div className='flex w-full max-w-lg items-center justify-center space-x-2'>
						<Input type='url' placeholder='URL' />
						<Button type='submit'>
							<Link2 />
							<span>Shorten</span>
						</Button>
					</div>
				</div>
			<DataTableDemo/>
			</section>
		</>
	);
}
