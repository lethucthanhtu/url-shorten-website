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
import { LayoutDashboard, LogOut, Settings, User } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { useSession } from '@/contexts/SessionContext';
import LoginGoogleButton from '@/components/googleButton';

type HeaderProps = {} & Omit<HTMLAttributes<HTMLElement>, ''>;

export default function Header({ ...props }: HeaderProps) {
	const { signOut, user } = useSession();
	const navigate = useNavigate();
	const { session } = useSession();

	const handleSignOut = () => {
		signOut();
		navigate({ to: '/' });
	};

	return (
		<header
			{...props}
			className={cn(
				'p-4 bg-cover bg-center rounded-lg flex justify-between items-center w-full sticky top-0 bg-background border-b z-50',
				props.className
			)}
		>
			<Logo className='size-10' />

			<NavigationMenu className=''>
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

			<div className='inline-flex gap-2'>
				<ThemeButton className='' />

				<DropdownMenu>
					<DropdownMenuTrigger asChild className=''>
						<Button variant='outline' size='icon' className=''>
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
										<Settings />
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
									<DropdownMenuItem className='capitalize'>
										<Settings />
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
