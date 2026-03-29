import React from 'react';
import { Link } from 'react-router-dom';

const CheckIcon = ({ color = 'text-green-400' }) => (
  <svg className={`h-5 w-5 ${color} mr-3 shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
  </svg>
);

const PricingPage = () => {
  return (
    <div className="bg-[#0a0a1a] text-white min-h-screen flex flex-col font-sans">

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">

        {/* Background decorative glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Pricing Header */}
        <section className="text-center z-10 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
            Tarifs de la Plateforme
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Des plans transparents et flexibles pour votre parcours IA/ML.
          </p>
        </section>

        {/* Pricing Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl z-10">

          {/* Starter Plan */}
          <article className="bg-[rgba(255,255,255,0.07)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.15)] rounded-[2rem] p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Starter</h2>
            <div className="mb-2">
              <span className="text-3xl font-bold">Gratuit</span>
              <span className="text-gray-400 block text-sm mt-1">À vie</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">Accès analytique de base</p>
            <ul className="w-full space-y-4 text-left mb-10 text-sm">
              {['3 Modèles AutoML actifs', 'Stockage : 10 Go', 'Support communautaire standard', 'Export de données (CSV)'].map(f => (
                <li key={f} className="flex items-start"><CheckIcon /><span>{f}</span></li>
              ))}
            </ul>
            <Link to="/register" className="mt-auto w-full py-3 px-6 border border-gray-500 rounded-full hover:bg-white hover:text-black transition-colors font-semibold uppercase text-xs tracking-widest text-center">
              Commencer gratuitement
            </Link>
          </article>

          {/* Professional Plan - Featured */}
          <article
            className="bg-[rgba(255,255,255,0.07)] backdrop-blur-[16px] rounded-[2rem] p-8 flex flex-col items-center text-center relative z-20"
            style={{ boxShadow: '0 0 30px 5px rgba(255,107,0,0.3)', border: '2px solid rgba(255,107,0,0.6)', transform: 'scale(1.05)' }}
          >
            {/* Badge */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7)', clipPath: 'polygon(0% 0%, 100% 0%, 90% 50%, 100% 100%, 0% 100%, 10% 50%)' }}
            >
              Plus Populaire
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Professionnel</h2>
            <div className="mb-2">
              <span className="text-3xl font-bold">199$</span>
              <span className="text-gray-400 text-sm">/mois</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">IA Avancée & Flux Kafka</p>
            <ul className="w-full space-y-4 text-left mb-10 text-sm">
              <li className="flex items-start text-orange-400"><CheckIcon color="text-orange-400" /><span>Modèles AutoML illimités</span></li>
              <li className="flex items-start text-orange-400 font-semibold"><CheckIcon color="text-orange-400" /><span>Intégration Kafka en temps réel</span></li>
              <li className="flex items-start"><CheckIcon color="text-orange-400" /><span>Stockage : 500 Go</span></li>
              <li className="flex items-start"><CheckIcon color="text-orange-400" /><span>Support e-mail prioritaire</span></li>
              <li className="flex items-start"><CheckIcon color="text-orange-400" /><span>Accès API</span></li>
              <li className="flex items-start"><CheckIcon color="text-orange-400" /><span>Tableaux de bord personnalisés</span></li>
            </ul>
            <Link
              to="/checkout"
              className="mt-auto w-full py-4 px-6 text-white rounded-full font-bold uppercase text-xs tracking-widest text-center transition-all hover:brightness-110"
              style={{ background: '#ff6b00', boxShadow: '0 4px 20px rgba(255,107,0,0.4)' }}
            >
              Essai Pro 14 Jours
            </Link>
          </article>

          {/* Enterprise Plan */}
          <article className="bg-[rgba(255,255,255,0.07)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.15)] rounded-[2rem] p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Entreprise</h2>
            <div className="mb-2">
              <span className="text-3xl font-bold text-white">Sur mesure</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">Solutions scalables complètes</p>
            <ul className="w-full space-y-4 text-left mb-10 text-sm">
              {['Modèles AutoML illimités', 'Flux Kafka illimités', 'Solutions de stockage sur mesure', 'Déploiement sur site (On-premise)', 'Sécurité & Conformité avancées'].map(f => (
                <li key={f} className="flex items-start"><CheckIcon color="text-purple-400" /><span>{f}</span></li>
              ))}
              <li className="flex items-start text-orange-400 font-semibold"><CheckIcon color="text-orange-400" /><span>Support prioritaire dédié 24/7</span></li>
            </ul>
            <button className="mt-auto w-full py-3 px-6 border border-gray-500 rounded-full hover:bg-white hover:text-black transition-colors font-semibold uppercase text-xs tracking-widest">
              Contacter les ventes
            </button>
          </article>

        </section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 z-10 text-gray-500 text-sm">
        <p>© 2024 Futuristic AI Data. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default PricingPage;
