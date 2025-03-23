import { Database } from '@/database.gen';
import supabase from '@/lib/supabase';
import { UAParser } from 'ua-parser-js';
import { Url } from '@/lib/apiUrls';
import axios from 'axios';

export type Click = Database['public']['Tables']['clicks']['Row'];

export async function getClicksForURLs(
	url_ids: Click['url_id'][]
): Promise<Click[]> {
	if (!url_ids) throw new Error('getClickURLs: URL ID is required');

	const { data: clicks, error } = await supabase
		.from('clicks')
		.select('*')
		.in('url_id', url_ids);

	if (error) throw error;

	return clicks;
}

export async function getClicksForURL(
	url_id: Click['url_id']
): Promise<Click[]> {
	if (!url_id) throw new Error('getClickURL: URL ID is required');

	const { data: clicks, error } = await supabase
		.from('clicks')
		.select('*')
		.eq('url_id', url_id);

	if (error) throw error;

	return clicks;
}

export async function getClicksDataForChart(url_id: Click['url_id']) {
	const clicks = await getClicksForURL(url_id);
	return clicks.map((click) => ({
		date: click.created_at,
		city: click.city,
		country: click.country,
		device: click.device,
	}));
}

const parser = new UAParser();

type StoreClicksProps = {
	url_id: Click['url_id'];
	original_url: Url['original_url'];
};

export const storeClicks = async ({
	url_id,
	original_url,
}: StoreClicksProps) => {

	if (!url_id) throw new Error('StoreClick: URL ID required');
	if (!original_url) throw new Error('StoreClick: Original URL required');

	const res = parser.getResult();
	const device = res.device.type || 'desktop'; // Default to desktop if type is not detected

	try {
		const response = await axios.get(
			import.meta.env.VITE_IP_API_URL || 'https://ip-api.com/json/'
		);
		const { regionName: city, country } = response.data;

		// Record the click
		await supabase.from('clicks').insert({
			url_id: url_id,
			city: city || 'unknown',
			country: country || 'unknown',
			device: device,
		});
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		// Record the click with unknown location data
		await supabase.from('clicks').insert({
			url_id: url_id,
			city: 'unknown',
			country: 'unknown',
			device: device,
		});
	}
};
