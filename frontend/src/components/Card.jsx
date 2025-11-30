import React from 'react';
import { cn } from '../utils/cn';

const Card = ({ children, className, ...props }) => {
    return (
        <div
            className={cn(
                'bg-white rounded-xl shadow-sm border border-gray-100 p-6',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
