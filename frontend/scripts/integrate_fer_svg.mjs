import fs from 'fs';
import path from 'path';

const svgPath = "C:\\Users\\pc gold\\Downloads\\fer.svg";
const targetPath = path.join(process.cwd(), 'frontend', 'src', 'components', 'mini-mclarenloader.tsx');

let svgContent = fs.readFileSync(svgPath, 'utf8');

// Perform React JSX/TSX translations for SVG attributes
svgContent = svgContent
  .replace(/class=/g, 'className=')
  .replace(/stop-color=/g, 'stopColor=')
  .replace(/fill-rule=/g, 'fillRule=')
  .replace(/clip-path=/g, 'clipPath=')
  .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
  .replace(/stroke-width=/g, 'strokeWidth=')
  .replace(/gradientTransform=/g, 'gradientTransform=')
  .replace(/gradientUnits=/g, 'gradientUnits=')
  .replace(/xlink:href=/g, 'xlinkHref=')
  .replace(/xmlns:xlink=/g, 'xmlnsXlink=')
  // SVG comments that might conflict
  .replace(/id="&lt;Group&gt;"/g, 'id="Group"')
  .replace(/id="&lt;Path&gt;"/g, 'id="Path"')
  .replace(/id="&lt;Clip Group&gt;"/g, 'id="ClipGroup"')
  .replace(/id="&lt;Compound Path&gt;"/g, 'id="CompoundPath"');

// Extract defs, style and objects to construct a clean React Component
// Let's replace the whole SVG in the mini-mclarenloader.tsx

const componentTemplate = `'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function MiniMcLarenLoader() {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleStart = () => {
            setIsVisible(true);
            setProgress(15);
        };

        const handleEnd = () => {
            setProgress(100);
            setTimeout(() => setIsVisible(false), 800);
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link) {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('http') && !link.target) {
                    handleStart();

                    const interval = setInterval(() => {
                        setProgress((prev) => (prev >= 95 ? 95 : prev + Math.random() * 25));
                    }, 150);

                    const timer = setTimeout(() => {
                        handleEnd();
                        clearInterval(interval);
                    }, 1200);

                    return () => {
                        clearInterval(interval);
                        clearTimeout(timer);
                    };
                }
            }
        };

        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Top Glowing Red Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent">
                <div
                    className="h-full bg-gradient-to-r from-[#9B050C] via-[#E30A17] to-[#FF2A33] shadow-[0_0_15px_#E30A17] transition-all duration-150"
                    style={{ width: \`\${progress}%\` }}
                />
            </div>

            {/* Bottom Right Ferrari Loader Frame */}
            <div className={cn(
                'fixed bottom-6 right-6 z-[9998] transition-all duration-300',
                'hover:scale-105 active:scale-95'
            )}>
                <div className="relative group bg-[#0c0218]/95 border border-[#E30A17]/20 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                    {/* Radial background ambient red glow */}
                    <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-[#E30A17]/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative flex flex-col items-center">
                        <div className="w-56 h-28 relative z-10 flex items-center justify-center animate-float">
                            ${svgContent.replace('<svg', '<svg className="w-full h-full"')}
                        </div>

                        {/* Speedometer Loading Status */}
                        <div className="flex items-center justify-between w-full mt-3 px-2 border-t border-red-500/10 pt-2.5 text-[10px]">
                            <span className="font-bold text-[#E30A17] tracking-widest uppercase">Ferrari 2026</span>
                            <span className="font-mono text-slate-400 font-bold">{Math.round(progress)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{\`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                .animate-float {
                    animation: float 2s ease-in-out infinite;
                }
            \`}</style>
        </>
    );
}

export function FlatMcLarenLoader() {
    return null;
}
`;

fs.writeFileSync(targetPath, componentTemplate, 'utf8');
console.log("Successfully integrated fer.svg into mini-mclarenloader.tsx");
