/* eslint-disable @typescript-eslint/no-unused-vars */
import { localeKey } from '@/components/localeButton';
import NotFound from '@/components/notFound';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/(legacy)/_locale/$locale')({
	component: RouteComponent,
	notFoundComponent: NotFound,
});

function RouteComponent() {
	const { locale } = Route.useParams();

	// const navigate = useNavigate();

	// // Check support locale
	// if (locale !== 'vn' && locale !== 'en')
	// 	navigate({
	// 		to: '/$locale',
	// 		params: { locale: localStorage.getItem(localeKey) || 'vn' },
	// 		replace: true,
	// 	});
	// else if (locale !== localStorage.getItem(localeKey)) {
	// 	localStorage.setItem(localeKey, locale);
	// 	window.location.reload();
	// }

	// Inject Google translate API
	useEffect(() => {
		const GoogleTranslateScript = document.createElement('script');

		GoogleTranslateScript.setAttribute(
			'src',
			'//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
		);

		document.body.appendChild(GoogleTranslateScript);

		// @ts-expect-error: google.translate.TranslateElement is not typed
		window.googleTranslateElementInit = () => {
			// @ts-expect-error: google.translate.TranslateElement is not typed
			new window.google.translate.TranslateElement(
				{
					pageLanguage: 'vi',
					includedLanguages: locale,
					autoDisplay: true,
				},
				'google_translate_element'
			);
		};

		// Cleanup script on unmount
		return () => {
			document.body.removeChild(GoogleTranslateScript);
		};
	}, [locale]);

	return (
		<>
			<Outlet />
		</>
	);
}
