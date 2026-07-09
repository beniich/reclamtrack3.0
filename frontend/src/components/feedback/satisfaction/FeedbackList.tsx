'use client';

import { Feedback } from '@/lib/satisfaction-data';
import FeedbackCard from './FeedbackCard';
import { useRouter } from 'next/navigation';

type Props = {
    feedbacks: Feedback[];
};

export default function FeedbackList({ feedbacks }: Props) {
    const router = useRouter();

    return (
        <section className="bg-white dark:bg-background p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Recent Citizen Feedback</h4>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Filter:</span>
                    <select className="text-xs border-slate-200 dark:border-border-dark bg-transparent rounded-lg py-1 px-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-slate-300">
                        <option className="dark:bg-background">All Ratings</option>
                        <option className="dark:bg-background">Negative (1-2 Stars)</option>
                        <option className="dark:bg-background">Positive (4-5 Stars)</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {feedbacks.length > 0 ? (
                    feedbacks.map((fb) => (
                        <FeedbackCard key={fb.id} feedback={fb} />
                    ))
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Aucun feedback trouvé.</p>
                    </div>
                )}
            </div>

            {feedbacks.length > 0 && (
                <button type="button" onClick={() => router.push('/feedback')} className="w-full mt-6 py-2.5 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl border border-primary/20 transition-all active:scale-[0.98]">
                    View All {feedbacks.length} Reviews
                </button>
            )}
        </section>
    );
}
