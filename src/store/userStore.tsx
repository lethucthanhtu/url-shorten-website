import { User } from '@/types/User';
import { Store } from '@tanstack/react-store';

const storedUser = localStorage.getItem('user');
const initUser: User = storedUser
	? (JSON.parse(storedUser) as User)
	: undefined;

export const user = new Store<User>(initUser);
