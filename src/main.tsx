import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './components/theme-provider.tsx';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<ThemeProvider defaultTheme='dark'>
				<App />
			</ThemeProvider>
		</GoogleOAuthProvider>
	</StrictMode>
);
