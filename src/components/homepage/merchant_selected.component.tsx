'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { API_BASE_URL, GetMerchantsResponse } from '@/common/constants';
import { Spinner } from '@/components/common/Spinner';
import { BackButton } from '@/components/common/back_button.component';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { getTranslations } from '@/translations';

import { PostGeneration } from './post_generation.component';

const MerchantSelected: React.FC = () => {
    const { language } = useLanguage();
    const t = getTranslations(language);

    const [merchantData, setMerchantData] = useState<GetMerchantsResponse | null>(null);
    const [merchantError, setMerchantError] = useState(false);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const storeIdentifier = searchParams.get('store');

    // Fetch merchant data on component mount
    useEffect(() => {
        const fetchMerchantData = async () => {
            if (!storeIdentifier) {
                setMerchantError(true);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/get_merchants?identifiers=${storeIdentifier}`);
                const data: GetMerchantsResponse = await response.json();

                // Check if API call was successful and merchants array exists and has data
                if (!data.success || !data.merchants || data.merchants.length !== 1) {
                    setMerchantError(true);
                } else {
                    setMerchantData(data);
                }
            } catch (error) {
                console.error('Error fetching merchant data:', error);
                setMerchantError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchMerchantData();
    }, [storeIdentifier]);

    return (
        <main className='mx-auto mt-6 flex max-w-7xl flex-col justify-center gap-3 px-3 pb-8 font-[family-name:var(--font-geist-sans)] sm:mt-3 sm:gap-6 sm:px-0 sm:pb-12'>
            {/* Header with Back Button */}
            <div className='flex w-full items-center justify-between'>
                <BackButton href='/' />
                <div className='w-20'></div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className='flex h-96 w-full items-center justify-center'>
                    <div className='text-center'>
                        <Spinner />
                        <div className='mt-4'>{t.loadingMerchant}</div>
                    </div>
                </div>
            )}

            {/* Error State */}
            {!loading && merchantError && (
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle className='text-center text-2xl font-bold'>
                            {!storeIdentifier ? t.noStoreIdentifier : t.merchantNotFoundTitle}
                        </CardTitle>
                        <CardDescription className='text-center'>{t.merchantNotFoundDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col items-center justify-center'>
                        <Link href='/'>
                            <Button variant='default' className='mt-4'>
                                Return Home
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            )}

            {/* Merchant Data State */}
            {!loading && !merchantError && merchantData && (
                <Card className='w-full'>
                    <CardHeader>
                        <CardHeader>
                            <CardTitle className='text-center text-2xl font-bold'>
                                {t.offerTitle} {merchantData?.merchants?.[0]?.name} {t.aPost}
                            </CardTitle>
                            <CardDescription className='text-center'>{t.reviewsDescription}</CardDescription>
                        </CardHeader>
                    </CardHeader>
                    <CardContent>
                        <PostGeneration restaurantName={merchantData?.merchants?.[0]?.name || 'Restaurant'} />
                    </CardContent>
                </Card>
            )}
        </main>
    );
};

export default MerchantSelected;
