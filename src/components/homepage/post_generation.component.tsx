'use client';

import React, { useState } from 'react';

import { API_BASE_URL, Language, SocialMediaPostResponse } from '@/common/constants';
import { Spinner } from '@/components/common/Spinner';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/registry/new-york-v4/ui/accordion';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';
import { Textarea } from '@/registry/new-york-v4/ui/textarea';
import { getMealExperienceOptions, getMealQuestions, getTranslations } from '@/translations';

interface Dish {
    id: number;
    dishName: string;
    dishRating: string;
    dishReview: string;
}

interface PostGenerationProps {
    restaurantName: string;
    initialDishes?: Dish[];
}

export const PostGeneration: React.FC<PostGenerationProps> = ({ restaurantName, initialDishes }) => {
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

        // Set default selections using the keys from mealOptions
        const englishOptions = getMealExperienceOptions(Language.ENGLISH);
        initial['paceWait'] =
            Object.keys(englishOptions.paceWait).find((key) => englishOptions.paceWait[key] === '10–20 min') || '';
        initial['serviceFeel'] =
            Object.keys(englishOptions.serviceFeel).find(
                (key) => englishOptions.serviceFeel[key] === 'Super friendly'
            ) || '';
        initial['value'] =
            Object.keys(englishOptions.value).find((key) => englishOptions.value[key] === 'Great value') || '';

        return initial;
    };

    const [dishes, setDishes] = useState<Dish[]>(
        initialDishes || [{ id: 1, dishName: '', dishRating: '', dishReview: '' }]
    );
    // Start with all initial dishes expanded, or just the first one if there are no initial dishes
    const [expandedItems, setExpandedItems] = useState(
        initialDishes ? initialDishes.map((dish) => `dish-${dish.id}`) : ['dish-1']
    );
    const [socialMediaPostResponse, setSocialMediaPostResponse] = useState<SocialMediaPostResponse | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copyNotification, setCopyNotification] = useState(false);
    const [generationLanguage, setGenerationLanguage] = useState<Language>(Language.ENGLISH);

    // Meal experience state - single dict
    const [mealExperience, setMealExperience] = useState<{ [key: string]: string }>(initializeMealExperience());

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
            window.open('xhsdiscover://post', '_blank');
        } else {
            window.open('https://xiaohongshu.com', '_blank');
        }
    };

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
        // Transform dining experience values to the generation language
        const transformedDiningExperience: { [key: string]: string } = {};
        Object.entries(mealExperience).forEach(([questionKey, englishValue]) => {
            if (englishValue && generationLanguage === Language.CHINESE) {
                // Convert English value to Chinese using meal options mapping
                const chineseValue = mealOptions[questionKey]?.[englishValue];
                transformedDiningExperience[questionKey] = chineseValue || englishValue;
            } else {
                transformedDiningExperience[questionKey] = englishValue;
            }
        });

        const requestBody = {
            restaurant_name: restaurantName,
            dishes: validDishes.map((dish) => ({
                name: dish.dishName.trim(),
                rating: parseInt(dish.dishRating.trim()),
                review: dish.dishReview.trim()
            })),
            dining_experience: transformedDiningExperience
        };

        try {
            // Show loading state
            setIsSubmitting(true);

            console.log('Submitting data:', requestBody);

            // Make the POST request to the appropriate endpoint based on generation language
            const endpoint =
                generationLanguage === Language.CHINESE
                    ? 'generate_chinese_social_media_post'
                    : 'generate_social_media_post';
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

                // Auto-scroll to bottom after the post is generated
                setTimeout(() => {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 100);
            } else {
                alert(t.errorGenerating);
                console.error('API error:', result);
            }
        } catch (error) {
            alert(t.errorSubmitting);
            console.error('Network error:', error);
        } finally {
            // Reset loading state
            setIsSubmitting(false);
        }
    };

    return (
        <div className='space-y-6'>
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

            {/* Separator */}
            <hr className='border-t border-gray-200' />

            {/* Dishes Section */}
            <div className='space-y-4'>
                <h3 className='text-xl font-bold'>{t.whatDishesYouOrdered}</h3>
                <Accordion type='multiple' className='w-full' value={expandedItems} onValueChange={setExpandedItems}>
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
                                          <div>
                                              <Label htmlFor={`dishName-${dish.id}`} className='text-sm font-medium'>
                                                  {t.dishName} <span className='text-red-500'>{t.required}</span>
                                              </Label>
                                              <Input
                                                  id={`dishName-${dish.id}`}
                                                  placeholder={t.dishNamePlaceholder}
                                                  value={dish.dishName}
                                                  onChange={(e) => updateDish(dish.id, 'dishName', e.target.value)}
                                                  className='mt-1'
                                              />
                                          </div>
                                          <div>
                                              <Label htmlFor={`dishRating-${dish.id}`} className='text-sm font-medium'>
                                                  {t.rating} <span className='text-red-500'>{t.required}</span>
                                              </Label>
                                              <Input
                                                  id={`dishRating-${dish.id}`}
                                                  type='number'
                                                  min='1'
                                                  max='10'
                                                  placeholder={t.ratingPlaceholder}
                                                  value={dish.dishRating}
                                                  onChange={(e) => updateDish(dish.id, 'dishRating', e.target.value)}
                                                  className='mt-1'
                                              />
                                          </div>
                                          <div>
                                              <Label htmlFor={`dishReview-${dish.id}`} className='text-sm font-medium'>
                                                  {t.review} <span className='text-red-500'>{t.required}</span>
                                              </Label>
                                              <Textarea
                                                  id={`dishReview-${dish.id}`}
                                                  placeholder={t.reviewPlaceholder}
                                                  value={dish.dishReview}
                                                  onChange={(e) => updateDish(dish.id, 'dishReview', e.target.value)}
                                                  rows={3}
                                                  className='mt-1'
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

            {/* Separator */}
            <hr className='border-t border-gray-200' />

            {/* Generation Language Selector */}
            <div className='space-y-3'>
                <Label className='text-lg font-semibold'>
                    {t.generationLanguage} <span className='text-red-500'>{t.required}</span>
                </Label>
                <p className='text-sm text-gray-600'>{t.selectGenerationLanguage}</p>
                <div className='flex flex-wrap gap-2'>
                    <Badge
                        variant={generationLanguage === Language.ENGLISH ? 'default' : 'outline'}
                        className='cursor-pointer px-3 py-2 text-sm hover:bg-gray-100'
                        onClick={() => setGenerationLanguage(Language.ENGLISH)}>
                        {t.generateInEnglish}
                    </Badge>
                    <Badge
                        variant={generationLanguage === Language.CHINESE ? 'default' : 'outline'}
                        className='cursor-pointer px-3 py-2 text-sm hover:bg-gray-100'
                        onClick={() => setGenerationLanguage(Language.CHINESE)}>
                        {t.generateInChinese}
                    </Badge>
                </div>
            </div>

            <div className='pt-4'>
                <div className='space-y-3'>
                    {isSubmitting && <Spinner size='md' text={t.submitting} />}
                    <Button
                        onClick={handleSubmit}
                        className='w-full border-0 !bg-green-600 text-white hover:!bg-green-700 disabled:cursor-not-allowed disabled:opacity-50'
                        variant='default'
                        data-submit-button
                        disabled={isSubmitted || isSubmitting}>
                        {isSubmitted ? t.postGenerated : t.generatePost}
                    </Button>
                </div>
            </div>

            {/* Social Media Post Display */}
            {socialMediaPostResponse && (
                <div className='mt-6 space-y-4 border-t border-gray-200 pt-6'>
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
                                    <p className='text-sm font-medium text-green-800'>{t.postCopiedToClipboard}</p>
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
        </div>
    );
};

export default PostGeneration;
