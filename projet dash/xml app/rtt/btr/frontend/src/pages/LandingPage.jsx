import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-[#0b0e14] text-white overflow-x-hidden pt-32 pb-20 px-6 font-sans">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative" id="hero">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(99,102,241,0.15)_0%,_rgba(0,0,0,0)_70%)] -z-10"></div>
        
        {/* Visual Content: Astronaut */}
        <div className="relative flex justify-center lg:justify-start">
          <img 
            alt="Astronaute AI DATA" 
            className="w-full max-w-2xl drop-shadow-2xl rounded-3xl object-cover h-[500px]" 
            src="https://lh3.googleusercontent.com/aida/ADBb0ugcEClF1JN6VDx8dGvwDBTGQORlyuSbRH1DeYDVMpIwvnjtpmZZeXFKIaKr9dqWFcvC7dNUOGZ-hsQE5qarhZzk8K22Ie8PUI3aqK8dTuzrfCzS2ERHuXDwuxda7cwbbHR27WaxLJfvxzwRgeG7-8DljzzSLGKqU5qpEl_IsjfnHnk8uEKzqaCt5n20GgRB83TE-B0KmyYmTETXdECNT11LWcDhcjN4WhDCb60UBJo1oW5UwwBnh2472bo" 
            style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
          />
          {/* Background Elements (Circuit Lines) */}
          <div className="absolute -z-10 opacity-20 w-full h-full pointer-events-none">
            <svg fill="none" height="100%" viewBox="0 0 400 400" width="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 200 H100 V300 H200" stroke="white" strokeWidth="1"></path>
              <path d="M50 50 V150 H150 V250" stroke="white" strokeWidth="1"></path>
            </svg>
          </div>
        </div>

        {/* Hero Content */}
        <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-10 lg:p-14 rounded-[40px] relative overflow-hidden">
          {/* Decorative light ray */}
          <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-indigo-500 to-transparent blur-sm"></div>
          
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 font-sans">
            ANALYTIQUE IA:<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">L'AVENIR DES DONNÉES & INSIGHTS</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
            Libérez la puissance de notre Core AI Engine pour l'apprentissage profond, les réseaux neuronaux et la modélisation prédictive.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard" className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform flex items-center justify-center text-center">
              EXPLORER LA PLATEFORME
            </Link>
            <button className="bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.1)] text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center">
              <svg className="mr-2" fill="currentColor" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"></path></svg>
              VOIR LA DÉMO
            </button>
          </div>
        </div>
      </section>

      {/* Core AI Engine Section */}
      <section className="max-w-7xl mx-auto mt-32" id="features">
        <h2 className="text-3xl font-semibold mb-12 flex items-center">
          Core AI Engine
        </h2>
        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1: Deep Learning */}
          <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-8 rounded-3xl group hover:border-orange-500/50 transition-all duration-500 cursor-pointer">
            <div className="mb-6 w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
              <svg fill="none" height="28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Deep Learning</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt modeling.
            </p>
            <div className="flex justify-end">
              <svg className="text-orange-500 group-hover:translate-x-2 transition-transform" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="5" x2="19" y1="12" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>

          {/* Card 2: Neural Networks */}
          <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-8 rounded-3xl group hover:border-indigo-500/50 transition-all duration-500 cursor-pointer">
            <div className="mb-6 w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <svg fill="none" height="28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3"></circle><path d="M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"></path><path d="M12 4.5V2"></path><path d="M12 22v-2.5"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2.5"></path><path d="M19.5 12H22"></path><path d="m4.93 19.07 1.41-1.41"></path><path d="m17.66 6.34 1.41-1.41"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Réseaux Neuronaux</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Neural networks with Core AI Engine for deep learning, neural networks and transformation.
            </p>
            <div className="flex justify-end">
              <svg className="text-indigo-400 group-hover:translate-x-2 transition-transform" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="5" x2="19" y1="12" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>

          {/* Card 3: Predictive Modeling */}
          <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-8 rounded-3xl group hover:border-orange-500/50 transition-all duration-500 cursor-pointer">
            <div className="mb-6 w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
              <svg fill="none" height="28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"></path><path d="m16 20 2 2 4-4"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Modélisation Prédictive</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Predictive power dolor sit amet, consectetur adipiscing elit, percipiat nation, and predictive modeling.
            </p>
            <div className="flex justify-end">
              <svg className="text-orange-500 group-hover:translate-x-2 transition-transform" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="5" x2="19" y1="12" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default LandingPage;
