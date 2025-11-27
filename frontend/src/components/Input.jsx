import React from 'react';
import { cn } from '../utils/cn';

const Input = React.forwardRef(({ label, error, className, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={cn(
                    'w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200',
                    error && 'border-red-500 focus:ring-red-200 focus:border-red-500',
                    className
                )}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
