'use client';

import ComplaintForm from '@/components/ComplaintForm';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NewComplaintPage() {
    const { token } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token, router]);

    if (!token) return null;

    return (
        <section className="py-8">
            <ComplaintForm />
        </section>
    );
}
