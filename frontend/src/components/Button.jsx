import React from 'react';
import { cn } from '../utils/cn';

const Button = ({ children, className, variant = 'primary', ...props }) => {
    const variants = {
        primary: 'bg-primary text-white hover:bg-violet-700',
        secondary: 'bg-secondary text-white hover:bg-slate-700',
        outline: 'border-2 border-primary text-primary hover:bg-violet-50',
        ghost: 'text-gray-600 hover:bg-gray-100',
    };

    return (
        <button
            className={cn(
                'px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
