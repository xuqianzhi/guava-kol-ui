'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/registry/new-york-v4/ui/button';

interface BackButtonProps {
    /**
     * The URL to navigate to when the button is clicked
     * @default '/'
     */
    href?: string;
    /**
     * Additional class names for the button
     */
    className?: string;
}

/**
 * A reusable back button component that can be used to navigate back to a previous page
 */
export const BackButton: React.FC<BackButtonProps> = ({ href = '/', className }) => {
    return (
        <Link href={href}>
            <Button variant='outline' className={cn('flex items-center gap-2', className)}>
                <svg
                    className='h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
                Back
            </Button>
        </Link>
    );
};

export default BackButton;
