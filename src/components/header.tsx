import { SVGProps } from 'react';
import { JSX } from 'react/jsx-runtime';

import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuLink,
} from '@/components/ui/navigation-menu';

import Logo from './logo';

import { capitalize } from '@/lib/utils';
import { ModeToggle } from './modeToggle';
import { LanguageToggle } from './languageToggle';
import { UserMenu } from './userMenu';
import { Link } from '@tanstack/react-router';

export default function Header() {
	return (
		<div className='container mx-auto sticky top-0 z-10'>
			<header className='flex h-20 w-full shrink-0 items-center bg-background'>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant='outline' size='icon' className='lg:hidden'>
							<MenuIcon className='size-6' />
							<span className='sr-only'>Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side='left'>
						<Logo className='size-8 border border-black dark:border-white' />
						<div className='grid gap-2 py-6'>
							<NavList />
						</div>
					</SheetContent>
				</Sheet>
				<div className='mr-6 hidden lg:flex'>
					<Logo className='size-8 border border-black dark:border-white p-[2.5%]' />
				</div>
				<NavBar />
				<div className='ml-auto flex gap-4'>
					<div className='flex gap-2'>
						<LanguageToggle />
						<ModeToggle />
					</div>
					<UserMenu />
				</div>
			</header>
		</div>
	);
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<line x1='4' x2='20' y1='12' y2='12' />
			<line x1='4' x2='20' y1='6' y2='6' />
			<line x1='4' x2='20' y1='18' y2='18' />
		</svg>
	);
}

type NavItem = {
	title: string;
	href?: string;
};

const navItems: NavItem[] = [
	{
		title: 'home',
		href: 'home',
	},
	{
		title: 'about',
		href: 'about',
	},
	{
		title: 'service',
		href: '#',
	},
	{
		title: 'portfolio',
		href: 'portfolio',
	},
	{
		title: 'contact',
		href: 'contact',
	},
];

function NavBar() {
	return (
		<>
			<NavigationMenu className='hidden lg:flex'>
				<NavigationMenuList>
					{navItems.map(({ ...props }, index) => (
						<NavigationMenuLink asChild key={index}>
							<Link
								// activeProps={{
								// 	className: 'bg-gray-200 dark:bg-gray-800 font-bold ',
								// }}
								to={props.href || '#'}
								className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50 [&.active]:bg-gray-200 dark:[&.active]:bg-gray-800 [&.active]:font-bold'
							>
								{capitalize(props.title)}
							</Link>
						</NavigationMenuLink>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</>
	);
}

function NavList() {
	return (
		<>
			{navItems.map(({ ...props }) => (
				<Link
					to={props.href}
					className='flex w-full items-center py-2 text-lg font-semibold'
				>
					{capitalize(props.title)}
				</Link>
			))}
		</>
	);
}
