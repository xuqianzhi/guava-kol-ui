'use client';

import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';

import MerchantList from '@/components/homepage/merchant_list.component';
import MerchantSelected from '@/components/homepage/merchant_selected.component';

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
 * Component that decides whether to show merchant list or individual merchant page
 */
const PageContent = () => {
    const searchParams = useSearchParams();
    const storeIdentifier = searchParams.get('store');

    // If no store identifier, show merchant list
    if (!storeIdentifier) {
        return <MerchantList />;
    }

    // If store identifier exists, show individual merchant page
    return <MerchantSelected />;
};

/**
 * The main page component that renders the appropriate component based on search params.
 *
 * @returns {JSX.Element} The rendered component.
 */
const Page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <PageContent />
        </Suspense>
    );
};

export default Page;
