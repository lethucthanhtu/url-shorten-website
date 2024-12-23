import Header from '@/components/header';
import Footer from '@/components/footer';
import ShortenURL from '@/pages/Home/home.page';

import './index.css';

import { useEffect, useState } from 'react';

export default function App() {
	const [, setUser] = useState(null);

	useEffect(() => {
		const savedUser = localStorage.getItem('user');
		if (savedUser) setUser(JSON.parse(savedUser)); // Restore user on page load
	}, []);

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
