import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableDemo } from '@/components/URL-table.component';

import BounceText from '@/pages/home/bonce-text';

import '@/index.css';
import { Link2 } from 'lucide-react';

const ShortenURL = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef?.current?.focus();
	}, [inputRef]);

	return (
		<>
			<section className='container mx-auto my-16'>
				<div className='flex flex-col justify-center items-center gap-4'>
					<h1 className='mx-auto text-4xl lg:text-5xl font-bold text-center flex flex-wrap justify-center items-center gap-3 select-none'>
						<span className='text-nowrap'>Shorten</span>
						<span>Your</span>
						<span className='flex text-nowrap'>
							L
							<BounceText
								text='oooo'
								className='text-4xl lg:text-5xl font-bold'
							/>
							ng
						</span>
						<span>Links {':)'}</span>
					</h1>
					<div className='flex w-full max-w-lg items-center justify-center space-x-2'>
						<Input type='url' placeholder='URL' ref={inputRef} />
						<Button type='submit'>
							<Link2 />
							<span>Shorten</span>
						</Button>
					</div>
				</div>
				<DataTableDemo />
			</section>
		</>
	);
};

export { ShortenURL };
