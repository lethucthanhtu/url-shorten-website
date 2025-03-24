import axios from 'axios';
import { load } from 'cheerio';

export async function getMetadata(url: string) {
	try {
		const corsProxy = 'https://api.allorigins.win/raw?url=';
		const response = await axios.get(corsProxy + encodeURIComponent(url), {
			headers: {
				'Accept': 'text/html'
			}
		});
		const $ = load(response.data);

		return {
			title: $('meta[property="og:title"]').attr('content') ||
					$('title').text() || '',
			description: $('meta[property="og:description"]').attr('content') ||
						$('meta[name="description"]').attr('content') || '',
			image: $('meta[property="og:image"]').attr('content') || '',
			siteName: $('meta[property="og:site_name"]').attr('content') || '',
		};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
		// Return default metadata
		return {
			title: 'Link Preview',
			description: url,
			image: '',
			siteName: new URL(url).hostname
		};
	}
}
