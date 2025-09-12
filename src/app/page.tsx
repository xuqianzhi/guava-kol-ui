import { Suspense } from 'react';

import HomePage from '@/app/HomePage';

/**
 * Loading component for the suspense fallback
 */
const Loading = () => (
    <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
            <div className='mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900'></div>
            <p>Loading...</p>
        </div>
    </div>
);

/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
const Page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <HomePage />
        </Suspense>
    );
};

export default Page;
