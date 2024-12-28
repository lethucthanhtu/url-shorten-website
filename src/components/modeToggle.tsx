import { CircleCheck, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Theme, themeKey, useTheme } from '@/context/ThemeContext';

export function ModeToggle() {
	const { setTheme } = useTheme();

	const MODE: Theme[] = ['light', 'dark', 'system'];
	const currentTheme = localStorage.getItem(themeKey) as Theme;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<Sun className='size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{MODE.map((mode) => (
					<DropdownMenuItem onClick={() => setTheme(mode)} key={mode}>
						<span className='capitalize'>{mode}</span>
						{currentTheme === mode && (
							<DropdownMenuShortcut>
								<CircleCheck className='text-green-600 dark:text-green-500 size-4 animate-pulse' />
							</DropdownMenuShortcut>
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
