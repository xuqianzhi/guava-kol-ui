'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { API_BASE_URL, GetMerchantsResponse, Language, SocialMediaPostResponse } from '@/common/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/registry/new-york-v4/ui/accordion';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';
import { Textarea } from '@/registry/new-york-v4/ui/textarea';
import { getMealExperienceOptions, getMealQuestions, getTranslations } from '@/translations';

const HomePage: React.FC = () => {
    const { language } = useLanguage();
    const t = getTranslations(language);
    const mealOptions = getMealExperienceOptions(language);
    const mealQuestions = getMealQuestions(language);

    // Initialize meal experience state from questions
    const initializeMealExperience = () => {
        const initial: { [key: string]: string } = {};
        Object.keys(mealQuestions).forEach((key) => {
            initial[key] = '';
        });

        return initial;
    };

    const [dishes, setDishes] = useState([{ id: 1, dishName: '', dishRating: '', dishReview: '' }]);
    const [expandedItems, setExpandedItems] = useState(['dish-1']); // Start with first item expanded
    const [merchantData, setMerchantData] = useState<GetMerchantsResponse | null>(null);
    const [merchantError, setMerchantError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [socialMediaPostResponse, setSocialMediaPostResponse] = useState<SocialMediaPostResponse | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [copyNotification, setCopyNotification] = useState(false);

    // Meal experience state - single dict
    const [mealExperience, setMealExperience] = useState<{ [key: string]: string }>(initializeMealExperience());

    const searchParams = useSearchParams();
    const storeIdentifier = searchParams.get('store');

    // Helper function for handling single select (all questions are now single select)
    const handleMealExperienceSelect = (questionKey: string, value: string) => {
        setMealExperience((prev) => ({
            ...prev,
            [questionKey]: prev[questionKey] === value ? '' : value
        }));
    };

    // Copy to clipboard function
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopyNotification(true);
            setTimeout(() => setCopyNotification(false), 3000); // Hide notification after 3 seconds
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            alert(t.failedToCopy);
        }
    };

    // Open Instagram function
    const openInstagram = () => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            window.open('instagram-stories://share', '_blank');
        } else {
            window.open('https://www.instagram.com/', '_blank');
        }
    };

    // Open TikTok function
    const openTikTok = () => {
        window.open('https://www.tiktok.com/', '_blank');
    };

    // Open RedNote function
    const openRedNote = () => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            window.open('xhsdisccover://post', '_blank');
        } else {
            window.open('https://xiaohongshu.com', '_blank');
        }
    }; // Fetch merchant data on component mount
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

    const addDish = () => {
        const newId = dishes.length > 0 ? Math.max(...dishes.map((d) => d.id)) + 1 : 1;
        const newDish = { id: newId, dishName: '', dishRating: '', dishReview: '' };
        setDishes([...dishes, newDish]);
        // Collapse all and expand only the new dish
        setExpandedItems([`dish-${newId}`]);
    };

    // Check if the last dish is completely filled
    const isLastDishComplete = () => {
        if (dishes.length === 0) return false;
        const lastDish = dishes[dishes.length - 1];

        return lastDish.dishName.trim() && lastDish.dishRating.trim() && lastDish.dishReview.trim();
    };

    const updateDish = (id: number, field: string, value: string) => {
        setDishes(dishes.map((dish) => (dish.id === id ? { ...dish, [field]: value } : dish)));
    };

    const removeDish = (id: number) => {
        if (dishes.length > 1) {
            const newDishes = dishes.filter((dish) => dish.id !== id);
            setDishes(newDishes);
            // Remove the deleted item from expanded items and expand the first remaining item if none are expanded
            const newExpandedItems = expandedItems.filter((item) => item !== `dish-${id}`);
            if (newExpandedItems.length === 0 && newDishes.length > 0) {
                setExpandedItems([`dish-${newDishes[0].id}`]);
            } else {
                setExpandedItems(newExpandedItems);
            }
        }
    };

    const handleSubmit = async () => {
        // Check if all meal experience questions are answered
        const unansweredQuestions = Object.entries(mealQuestions).filter(
            ([questionKey]) => !mealExperience[questionKey] || mealExperience[questionKey].trim() === ''
        );

        if (unansweredQuestions.length > 0) {
            const questionLabels = unansweredQuestions.map(([, questionData]) => questionData.label).join(', ');
            alert(`${t.pleaseAnswerAllQuestions} ${questionLabels}`);

            return;
        }

        // Check if all dishes have complete information
        const validDishes = dishes.filter(
            (dish) => dish.dishName.trim() && dish.dishRating.trim() && dish.dishReview.trim()
        );

        if (validDishes.length === 0) {
            alert(t.fillOutOneDish);

            return;
        }

        // Check if any dish is incomplete
        const incompleteDishes = dishes.filter(
            (dish) => !dish.dishName.trim() || !dish.dishRating.trim() || !dish.dishReview.trim()
        );

        if (incompleteDishes.length > 0) {
            alert(t.completeAllDishes);

            return;
        }

        // Prepare the data for the API call
        // Transform dining experience values to the current language
        const transformedDiningExperience: { [key: string]: string } = {};
        Object.entries(mealExperience).forEach(([questionKey, englishValue]) => {
            if (englishValue && language === Language.CHINESE) {
                // Convert English value to Chinese using meal options mapping
                const chineseValue = mealOptions[questionKey]?.[englishValue];
                transformedDiningExperience[questionKey] = chineseValue || englishValue;
            } else {
                transformedDiningExperience[questionKey] = englishValue;
            }
        });

        const requestBody = {
            restaurant_name: merchantData?.merchants?.[0]?.name || 'Restaurant',
            dishes: validDishes.map((dish) => ({
                name: dish.dishName.trim(),
                rating: parseInt(dish.dishRating.trim()),
                review: dish.dishReview.trim()
            })),
            dining_experience: transformedDiningExperience
        };

        try {
            // Show loading state
            const originalButton = document.querySelector('[data-submit-button]') as HTMLButtonElement;
            if (originalButton) {
                originalButton.textContent = t.submitting;
                originalButton.disabled = true;
            }

            console.log('Submitting data:', requestBody);

            // Make the POST request to the appropriate endpoint based on language
            const endpoint =
                language === Language.CHINESE ? 'generate_chinese_social_media_post' : 'generate_social_media_post';
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const result: SocialMediaPostResponse = await response.json();

            if (response.ok && result.success) {
                setSocialMediaPostResponse(result);
                setIsSubmitted(true);

                alert(`${t.successfullyGenerated} (${result.character_count} ${t.characters})`);
                console.log('API response:', result);
            } else {
                alert(t.errorGenerating);
                console.error('API error:', result);
            }
        } catch (error) {
            alert(t.errorSubmitting);
            console.error('Network error:', error);
        } finally {
            // Reset button state
            const originalButton = document.querySelector('[data-submit-button]') as HTMLButtonElement;
            if (originalButton) {
                originalButton.textContent = t.submitReviews;
                originalButton.disabled = false;
            }
        }
    };

    return (
        <main className='mx-auto mt-6 flex max-w-7xl flex-col justify-center gap-6 px-3 font-[family-name:var(--font-geist-sans)] sm:mt-3 sm:gap-12 sm:px-0'>
            {/* Loading State */}
            {loading && (
                <Card className='w-full'>
                    <CardContent className='p-8 text-center'>
                        <p>{t.loadingMerchant}</p>
                    </CardContent>
                </Card>
            )}

            {/* Merchant Not Found Error */}
            {!loading && merchantError && (
                <Card className='w-full'>
                    <CardContent className='p-8 text-center'>
                        <h2 className='mb-2 text-xl font-semibold text-red-600'>{t.merchantNotFoundTitle}</h2>
                        <p className='text-gray-600'>
                            {!storeIdentifier ? t.noStoreIdentifier : t.merchantNotFoundDescription}
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Restaurant Review Section - Only show if merchant data is loaded */}
            {!loading && !merchantError && merchantData && (
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle className='text-center text-2xl font-bold'>
                            {t.reviewsTitle} {merchantData?.merchants?.[0]?.name}
                        </CardTitle>
                        <CardDescription className='text-center'>
                            {t.reviewsDescription} {merchantData?.merchants?.[0]?.name || 'this restaurant'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        {/* How was your meal Section */}
                        <div className='space-y-6'>
                            <h3 className='text-xl font-bold'>{t.howWasYourMeal}</h3>

                            {Object.entries(mealQuestions).map(([questionKey, questionData]) => (
                                <div key={questionKey} className='space-y-3'>
                                    <Label className='text-lg font-semibold'>
                                        {questionData.label} <span className='text-red-500'>{t.required}</span>
                                    </Label>
                                    <div className='flex flex-wrap gap-2'>
                                        {questionData.options.map((option: string) => (
                                            <Badge
                                                key={option}
                                                variant={mealExperience[questionKey] === option ? 'default' : 'outline'}
                                                className='cursor-pointer px-3 py-1 text-sm hover:bg-gray-100'
                                                onClick={() => handleMealExperienceSelect(questionKey, option)}>
                                                {mealOptions[questionKey]?.[option] || option}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dishes Section */}
                        <div className='space-y-4'>
                            <h3 className='text-xl font-bold'>{t.whatDishesYouOrdered}</h3>
                            <Accordion
                                type='multiple'
                                className='w-full'
                                value={expandedItems}
                                onValueChange={setExpandedItems}>
                                {dishes && dishes.length > 0
                                    ? dishes.map((dish, index) => (
                                          <AccordionItem key={dish.id} value={`dish-${dish.id}`}>
                                              <div className='flex items-center justify-between'>
                                                  <AccordionTrigger className='flex-1 hover:no-underline'>
                                                      <span className='text-lg font-semibold'>
                                                          {`${t.dish} ${index + 1}: `}
                                                          {dish.dishName}
                                                          {dish.dishRating && ` (${dish.dishRating}/10)`}
                                                      </span>
                                                  </AccordionTrigger>
                                                  {dishes.length > 1 && (
                                                      <Button
                                                          variant='ghost'
                                                          size='sm'
                                                          onClick={() => removeDish(dish.id)}
                                                          className='ml-2 text-sm text-red-500 hover:text-red-700'>
                                                          {t.remove}
                                                      </Button>
                                                  )}
                                              </div>
                                              <AccordionContent className='space-y-4 pt-4'>
                                                  <div className='grid gap-4'>
                                                      <div className='space-y-2'>
                                                          <Label htmlFor={`dishName-${dish.id}`} className='text-sm'>
                                                              {t.dishName}{' '}
                                                              <span className='text-red-500'>{t.required}</span>
                                                          </Label>
                                                          <Input
                                                              id={`dishName-${dish.id}`}
                                                              placeholder={t.dishNamePlaceholder}
                                                              value={dish.dishName}
                                                              onChange={(e) =>
                                                                  updateDish(dish.id, 'dishName', e.target.value)
                                                              }
                                                              required
                                                          />
                                                      </div>
                                                      <div className='space-y-2'>
                                                          <Label htmlFor={`dishRating-${dish.id}`} className='text-sm'>
                                                              {t.rating}{' '}
                                                              <span className='text-red-500'>{t.required}</span>
                                                          </Label>
                                                          <Input
                                                              id={`dishRating-${dish.id}`}
                                                              type='number'
                                                              min='1'
                                                              max='10'
                                                              placeholder={t.ratingPlaceholder}
                                                              value={dish.dishRating}
                                                              onChange={(e) => {
                                                                  const value = e.target.value;
                                                                  if (
                                                                      value === '' ||
                                                                      (Number(value) >= 1 && Number(value) <= 10)
                                                                  ) {
                                                                      updateDish(dish.id, 'dishRating', value);
                                                                  }
                                                              }}
                                                              required
                                                          />
                                                      </div>
                                                      <div className='space-y-2'>
                                                          <Label htmlFor={`dishReview-${dish.id}`} className='text-sm'>
                                                              {t.review}{' '}
                                                              <span className='text-red-500'>{t.required}</span>
                                                          </Label>
                                                          <Textarea
                                                              id={`dishReview-${dish.id}`}
                                                              placeholder={t.reviewPlaceholder}
                                                              value={dish.dishReview}
                                                              onChange={(e) =>
                                                                  updateDish(dish.id, 'dishReview', e.target.value)
                                                              }
                                                              rows={3}
                                                              required
                                                          />
                                                      </div>
                                                  </div>
                                              </AccordionContent>
                                          </AccordionItem>
                                      ))
                                    : null}
                            </Accordion>

                            <div className='pt-4'>
                                <div className='flex justify-start' style={{ marginBottom: '12px' }}>
                                    <Button
                                        onClick={addDish}
                                        variant='outline'
                                        disabled={!isLastDishComplete()}
                                        className='text-sm'>
                                        {t.addAnotherDish}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className='pt-4'>
                            <Button
                                onClick={handleSubmit}
                                className='w-full border-0 !bg-green-600 text-white hover:!bg-green-700 disabled:cursor-not-allowed disabled:opacity-50'
                                variant='default'
                                data-submit-button
                                disabled={isSubmitted}>
                                {isSubmitted ? t.postGenerated : t.generatePost}
                            </Button>
                        </div>

                        {/* Social Media Post Display */}
                        {socialMediaPostResponse && (
                            <div className='mt-6 space-y-4 border-t pt-6'>
                                <div className='space-y-3'>
                                    <h3 className='text-lg font-semibold text-black'>{t.generatedSocialMediaPost}</h3>

                                    <div className='rounded-lg border bg-white p-4'>
                                        <p className='text-sm leading-relaxed whitespace-pre-wrap text-black'>
                                            {socialMediaPostResponse.social_media_post}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between text-sm text-black'>
                                        <span>
                                            {t.characterCount}: {socialMediaPostResponse.character_count}
                                        </span>
                                    </div>

                                    {/* Action buttons */}
                                    <div className='flex flex-col gap-3 pt-4'>
                                        {/* Copy notification */}
                                        {copyNotification && (
                                            <div className='rounded-lg border border-green-300 bg-green-100 p-3'>
                                                <p className='text-sm font-medium text-green-800'>
                                                    {t.postCopiedToClipboard}
                                                </p>
                                            </div>
                                        )}
                                        <Button
                                            onClick={() => copyToClipboard(socialMediaPostResponse.social_media_post)}
                                            variant='outline'
                                            className='text-sm'>
                                            {t.copyToClipboard}
                                        </Button>
                                        <Button
                                            onClick={openInstagram}
                                            className='border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-sm text-white hover:from-purple-600 hover:to-pink-600'>
                                            {t.makeInstagramPost}
                                        </Button>
                                        <Button
                                            onClick={openTikTok}
                                            className='border-0 bg-black text-sm text-white transition-colors duration-200 hover:bg-gray-800'>
                                            {t.makeTikTokPost}
                                        </Button>
                                        <Button
                                            onClick={openRedNote}
                                            className='border-0 bg-red-500 text-sm text-white transition-colors duration-200 hover:bg-red-600'>
                                            {t.makeRedNotePost}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </main>
    );
};

export default HomePage;
