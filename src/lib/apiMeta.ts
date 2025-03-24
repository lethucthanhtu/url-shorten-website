import axios from 'axios';
import { load } from 'cheerio';

export async function getMetadata(url: string) {
  try {
    const response = await axios.get(url);
    const $ = load(response.data);

    return {
      title: $('meta[property="og:title"]').attr('content') || $('title').text() || '',
      description: $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '',
      image: $('meta[property="og:image"]').attr('content') || '',
      siteName: $('meta[property="og:site_name"]').attr('content') || ''
    };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}