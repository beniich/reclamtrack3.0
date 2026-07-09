'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = () => {
        const nextLocale = locale === 'en' ? 'fr' : 'en';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <button type="button"
            onClick={toggleLocale}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-primary/8 dark:hover:bg-violet-500/15 text-slate-600 dark:text-slate-400 font-bold text-xs uppercase transition-all border border-transparent hover:border-primary/30 dark:hover:border-primary/40"
            title={locale === 'en' ? 'Passer en Français' : 'Switch to English'}
        >
            <Languages className="w-4 h-4" />
            <span>{locale === 'en' ? 'FR' : 'EN'}</span>
        </button>
    );
}
