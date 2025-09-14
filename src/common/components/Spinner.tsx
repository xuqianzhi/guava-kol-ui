interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    text?: string;
}

export const Spinner = ({ size = 'md', className = '', text }: SpinnerProps) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8'
    };

    return (
        <div className='flex flex-col items-center gap-3'>
            <div
                className={`animate-spin rounded-full border-2 border-gray-200 border-t-blue-600 ${sizeClasses[size]} ${className}`}
            />
            {text && <p className='text-center'>{text}</p>}
        </div>
    );
};

export default Spinner;
