import { redirect } from 'next/navigation';

export default function InventoryPage({ params }: { params: { locale: string } }) {
    redirect(`/${params.locale}/inventory/inventory`);
}
