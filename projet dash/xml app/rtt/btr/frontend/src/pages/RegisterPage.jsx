import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/register', {
        username: form.name,
        email: form.email,
        password: form.password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Inscription échouée. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b1a] text-white font-sans overflow-x-hidden">

      {/* Header */}
      <header className="w-full px-8 py-6 flex justify-between items-center fixed top-0 z-50">
        <Link to="/" className="font-bold text-xl tracking-wider text-orange-500">IA/ML</Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-orange-400 transition-colors uppercase tracking-widest text-orange-500">Accueil</Link>
          <Link to="/about" className="hover:text-orange-400 transition-colors uppercase tracking-widest">À Propos</Link>
          <Link to="/features" className="hover:text-orange-400 transition-colors uppercase tracking-widest">Fonctionnalités</Link>
          <Link to="/contact" className="hover:text-orange-400 transition-colors uppercase tracking-widest">Contact</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-8 pt-24">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side: Visual */}
          <div className="hidden lg:block relative">
            <img
              alt="Astronaute 3D et interfaces analytiques"
              className="w-full h-auto object-contain drop-shadow-2xl"
              src="https://lh3.googleusercontent.com/aida/ADBb0ug8G0jhWStW4pq532BKYKNSN92lzSmUVbMqC-iPL-RPME4FfdGz_MQG1mdqA5nEQJCktJ_USTjbgypI0EmniJDZcH0rUP0BF21HtkmXxrrfecRHCU2_0e-o448Qm8LNTdbNS8eLb9sUavBzxQxtiJ-X7Sl4EbTaAPPBxyvtZ59IPA4Q_-MGP0uWUaCjJvpBweRSk2WeEymaxgfaLz0rpV08gV5pYqzGCdjpYgB61SMDtwWtHAQt3G9wOWs"
            />
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px]"></div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] w-full max-w-lg p-8 md:p-12 rounded-3xl">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ textShadow: '0 0 15px rgba(249,115,22,0.6)' }}>Inscription</h1>
                <p className="text-gray-400 font-medium">IA/ML Analytics</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3 mb-6 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 ml-1" htmlFor="name">Nom Complet</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    </span>
                    <input
                      className="w-full py-4 pl-12 pr-4 rounded-xl text-white placeholder-gray-500 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] focus:bg-[rgba(255,255,255,0.08)] focus:border-orange-500 focus:outline-none focus:shadow-[0_0_0_2px_rgba(249,115,22,0.2)] transition-all duration-300"
                      id="name" name="name" placeholder="Votre nom complet" type="text"
                      value={form.name} onChange={handleChange} required
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 ml-1" htmlFor="email">Adresse E-mail</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    </span>
                    <input
                      className="w-full py-4 pl-12 pr-4 rounded-xl text-white placeholder-gray-500 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] focus:bg-[rgba(255,255,255,0.08)] focus:border-orange-500 focus:outline-none focus:shadow-[0_0_0_2px_rgba(249,115,22,0.2)] transition-all duration-300"
                      id="email" name="email" placeholder="email@exemple.com" type="email"
                      value={form.email} onChange={handleChange} required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 ml-1" htmlFor="password">Créer un Mot de Passe</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    </span>
                    <input
                      className="w-full py-4 pl-12 pr-4 rounded-xl text-white placeholder-gray-500 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] focus:bg-[rgba(255,255,255,0.08)] focus:border-orange-500 focus:outline-none focus:shadow-[0_0_0_2px_rgba(249,115,22,0.2)] transition-all duration-300"
                      id="password" name="password" placeholder="••••••••" type="password"
                      value={form.password} onChange={handleChange} required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl text-white font-bold text-lg uppercase tracking-widest mt-4 transition-all ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
                  style={{ background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)', boxShadow: '0 4px 15px rgba(249,115,22,0.4)' }}
                >
                  {loading ? 'Inscription...' : "S'inscrire Maintenant"}
                </button>

                {/* Login Link */}
                <p className="text-center text-gray-400 text-sm mt-6">
                  Vous avez déjà un compte ?{' '}
                  <Link to="/login" className="text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-4">Connexion</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
        <div>© 2024 AI/ML Analytics. Tous droits réservés.</div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">YouTube</a>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;
