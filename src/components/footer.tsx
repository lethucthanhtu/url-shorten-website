import { Link } from "@tanstack/react-router";

export default function Footer() {
	return (
		<div className='container mx-auto flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 xl:flex-row'>
			<p className='mb-4 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400 sm:!mb-0 md:text-lg'>
				<span className='mb-4 text-center text-sm text-zinc-500 dark:text-zinc-400 sm:!mb-0 md:text-sm'>
					©{new Date().getFullYear()} Le Thuc Thanh Tu. All Rights Reserved.
				</span>
			</p>
			<div className="hidden md:block">
				<ul className='flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10'>
					<li>
						<Link
							target='blank'
							href='mailto:lethucthanhtu@gmail.com'
							className='text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200'
						>
							FAQs
						</Link>
					</li>
					<li>
						<Link
							target='blank'
							href='#'
							className='text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200'
						>
							Privacy Policy
						</Link>
					</li>
					<li>
						<Link
							target='blank'
							href='#'
							className='text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200'
						>
							Terms & Conditions
						</Link>
					</li>
					<li>
						<Link
							target='blank'
							href='#'
							className='text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200'
						>
							Refund Policy
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
