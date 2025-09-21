'use client';

import { BackButton } from '@/components/common/back_button.component';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { getTranslations } from '@/translations';

import { PostGeneration } from './post_generation.component';

const MerchantDemo: React.FC = () => {
    const { language } = useLanguage();
    const t = getTranslations(language);

    return (
        <main className='mx-auto mt-6 flex max-w-7xl flex-col justify-center gap-3 px-3 pb-8 font-[family-name:var(--font-geist-sans)] sm:mt-3 sm:gap-6 sm:px-0 sm:pb-12'>
            {/* Header with Back Button */}
            <div className='flex w-full items-center justify-between'>
                <BackButton href='/' />
                <div className='w-20'></div>
            </div>

            {/* Demo Restaurant Review Section */}
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-center text-2xl font-bold'>{t.demoPageTitle}</CardTitle>
                    <CardDescription className='text-center'>{t.demoPageDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <PostGeneration
                        restaurantName="Joe's Pizza"
                        initialDishes={[
                            {
                                id: 1,
                                dishName: 'Pineapple Pizza',
                                dishRating: '9',
                                dishReview: 'Surprisingly good balance with sweetness and savory'
                            },
                            {
                                id: 2,
                                dishName: 'Pepperoni pizza',
                                dishRating: '7',
                                dishReview: 'Just ordinary'
                            },
                            {
                                id: 3,
                                dishName: 'Chicken wings',
                                dishRating: '8',
                                dishReview: 'The dipping sauce is amazing!'
                            }
                        ]}
                    />
                </CardContent>
            </Card>
        </main>
    );
};

export default MerchantDemo;
