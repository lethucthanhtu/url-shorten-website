import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import Logo from '@/components/logo';
import { Facebook, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type FooterProps = {} & Omit<HTMLAttributes<HTMLElement>, ''>;

export default function Footer({ ...props }: FooterProps) {
	return (
		<>
			<footer
				{...props}
				className={cn(
					'flex flex-col gap-2 items-center justify-between w-full py-4 px-8 mt-4 shadow-[0px_-12px_6px_-2px_rgba(0,0,0,0.05)] dark:border border-t-gray-800 rounded-lg',
					props.className
				)}
			>
				<div className='w-full flex justify-between items-center'>
					<Logo className='size-16 md:size-24' />
					<div className='flex flex-col md:gap-2'>
						<h4 className='text-lg md:text-2xl font-medium capitalize pb-2'>
							Contact Me
						</h4>
						<a
							target='_blank'
							href='mailto:lethucthanhtu@gmail.com'
							className=''
						>
							<Button
								variant='link'
								className='flex gap-2 justify-center items-center'
							>
								<Mail className='' />
								<span className=''>lethucthanhtu@gmail.com</span>
							</Button>
						</a>
						<a target='_blank' href='tel:84984326742' className=''>
							<Button
								variant='link'
								className='flex gap-2 justify-center items-center'
							>
								<Phone className='' />
								<span className=''>(+84) 98 432 67 42</span>
							</Button>
						</a>
					</div>
				</div>
				<Separator className='' />
				<div className='flex w-full flex-col-reverse md:flex-row justify-between items-center'>
					<span className=''>
						© {new Date().getFullYear()} Lê Thúc Thanh Tú. All rights reserved
					</span>
					<div className='flex gap-2'>
						<a
							target='_blank'
							href='https://linkedin.com/in/lethucthanhtu'
							className='transition hover:scale-125'
						>
							<Button variant='link' className=''>
								<Linkedin />
							</Button>
						</a>
						<a
							target='_blank'
							href='https://github.com/lethucthanhtu/'
							className='transition hover:scale-125'
						>
							<Button variant='link' className=''>
								<Github />
							</Button>
						</a>
						<a
							target='_blank'
							href='https://www.facebook.com/ltttu'
							className='transition hover:scale-125'
						>
							<Button variant='link' className=''>
								<Facebook />
							</Button>
						</a>
					</div>
				</div>
			</footer>
		</>
	);
}
