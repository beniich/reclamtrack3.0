import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  // Hide Navbar on dashboard as it has its own sidebar/header
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <header className="fixed top-0 w-full z-50 p-6" data-purpose="navigation-bar">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-effect rounded-full px-8 py-3">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2" data-purpose="logo">
          <svg className="text-indigo-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
            <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6z"></path>
            <path d="M12 10a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"></path>
          </svg>
          <span className="font-bold text-xl tracking-wider text-white">AI DATA</span>
        </Link>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium text-gray-300">
          <Link to="/" className={`${location.pathname === '/' ? 'text-white border-b-2 border-orange-500 pb-1' : 'hover:text-white transition-colors'}`}>Accueil</Link>
          <Link to="/features" className="hover:text-white transition-colors">Fonctionnalités</Link>
          <Link to="/pricing" className={`${location.pathname === '/pricing' ? 'text-white border-b-2 border-orange-500 pb-1' : 'hover:text-white transition-colors'}`}>Tarifs</Link>
          <Link to="/about" className="hover:text-white transition-colors">À propos</Link>
        </nav>
        
        {/* Contact/Login Button */}
        <div data-purpose="header-cta">
          <Link to="/login" className="glass-effect px-6 py-2 rounded-full text-sm font-semibold text-white hover:bg-white/10 transition-all">
            Connexion
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
