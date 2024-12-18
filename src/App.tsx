import Header from './components/header.component';
import { ThemeProvider } from './components/theme-provider.component';
import ShortenURL from './pages/shortenURL.page';

import './index.css'
import Footer from './components/footer.component';

export default function App() {
	return (
		<>
			<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
				<div className='container mx-auto flex flex-col justify-between min-h-screen'>
					<Header />
          <ShortenURL />
          <Footer/>
				</div>
			</ThemeProvider>
		</>
	);
}
