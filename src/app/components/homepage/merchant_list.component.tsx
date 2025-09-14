'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Spinner } from '@/common/components';
import { API_BASE_URL, GetMerchantsResponse, MerchantIndustry } from '@/common/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { getTranslations } from '@/translations';

const MerchantList: React.FC = () => {
    const { language } = useLanguage();
    const t = getTranslations(language);
    const [merchants, setMerchants] = useState<GetMerchantsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMerchants = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/get_merchants`);
                const data: GetMerchantsResponse = await response.json();

                if (data.success && data.merchants) {
                    setMerchants(data);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error('Error fetching merchants:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchMerchants();
    }, []);

    // Get industry badge color
    const getIndustryColor = (industry: string) => {
        switch (industry.toLowerCase()) {
            case MerchantIndustry.RESTAURANT:
                return 'bg-orange-100 text-orange-800';
            case MerchantIndustry.RETAIL:
                return 'bg-blue-100 text-blue-800';
            case MerchantIndustry.SERVICE:
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <main className='mx-auto mt-6 flex max-w-7xl flex-col justify-center gap-6 px-3 font-[family-name:var(--font-geist-sans)] sm:mt-3 sm:gap-12 sm:px-0'>
                <Card className='w-full'>
                    <CardContent className='p-8 text-center'>
                        <Spinner size='lg' text={t.loadingMerchant} />
                    </CardContent>
                </Card>
            </main>
        );
    }

    if (error || !merchants) {
        return (
            <main className='mx-auto mt-6 flex max-w-7xl flex-col justify-center gap-6 px-3 font-[family-name:var(--font-geist-sans)] sm:mt-3 sm:gap-12 sm:px-0'>
                <Card className='w-full'>
                    <CardContent className='p-8 text-center'>
                        <h2 className='mb-2 text-xl font-semibold text-red-600'>Error Loading Merchants</h2>
                        <p className='text-gray-600'>Unable to load merchant list. Please try again later.</p>
                    </CardContent>
                </Card>
            </main>
        );
    }

    return (
        <main className='mx-auto mt-6 flex max-w-7xl flex-col justify-center gap-6 px-3 font-[family-name:var(--font-geist-sans)] sm:mt-3 sm:gap-12 sm:px-0'>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-center text-2xl font-bold'>
                        {language === 'zh' ? '商家列表' : 'Merchant Directory'}
                    </CardTitle>
                    <CardDescription className='text-center'>
                        {language === 'zh'
                            ? `选择一个商家开始评价 (${merchants.count} 个商家)`
                            : `Select a merchant to start reviewing (${merchants.count} merchants)`}
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {merchants.merchants.map((merchant) => (
                            <Link
                                key={merchant.id}
                                href={`/?store=${merchant.id}`}
                                className='block transition-transform hover:scale-105'>
                                <Card className='h-full cursor-pointer border-2 hover:border-gray-300 hover:shadow-md'>
                                    <CardHeader className='pb-2'>
                                        <div className='flex items-start justify-between'>
                                            <CardTitle className='text-lg leading-tight'>{merchant.name}</CardTitle>
                                            <Badge
                                                variant='secondary'
                                                className={`ml-2 text-xs ${getIndustryColor(merchant.industry)}`}>
                                                {merchant.industry}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className='pt-0'>
                                        <CardDescription className='mb-3 line-clamp-2'>
                                            {merchant.description}
                                        </CardDescription>
                                        <div className='space-y-1 text-xs text-gray-500'>
                                            <p className='truncate'>📍 {merchant.address}</p>
                                            <p className='truncate'>✉️ {merchant.email}</p>
                                            <p>📅 {new Date(merchant.datetime).toLocaleDateString()}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {merchants.merchants.length === 0 && (
                        <div className='py-12 text-center'>
                            <p className='text-gray-500'>{language === 'zh' ? '暂无商家' : 'No merchants available'}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    );
};

export default MerchantList;
