import { Database } from '@/database.gen';
import supabase, { supabaseUrl } from '@/lib/supabase';

export type Url = Database['public']['Tables']['urls']['Row'];

export async function getURLs(
	user_id: Url['user_id'] | null | undefined
): Promise<Url[]> {
	if (!user_id) throw new Error('FetchURLs: User ID is required');

	const { data: urls, error } = await supabase
		.from('urls')
		.select('*')
		.eq('user_id', user_id);

	if (error) throw error;

	return urls;
}

export async function getUrl(
	id: Url['id'],
	user_id: Url['user_id']
): Promise<Url> {
	if (!user_id) throw new Error('FetchURL: User ID is required');

	const { data: url, error } = await supabase
		.from('urls')
		.select('*')
		.eq('id', id)
		.eq('user_id', user_id)
		.single();

	if (error) throw error;

	return url;
}

export async function getLongUrl(
	id: Url['shorten_url'] | Url['custom_url']
): Promise<Url> {
	const { data, error } = await supabase
		.from('urls')
		.select('*')
		// .eq('active', true)
		.or(`shorten_url.eq.${id},custom_url.eq.${id}`)
		.single();

	if (error) throw error;

	return data;
}

export async function getRedirectUrl(
	id: Url['shorten_url'] | Url['custom_url']
): Promise<Url> {
	const { data, error } = await supabase
		.from('urls')
		.select('*')
		.eq('active', true)
		.or(`shorten_url.eq.${id},custom_url.eq.${id}`)
		.single();

	if (error) throw new Error('Hmmmm...how did you get here?');

	return data;
}

type CreateUrlProps = {} & Pick<
	Url,
	'title' | 'original_url' | 'custom_url' | 'user_id'
>;

export async function createUrl(
	{ title, original_url, custom_url, user_id }: CreateUrlProps,
	qr_code?: File
): Promise<Url> {
	if (!user_id) throw new Error('CreateURL: User ID is required');

	if (original_url.includes(window.location.origin))
		throw new Error('Shorten the shorten URL? Nahhhhh');

	const shorten_url = Math.random().toString(36).substring(2, 8);

	let qr = null;
	if (qr_code) {
		const fileName = `qr-${shorten_url}`;

		const { error: storageError } = await supabase.storage
			.from('qrs')
			.upload(fileName, qr_code);

		if (storageError) throw storageError;

		qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;
	}

	const { data, error } = await supabase
		.from('urls')
		.insert([
			{
				title,
				user_id,
				original_url,
				custom_url: custom_url || null,
				shorten_url,
				qr,
			},
		])
		.select()
		.single();

	if (error) throw error;

	return data;
}

export async function deleteUrl(id: Url['id'] | null): Promise<void> {
	if (!id) throw new Error('URL ID is required');

	const { error } = await supabase.from('urls').delete().eq('id', id);

	if (error) throw error;

	// return data;
}

type UpdateUrlProps = {} & Pick<Url, 'title' | 'custom_url' | 'active' | 'id'>;

export async function updateUrl({
	title,
	custom_url,
	id,
	active = true,
}: UpdateUrlProps): Promise<Url> {
	if (!id) throw new Error('URL ID is required');

	const now = new Date().toISOString().replace('T', ' ').replace('Z', '+00');

	const { data: dataDuplicateShortenURL, error: errorDuplicateShortenURL } =
		await supabase
			.from('urls')
			.select('*')
			.eq('shorten_url', custom_url || '')
			.single();

	if (dataDuplicateShortenURL || errorDuplicateShortenURL)
		throw new Error('Custom URL is already taken');

	const { data, error } = await supabase
		.from('urls')
		.update({
			title,
			custom_url,
			active,
			updated_at: now,
		})
		.eq('id', id)
		.select()
		.single();

	if (error) throw error;

	return data;
}

type UpdateActiveProps = {} & Pick<Url, 'id' | 'active'>;

export async function updateActive({ id, active }: UpdateActiveProps) {
	if (!id) throw new Error('URL ID is required');

	const now = new Date().toISOString().replace('T', ' ').replace('Z', '+00');

	const { data, error } = await supabase
		.from('urls')
		.update({ active, updated_at: now })
		.eq('id', id)
		.select()
		.single();

	if (error) throw error;

	return data;
}
