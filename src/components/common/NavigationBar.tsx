'use client';

import { ReactNode } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import LanguageSwitch from '@/components/common/LanguageSwitch';
import { Button } from '@/registry/new-york-v4/ui/button';

// import NavigationLinks from '@/app/components/NavigationLinks';
// import ThemeSwitch from '@/app/components/ThemeSwitch';

interface NavigationBarProps {
    // Optional props for direct configuration (will override automatic path-based config)
    rightComponent?: ReactNode;
    sticky?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ rightComponent, sticky }) => {
    // Get the current pathname and normalize it by removing trailing slashes
    const pathname = usePathname();
    const normalizedPath = pathname?.endsWith('/') ? pathname.slice(0, -1) : pathname;

    // Determine if current path is the merchant-demo path
    const isMerchantDemo = normalizedPath === '/merchant-demo';

    // Use provided props or determine from path
    const isSticky = sticky !== undefined ? sticky : isMerchantDemo;

    // Create CTA button for merchant-demo route if no custom rightComponent is provided
    const ctaButton =
        rightComponent ||
        (isMerchantDemo ? (
            <Link href='/merchant-onboard'>
                <Button className='bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700'>
                    Use Guava AI Now!
                </Button>
            </Link>
        ) : undefined);
    return (
        <div
            className={`mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-6 px-3 sm:flex-row sm:px-0 ${isSticky ? 'bg-background sticky top-0 z-50 py-3 shadow-sm' : 'mt-3 lg:mt-6'}`}>
            {/* <NavigationLinks /> */}
            <div className='flex w-full justify-between gap-6 sm:w-auto sm:items-center'>
                <div className='flex gap-3'>
                    {/* <ThemeSwitch /> */}
                    <LanguageSwitch />
                </div>
            </div>
            {ctaButton && <div className='flex items-center'>{ctaButton}</div>}
        </div>
    );
};

export default NavigationBar;
