import { useLocation, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CircleCheck, Globe } from 'lucide-react';

type LocaleButtonProps = {
	className?: string;
};

export type Locale = 'vn' | 'en'; // Add other locales as needed
export const localeKey = 'locale';

export function LocaleButton({ className }: LocaleButtonProps) {
	const navigate = useNavigate();
	const location = useLocation();

	type Locales = {
		title: string;
		locale: Locale;
	};

	const LOCALES: Locales[] = [
		{
			title: 'Tiếng Việt',
			locale: 'vn',
		},
		{
			title: 'English',
			locale: 'en',
		},
	];
	const currentLocale = localStorage.getItem(localeKey) as Locale;

	const handleLocaleChange = (locale: Locale) => {
		const currentPath = location.href.replace('/vn', '').replace('/en', '');
		localStorage.setItem(localeKey, locale);
		navigate({
			to: `/$locale/${currentPath}`,
			params: { locale: locale },
			replace: true,
			reloadDocument: true,
		});
	};

	return (
		<div className={className}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='icon'>
						<Globe />
						<span className='sr-only'>Change locale</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					{LOCALES.map((locale) => (
						<DropdownMenuItem
							onClick={() => handleLocaleChange(locale.locale)}
							key={locale.locale}
						>
							<span className='noTranslate'>{locale.title}</span>
							{currentLocale === locale.locale && (
								<DropdownMenuShortcut>
									<CircleCheck className='text-green-600 dark:text-green-500 size-4 animate-pulse' />
								</DropdownMenuShortcut>
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
