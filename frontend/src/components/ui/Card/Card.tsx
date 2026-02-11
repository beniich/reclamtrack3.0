'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}
