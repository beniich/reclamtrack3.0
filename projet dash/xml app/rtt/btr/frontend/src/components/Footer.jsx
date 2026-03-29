import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  
  // Hide Footer on dashboard as it has its own layout
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  // Simplified footer for auth pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return (
      <footer className="w-full py-8 px-4 text-center text-sm text-gray-400 relative z-10" data-purpose="site-footer">
        <nav className="mb-4">
          <ul className="flex justify-center space-x-6">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </nav>
        <p>© 2024 AI DATA ANALYTICS. All Rights Reserved.</p>
      </footer>
    );
  }

  // Main footer for public pages
  return (
    <footer class="max-w-7xl mx-auto px-6 pb-12" data-purpose="site-footer">
      <div class="glass-effect rounded-3xl px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Footer Nav */}
        <nav class="flex items-center space-x-8 text-sm text-gray-400">
          <a class="hover:text-white transition-colors" href="#">Solutions</a>
          <a class="hover:text-white transition-colors" href="#">Entreprise</a>
          <a class="hover:text-white transition-colors" href="#">Ressources</a>
        </nav>
        {/* Social Media Icons */}
        <div class="flex items-center space-x-6 text-gray-400">
          <a class="hover:text-white transition-colors" href="#">
            <svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a class="hover:text-white transition-colors" href="#">
            <svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
          <a class="hover:text-white transition-colors" href="#">
            <svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
          </a>
          <a class="hover:text-white transition-colors" href="#">
            <svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.42-5.58z"></path><polyline points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polyline></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
