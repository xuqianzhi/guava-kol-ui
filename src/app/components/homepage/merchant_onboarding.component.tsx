'use client';

import { useState } from 'react';

import Link from 'next/link';

import { API_BASE_URL } from '@/common/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york-v4/ui/select';
import { Textarea } from '@/registry/new-york-v4/ui/textarea';
import { getTranslations } from '@/translations';

const MerchantOnboarding: React.FC = () => {
    const { language } = useLanguage();
    const t = getTranslations(language);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        description: '',
        industry: '',
        phone: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/store_pending_merchant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    address: formData.address.trim(),
                    description: formData.description.trim(),
                    industry: formData.industry,
                    phone: formData.phone.trim()
                })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitted(true);

                // Reset form after successful submission
                setTimeout(() => {
                    setFormData({
                        name: '',
                        email: '',
                        address: '',
                        description: '',
                        industry: '',
                        phone: ''
                    });
                    setSubmitted(false);
                }, 3000);
            } else {
                setError(result.message || t.onboardingErrorDefault);
            }
        } catch (error) {
            console.error('Error submitting merchant application:', error);
            setError(t.onboardingErrorNetwork);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = () => {
        return Object.values(formData).every((value) => value.trim() !== '');
    };

    return (
        <main className='mx-auto mt-6 flex max-w-4xl flex-col justify-center gap-6 px-3 pb-8 font-[family-name:var(--font-geist-sans)] sm:mt-3 sm:gap-12 sm:px-0'>
            {/* Header with Back Button */}
            <div className='flex w-full items-center justify-between'>
                <Link href='/'>
                    <Button variant='outline' className='flex items-center gap-2'>
                        <svg
                            className='h-4 w-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                        </svg>
                        {t.backToMerchants}
                    </Button>
                </Link>
            </div>

            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-center text-2xl font-bold'>{t.merchantOnboardingTitle}</CardTitle>
                    <CardDescription className='text-center'>{t.merchantOnboardingDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    {submitted ? (
                        <div className='py-8 text-center'>
                            <div className='rounded-lg border border-green-300 bg-green-100 p-6'>
                                <h3 className='mb-2 text-lg font-semibold text-green-800'>
                                    {t.applicationSubmittedTitle}
                                </h3>
                                <p className='text-green-700'>{t.applicationSubmittedDescription}</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className='space-y-6'>
                            {/* Error message */}
                            {error && (
                                <div className='rounded-lg border border-red-300 bg-red-100 p-4'>
                                    <p className='text-sm font-medium text-red-800'>{error}</p>
                                </div>
                            )}

                            {/* Business Name */}
                            <div className='space-y-2'>
                                <Label htmlFor='name' className='text-sm font-medium'>
                                    {t.businessName} <span className='text-red-500'>{t.required}</span>
                                </Label>
                                <Input
                                    id='name'
                                    type='text'
                                    placeholder={t.businessNamePlaceholder}
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className='space-y-2'>
                                <Label htmlFor='email' className='text-sm font-medium'>
                                    {t.businessEmail} <span className='text-red-500'>{t.required}</span>
                                </Label>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder={t.businessEmailPlaceholder}
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div className='space-y-2'>
                                <Label htmlFor='phone' className='text-sm font-medium'>
                                    {t.phoneNumber} <span className='text-red-500'>{t.required}</span>
                                </Label>
                                <Input
                                    id='phone'
                                    type='tel'
                                    placeholder={t.phoneNumberPlaceholder}
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div className='space-y-2'>
                                <Label htmlFor='address' className='text-sm font-medium'>
                                    {t.businessAddress} <span className='text-red-500'>{t.required}</span>
                                </Label>
                                <Input
                                    id='address'
                                    type='text'
                                    placeholder={t.businessAddressPlaceholder}
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    required
                                />
                            </div>

                            {/* Industry */}
                            <div className='space-y-2'>
                                <Label htmlFor='industry' className='text-sm font-medium'>
                                    {t.industry} <span className='text-red-500'>{t.required}</span>
                                </Label>
                                <Select onValueChange={(value) => handleInputChange('industry', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t.selectYourIndustry} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='restaurant'>Restaurant</SelectItem>
                                        <SelectItem value='retail'>Retail</SelectItem>
                                        <SelectItem value='service'>Services</SelectItem>
                                        <SelectItem value='healthcare'>Healthcare</SelectItem>
                                        <SelectItem value='technology'>Technology</SelectItem>
                                        <SelectItem value='automotive'>Automotive</SelectItem>
                                        <SelectItem value='real-estate'>Real Estate</SelectItem>
                                        <SelectItem value='other'>Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Description */}
                            <div className='space-y-2'>
                                <Label htmlFor='description' className='text-sm font-medium'>
                                    {t.businessDescription} <span className='text-red-500'>{t.required}</span>
                                </Label>
                                <Textarea
                                    id='description'
                                    placeholder={t.businessDescriptionPlaceholder}
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    rows={4}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className='pt-6'>
                                <Button
                                    type='submit'
                                    className='w-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
                                    disabled={!isFormValid() || isSubmitting}>
                                    {isSubmitting ? t.submittingApplication : t.submitOnboardingRequest}
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </main>
    );
};

export default MerchantOnboarding;
