import { cn } from '@/lib/utils';
import { ThemeButton } from '@/components/themeButton';
import Logo from '@/components/logo';
import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Home,
	LayoutDashboard,
	LogOut,
	Menu,
	Settings,
	User,
} from 'lucide-react';
import { HTMLAttributes } from 'react';
import { useSession } from '@/contexts/SessionContext';
import LoginGoogleButton from '@/components/googleButton';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';

type HeaderProps = {} & Omit<HTMLAttributes<HTMLElement>, ''>;

export default function Header({ ...props }: HeaderProps) {
	const { session, signOut, user } = useSession();
	const navigate = useNavigate();

	const handleSignOut = () => {
		signOut();
		navigate({ to: '/' });
	};

	return (
		<header
			{...props}
			className={cn(
				'p-4 md:px-12 bg-cover bg-center rounded-lg flex justify-between items-center w-full sticky top-0 bg-background border-b z-50',
				props.className
			)}
		>
			<Logo className='size-10 hidden md:block' />

			<NavigationMenu className='hidden md:block'>
				<NavigationMenuList className=''>
					<NavigationMenuLink asChild className=''>
						<Link to='/' className=''>
							<Button variant='outline' className=''>
								home
							</Button>
						</Link>
					</NavigationMenuLink>
					{session && (
						<NavigationMenuLink asChild className=''>
							<Link to='/dashboard' className=''>
								<Button variant='outline' className=''>
									dashboard
								</Button>
							</Link>
						</NavigationMenuLink>
					)}
				</NavigationMenuList>
			</NavigationMenu>

			<Drawer>
				<DrawerTrigger asChild>
					<Button variant='ghost' size='icon' className='md:hidden'>
						<Menu className='' />
					</Button>
				</DrawerTrigger>
				<DrawerContent className=''>
					<div className='mx-auto w-full max-w-sm'>
						<DrawerHeader className='my-4'>
							<DrawerTitle className='flex justify-between items-center'>
								{user && (
									<>
										<img
											src={user.user_metadata?.avatar_url}
											alt={user.user_metadata?.name[0]}
											className='border border-foreground rounded-lg size-8'
										/>
										{user?.email}
									</>
								)}
							</DrawerTitle>
						</DrawerHeader>
						<DrawerDescription className='flex flex-col gap-4 mb-4 w-full'>
							<Link to='/' className='w-full'>
								<Button variant='link' className='capitalize'>
									<Home className='' />
									home
								</Button>{' '}
							</Link>
							{user && (
								<>
									<Link to='/dashboard' className='w-full'>
										<Button variant='link' className='capitalize'>
											<LayoutDashboard className='' />
											dashboard
										</Button>
									</Link>
								</>
							)}
							<div className=''>
								<Button variant='link' className='capitalize' disabled>
									<Settings className='' />
									settings
								</Button>
							</div>
						</DrawerDescription>
						<DrawerFooter className='gap-4'>
							{session ? (
								<>
									<Button
										onClick={handleSignOut}
										variant='outline'
										className='capitalize text-red-500'
									>
										<LogOut className='' />
										log out
									</Button>
								</>
							) : (
								<>
									<LoginGoogleButton variant='default' className='' />
								</>
							)}
							{/* <DrawerClose asChild>
								<Button variant='default'>Cancel</Button>
							</DrawerClose> */}
						</DrawerFooter>
					</div>
				</DrawerContent>
			</Drawer>

			<div className='inline-flex gap-2'>
				<ThemeButton className='' />

				<DropdownMenu>
					<DropdownMenuTrigger asChild className=''>
						<Button variant='outline' size='icon' className='hidden md:block'>
							{user ? (
								<img
									src={user?.user_metadata?.avatar_url}
									alt={user?.user_metadata?.name[0]}
									className='p-1 rounded-lg'
								/>
							) : (
								<User className='' />
							)}
						</Button>
					</DropdownMenuTrigger>
					{user ? (
						<>
							<DropdownMenuContent align='end' className=''>
								<DropdownMenuLabel className=''>
									{user?.email}
								</DropdownMenuLabel>
								<DropdownMenuSeparator className='' />
								<Link to='/dashboard'>
									<DropdownMenuItem className='capitalize'>
										<LayoutDashboard className='' />
										<span className=''>dashboard</span>
									</DropdownMenuItem>
								</Link>
								<Link to='/settings'>
									<DropdownMenuItem className='capitalize' disabled>
										<Settings className='' />
										<span className=''>settings</span>
									</DropdownMenuItem>
								</Link>
								<DropdownMenuSeparator className='' />
								<DropdownMenuItem
									onClick={handleSignOut}
									className='capitalize text-red-500'
								>
									<LogOut className='' /> <span className=''>log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</>
					) : (
						<>
							<DropdownMenuContent align='end' className=''>
								<Link to='/'>
									<DropdownMenuItem className='capitalize' disabled>
										<Settings className='' />
										<span className=''>settings</span>
									</DropdownMenuItem>
								</Link>
								<DropdownMenuSeparator className='' />
								<DropdownMenuItem>
									<LoginGoogleButton
										asButton={false}
										variant='ghost'
										className=''
									/>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</>
					)}
				</DropdownMenu>
			</div>
		</header>
	);
}
