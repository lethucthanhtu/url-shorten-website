import {
	CircleUserRound,
	Cloud,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Settings,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import Google from '@/assets/svg/Google.svg';
import { useUser } from '@/hooks/useUser';

export function UserMenu() {
	const { user, setUser, handleLogout } = useUser();

	const onLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			try {
				// Fetch user info from Google API
				const { data } = await axios.get(
					'https://www.googleapis.com/oauth2/v1/userinfo',
					{
						headers: {
							Authorization: `Bearer ${tokenResponse.access_token}`,
						},
					}
				);
				setUser(data);
				localStorage.setItem('user', JSON.stringify(data)); // Persist user data
				localStorage.setItem('token', JSON.stringify(tokenResponse)); // Persist user data
				console.log('User Info:', data);
				console.log('User Info:', tokenResponse);
			} catch (err) {
				console.error('Failed to fetch user info:', err);
			}
		},
		onError: (error) => {
			console.error('Login Failed:', error);
		},
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' className='rounded'>
					{user ? (
						<>
							<img
								src={user?.picture}
								alt='user picture'
								className='size-7 rounded-full border border-black dark:border-white p-0.5'
							/>
							{user?.name}
						</>
					) : (
						<>
							<CircleUserRound />
							<span>Guest</span>
						</>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{user?.email || 'Guest'}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Settings />
						<span>Settings</span>
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Keyboard />
						<span>Keyboard shortcuts</span>
						<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Github />
					<span>GitHub</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<LifeBuoy />
					<span>Support</span>
				</DropdownMenuItem>
				<DropdownMenuItem disabled>
					<Cloud />
					<span>API</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					{user ? (
						<Button variant='ghost' onClick={handleLogout}>
							<LogOut />
							<span>Log Out</span>
						</Button>
					) : (
						<Button
							variant='ghost'
							size='sm'
							className='flex justify-between items-center gap-4'
							onClick={() => {
								onLogin();
							}}
						>
							<img src={Google} />
							<span>Sign In To Google</span>
						</Button>
					)}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
