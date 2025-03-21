import { useState } from 'react';
import { toast } from 'sonner';

const useFetch = <T>(
	cb: (options: object, ...args: unknown[]) => Promise<T>,
	options: object = {}
) => {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fn = async (...args: unknown[]): Promise<T | undefined | void> => {
		setLoading(true);
		setError(null);
		try {
			const response = await cb(options, ...args);
			setData(response);
			setError(null);
			return response;
		} catch (error) {
			setError(error as Error);
			toast('Error', { description: (error as Error).message });
			return undefined;
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, fn };
};

export default useFetch;
