'use client';

import React, { useEffect, useRef, useState } from 'react';
import { anime } from 'animejs';
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
    const [isComplete, setIsComplete] = useState(false);
    const hasStarted = useRef(false);

    useEffect(() => {
        if (!containerRef.current || !isInView || hasStarted.current) return;
        
        hasStarted.current = true;

        // Reset visibility
        const chars = containerRef.current.querySelectorAll('.char');
        anime.set(chars, { opacity: 0 });

        const tl = anime.timeline({
            easing: 'linear',
            complete: () => {
                setIsComplete(true);
                if (onComplete) onComplete();
            }
        });

        let totalDelay = 0;

        lines.forEach((line, lineIdx) => {
            const lineChars = containerRef.current?.querySelectorAll(`.line-${lineIdx} .char`);
            if (!lineChars) return;

            tl.add({
                targets: lineChars,
                opacity: [0, 1],
                duration: speed,
                delay: anime.stagger(speed, { start: line.delayBefore || 0 }),
            });
        });

    }, [lines, speed, onComplete]);

    return (
        <h1 ref={containerRef} className={cn("relative", className)}>
            {lines.map((line, lineIdx) => (
                <div key={lineIdx} className={cn("block line-" + lineIdx, line.className)}>
                    {line.text.split('').map((char, charIdx) => (
                        <span key={charIdx} className="char inline-block whitespace-pre">
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
