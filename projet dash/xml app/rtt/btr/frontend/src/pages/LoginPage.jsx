import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Identifiants invalides. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative text-white font-sans selection:bg-orange-500 selection:text-white min-h-screen flex flex-col"
      style={{
        backgroundImage: 'url(https://lh3.googleusercontent.com/aida/ADBb0ugDlmJ0G_ddf6ZnQEdkzX7EQpNUT3k3oYsa0meHwhbd6yNgdZAeHfuHQVUst14fw7nr2caQYZaYfXeSiuqARdT4hjzzzKxb7sW7oD6oahOZUIky6HbY_fhRW372klfLg9jQfD5Rl3gBi9IoYam_OTeGuLzoJGRRfSH0Pe4fFi6hO3jhzbhqgcyx8F-icCR_owBTSWhlG94_9ehf2YVFVXNhhsxWQ16EzFQCaf7Xttm1VBgw3kkpCAjQmQ)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.2)] shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] w-full max-w-md rounded-3xl p-10 flex flex-col items-center">
          <h1 className="text-3xl font-semibold mb-10 tracking-wide">Connexion</h1>
          
          {error && (
            <div className="w-full bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl p-3 mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {/* Email Input Group */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <input 
                className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.3)] focus:bg-[rgba(255,255,255,0.15)] focus:border-[rgba(255,255,255,0.5)] focus:outline-none focus:shadow-[0_0_10px_rgba(255,255,255,0.1)] text-white w-full pl-12 pr-4 py-3.5 rounded-xl text-sm transition-all duration-200 placeholder:text-[rgba(255,255,255,0.5)]" 
                id="email" 
                name="email" 
                placeholder="Adresse e-mail" 
                required 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password Input Group */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <input 
                className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.3)] focus:bg-[rgba(255,255,255,0.15)] focus:border-[rgba(255,255,255,0.5)] focus:outline-none focus:shadow-[0_0_10px_rgba(255,255,255,0.1)] text-white w-full pl-12 pr-12 py-3.5 rounded-xl text-sm transition-all duration-200 placeholder:text-[rgba(255,255,255,0.5)]" 
                id="password" 
                name="password" 
                placeholder="Mot de passe" 
                required 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility" 
                  className={`text-gray-400 hover:text-white focus:outline-none ${showPassword ? 'text-white' : ''}`} 
                  type="button"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Login Button */}
            <button 
              className={`w-full bg-[#FF8500] hover:bg-[#E67700] text-white font-bold py-3.5 px-4 rounded-full text-lg shadow-lg transition-transform active:scale-95 duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`} 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'Login'}
            </button>
            
            {/* Form Links */}
            <div className="text-center space-y-4 pt-4">
              <a className="block text-sm text-gray-300 hover:text-white underline decoration-gray-500 underline-offset-4 transition-colors" href="#">
                Mot de passe oublié?
              </a>
              <p className="text-sm text-gray-400">
                Pas encore de compte? <Link className="text-white hover:underline underline-offset-4" to="/register">S'inscrire.</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
