import { redirect } from 'next/navigation';

export default function ComplaintsPage({ params }: { params: { locale: string } }) {
    redirect(`/${params.locale}/complaints/list`);
}
