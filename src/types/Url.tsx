import { Click } from './Click';

export type URL = {
	id: string;
	original: string;
	shorten: string;
	clicks: number;
	click_chart?: Click[];
	qr?: string;
	created_date: string;
	modified_date: string;
	expire_date: string;
};
