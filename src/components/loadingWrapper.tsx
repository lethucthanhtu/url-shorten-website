import { useTheme } from '@/contexts/ThemeContext';
import { ReactNode } from 'react';
import { BeatLoader } from 'react-spinners';

type LoadingWrapperProps = {
	loading?: boolean;
	children?: ReactNode;
};

export default function LoadingWrapper({
	loading = false,
	children,
}: LoadingWrapperProps) {
	const { currentTheme } = useTheme();

	return (
		<>
			{loading ? (
				<>
					<div className='size-full flex justify-center items-center'>
						<BeatLoader
							className=''
							color={currentTheme === 'dark' ? 'white' : 'black'}
						/>
					</div>
				</>
			) : (
				<>{children}</>
			)}
		</>
	);
}
