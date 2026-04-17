'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';

interface TypewriterLine {
    text: string;
    className?: string;
    delayBefore?: number;
}

interface TypewriterTextProps {
    lines: TypewriterLine[];
    speed?: number; // ms per character
    className?: string;
    onComplete?: () => void;
    triggerOnce?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    lines,
    speed = 50,
    className,
    onComplete,
    triggerOnce = true
}) => {
    const containerRef = useRef<HTMLHeadingElement>(null);
    const isInView = useInView(containerRef, { once: triggerOnce, amount: 0.5 });
    const [visibleChars, setVisibleChars] = useState<number[]>(lines.map(() => 0));
    const [isComplete, setIsComplete] = useState(false);
    const hasStarted = useRef(false);

    useEffect(() => {
        if (!isInView || hasStarted.current) return;
        hasStarted.current = true;

        // Build a flat sequence of all chars with their line index
        const sequence: Array<{ lineIdx: number; delay: number }> = [];
        let accumulatedDelay = 0;

        lines.forEach((line, lineIdx) => {
            accumulatedDelay += line.delayBefore || 0;
            for (let i = 0; i < line.text.length; i++) {
                sequence.push({ lineIdx, delay: accumulatedDelay });
                accumulatedDelay += speed;
            }
        });

        // Reveal chars one by one using setTimeout
        sequence.forEach(({ lineIdx, delay }) => {
            setTimeout(() => {
                setVisibleChars(prev => {
                    const next = [...prev];
                    next[lineIdx] = next[lineIdx] + 1;
                    return next;
                });
            }, delay);
        });

        // Fire onComplete after all chars are shown
        const totalDuration = sequence.length > 0 ? sequence[sequence.length - 1].delay + speed : 0;
        setTimeout(() => {
            setIsComplete(true);
            onComplete?.();
        }, totalDuration);

    }, [isInView]);

    return (
        <h1 ref={containerRef} className={cn('relative', className)}>
            {lines.map((line, lineIdx) => (
                <div key={lineIdx} className={cn('block', line.className)}>
                    {line.text.split('').map((char, charIdx) => (
                        <span
                            key={charIdx}
                            className="inline-block whitespace-pre"
                            style={{
                                opacity: charIdx < visibleChars[lineIdx] ? 1 : 0,
                                transition: `opacity ${speed * 0.5}ms ease`,
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            ))}
            {!isComplete && (
                <span className="inline-block w-3 h-8 bg-orange-500 ml-1 animate-pulse align-middle" />
            )}
        </h1>
    );
};
