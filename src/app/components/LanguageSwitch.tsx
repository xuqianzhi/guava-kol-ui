'use client';

import { JSX, useEffect, useState } from 'react';

import { Language } from '@/common/constants';
import { useLanguage } from '@/contexts/LanguageContext';

// Define the type for each switch option
interface SwitchOption {
    name: string;
    value: Language;
    iconSvg: JSX.Element;
}

// Define the data with type annotations
const SWITCH_DATA: SwitchOption[] = [
    {
        name: 'EN',
        value: Language.ENGLISH,
        iconSvg: (
            <svg xmlns='http://www.w3.org/2000/svg' className='size-4' viewBox='0 0 24 24'>
                <path
                    fill='currentColor'
                    d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.89-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z'
                />
            </svg>
        )
    },
    {
        name: '中文',
        value: Language.CHINESE,
        iconSvg: (
            <svg xmlns='http://www.w3.org/2000/svg' className='size-4' viewBox='0 0 24 24'>
                <path
                    fill='currentColor'
                    d='M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z'
                />
            </svg>
        )
    }
];

const LanguageSwitch: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <div className='w-fit'>
            <div className='flex w-auto flex-row justify-center overflow-hidden rounded-3xl border border-neutral-200 sm:flex-row dark:border-neutral-700'>
                {SWITCH_DATA.map((data) => (
                    <button
                        key={data.value}
                        className={`flex items-center gap-2 px-4 py-2 text-black dark:text-white ${
                            language === data.value && mounted ? 'bg-neutral-200 dark:bg-neutral-700' : 'bg-transparent'
                        } dark:hover:bg-neutral-800`}
                        onClick={() => {
                            console.log('Language:', data.value);
                            setLanguage(data.value);
                        }}>
                        {data.iconSvg}
                        <h3 className='hidden sm:block'>{data.name}</h3>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitch;
