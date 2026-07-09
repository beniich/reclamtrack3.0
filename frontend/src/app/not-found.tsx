'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import '../styles/globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-background text-foreground min-h-screen flex items-center justify-center font-sans">
        <div className="text-center p-8 max-w-lg bg-card backdrop-blur-md rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-8xl font-bold text-primary mb-4 tracking-tighter">404</h1>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Page introuvable</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            La page que vous essayez d'atteindre n'existe pas ou l'URL est incorrecte.
            Vérifiez l'adresse ou retournez à l'accueil.
          </p>
          <Link 
            href="/fr/dashboard" 
            className="px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors inline-block shadow-lg shadow-primary/20"
          >
            Retour au Tableau de bord
          </Link>
        </div>
      </body>
    </html>
  );
}
