import { redirect } from 'next/navigation';

export default async function ComplaintsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    redirect(`/${locale}/complaints/list`);
}
