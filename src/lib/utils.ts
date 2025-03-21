import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function textToURL(text: string) {
	return text
		.replace(/ /g, '-')
		.toLocaleLowerCase()
		.normalize('NFD') // Convert to decomposed form
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
		.replace(/đ/g, 'd') // Replace 'đ' with 'd'
		.replace(/Đ/g, 'D') // Replace 'Đ' with 'D',
		.replace(/[^a-zA-Z0-9-]/g, '');
}

export function handleGoToSection(section: string) {
	document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
}

export function handleInspect() {
	document.addEventListener('contextmenu', (event) => event.preventDefault());
	document.addEventListener('keydown', (event) => {
		if (
			event.key === 'F12' ||
			(event.ctrlKey &&
				event.shiftKey &&
				(event.key === 'I' || event.key === 'J' || event.key === 'C')) ||
			(event.ctrlKey && event.key === 'U')
		) {
			event.preventDefault();
		}
	});
	setInterval(() => {
		if (
			window.outerWidth - window.innerWidth > 160 ||
			window.outerHeight - window.innerHeight > 160
		) {
			alert('DevTools is open. Please close it.');
			window.location.reload();
		}
	}, 1000);
}

export function makeURL(short: string): string {
	// if (short) return '';

	return `${window.location.origin}/${short}`;
}
