import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
};

export const Card = ({ children, className = "" }: Props) => (
    <div
        className={`bg-white dark:bg-background border border-slate-200 dark:border-border-dark rounded-xl shadow-sm ${className}`}
    >
        {children}
    </div>
);
