import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
        <AlertTriangle className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-4">
        Page introuvable
      </h2>
      <p className="text-slate-500 text-center max-w-md mb-8">
        La ressource que vous recherchez n'est pas disponible, a été supprimée ou l'URL est erronée.
      </p>
      <Link 
        href="/"
        className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
