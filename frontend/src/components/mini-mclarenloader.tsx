'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * Premium Ferrari Loader
 * Uses the real Ferrari SVG from /public/ferrari.svg
 */
export function MiniMcLarenLoader() {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleStart = () => {
            setIsVisible(true);
            setProgress(15);
        };

        const handleEnd = () => {
            setProgress(100);
            setTimeout(() => setIsVisible(false), 300);
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link) {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('http') && !link.target && href !== pathname) {
                    handleStart();

                    // Animate progress artificially up to 95% while waiting for the page to load
                    const interval = setInterval(() => {
                        setProgress((prev) => (prev >= 95 ? 95 : prev + Math.random() * 15));
                    }, 100);

                    // We NO LONGER artificially end the loader. 
                    // It will be ended by the route change useEffect below.

                    return () => {
                        clearInterval(interval);
                    };
                }
            }
        };

        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, [pathname, searchParams]); // Restart listeners if needed

    // This effect acts as the "routeChangeComplete" event
    useEffect(() => {
        if (isVisible) {
            // When the route actually changes, push progress to 100% and hide
            setProgress(100);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setProgress(0);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [pathname, searchParams]);

    if (!isVisible) return null;

    const progressWidth = progress + '%';

    return (
        <>
            {/* Top Glowing Red Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent">
                <div
                    className="h-full bg-gradient-to-r from-[#9B050C] via-[#E30A17] to-[#FF2A33] transition-all duration-150"
                    style={{ width: progressWidth, boxShadow: '0 0 15px #E30A17' }}
                />
            </div>

            {/* Bottom Right Ferrari Loader Frame */}
            <div className={cn(
                'fixed bottom-6 right-6 z-[9998] transition-all duration-300',
                'hover:scale-105 active:scale-95'
            )}>
                <div className="relative p-5 min-w-[22rem]">
                    {/* Ambient red glow strictly behind the car */}
                    <div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-24 rounded-full pointer-events-none z-0"
                        style={{ background: 'rgba(227,10,23,0.15)', filter: 'blur(30px)' }}
                    />

                    <div className="relative flex flex-col items-center">
                        {/* Real Ferrari SVG via img tag — avoids all JSX parsing issues */}
                        <div className="w-80 h-36 relative z-10 overflow-hidden ferrari-float">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/ferrari.svg"
                                alt="Ferrari"
                                className="w-full h-full object-contain"
                                style={{
                                    objectPosition: 'center 48%',
                                    transform: 'scale(1.3)',
                                }}
                            />
                        </div>

                        {/* Progress bar below car */}
                        <div className="w-full mt-3 bg-white/5 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-200"
                                style={{
                                    width: progressWidth,
                                    background: 'linear-gradient(to right, #9B050C, #E30A17, #FF2A33)',
                                    boxShadow: '0 0 8px #E30A17',
                                }}
                            />
                        </div>

                        {/* Status bar */}
                        <div className="flex items-center justify-end w-full mt-2 px-1 text-[10px]">
                            <span className="font-mono text-slate-400 font-bold">{Math.round(progress)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes ferFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }
                @keyframes ferPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                }
                .ferrari-float {
                    animation: ferFloat 2s ease-in-out infinite;
                }
            `}</style>
        </>
    );
}

export function FlatMcLarenLoader() {
    return null;
}
