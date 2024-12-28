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

import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import Google from '@/assets/svg/Google.svg';
import { useStore } from '@tanstack/react-store';
import { user } from '@/store/userStore';
import { User } from '@/types/User';

export function UserMenu() {
	// const [user, setUser] = useState<User>();
	const userStore = useStore(user, (data) => data);

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

				const userData: User = { ...data, ...tokenResponse };
				user.setState(() => userData);
				localStorage.setItem('user', JSON.stringify(userData)); // Persist user data
			} catch (err) {
				console.error('Failed to fetch user info:', err);
			}
		},
		onError: (error) => {
			console.error('Login Failed:', error);
		},
	});

	const handleLogout = () => {
		googleLogout();
		// setUser(undefined);
		user.setState(() => undefined);

		localStorage.removeItem('user');
		localStorage.removeItem('token');
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' className='rounded'>
					{userStore ? (
						<>
							<img
								src={userStore?.picture}
								alt='user picture'
								className='size-7 rounded-full border border-black dark:border-white p-0.5'
							/>
							{userStore?.name}
						</>
					) : (
						<>
							<CircleUserRound />
							<span>Guest</span>
						</>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end'>
				<DropdownMenuLabel>{userStore?.email || 'Guest'}</DropdownMenuLabel>
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
				{user.state ? (
					<DropdownMenuItem onClick={handleLogout}>
						<LogOut />
						<span>Log Out</span>
					</DropdownMenuItem>
				) : (
					<DropdownMenuItem onClick={() => onLogin()}>
						<img src={Google} className='size-4' />
						<span>Sign In To Google</span>
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
