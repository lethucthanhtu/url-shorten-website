import Header from '@/components/header';
import Footer from '@/components/footer';
import { ShortenURL } from '@/pages/home/home.page.';

import './index.css';

export default function App() {
	return (
		<>
			<div className='flex flex-col justify-between min-h-screen'>
				<Header />
				<ShortenURL />
				<Footer />
			</div>
		</>
	);
}
