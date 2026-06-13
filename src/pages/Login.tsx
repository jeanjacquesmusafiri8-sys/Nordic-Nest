import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowRight, UserCheck, KeyRound, Info, HelpCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Veuillez renseigner un courriel ou identifiant.');
      return;
    }

    const { success, message } = login(email, password);
    if (!success) {
      setErrorMsg(message);
    }
  };

  const handleApplyDemoAdmin = () => {
    setEmail('oderick');
    setPassword('123456');
    setErrorMsg('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24" id="login-view-page">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-[#FAF9F6] border border-[#EEEAE5] rounded-none p-8 shadow-xl text-left space-y-6"
      >
        {/* Header decoration */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-white text-[#A38E7E] border border-[#EEEAE5] rounded-none flex items-center justify-center mx-auto">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-sans font-light text-xl uppercase tracking-widest text-[#2A2A2A]">
              Administration
            </h2>
            <p className="text-[9px] text-[#A38E7E] font-mono uppercase tracking-widest font-bold mt-1">
              Nordic Nest Back-Office
            </p>
          </div>
        </div>

        {/* Demo instructions warning */}
        <div className="p-4 bg-white border border-[#A38E7E] rounded-none text-xs text-[#555] flex items-start space-x-2.5">
          <Info className="w-4 h-4 text-[#A38E7E] shrink-0 mt-0.5" />
          <div className="space-y-1.5 flex-grow">
            <p className="font-bold uppercase tracking-wider text-[10px] text-[#2A2A2A]">Identifiants requis pour tester :</p>
            <div className="bg-[#FAF9F6] p-2 border border-[#EEEAE5] font-mono text-[10px] text-[#2A2A2A]">
              Identifiant : <span className="font-bold">oderick</span> <br />
              Code de passe : <span className="font-bold">123456</span>
            </div>
            <button
              type="button"
              onClick={handleApplyDemoAdmin}
              className="text-[10px] text-[#A38E7E] font-bold hover:text-[#2A2A2A] uppercase tracking-wider flex items-center gap-1 mt-1 transition-colors"
            >
              ⚡ Remplir automatiquement
            </button>
          </div>
        </div>

        {/* Display Error Message */}
        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-950 text-xs font-semibold rounded-none border border-red-250 font-mono">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Email/Username field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">ID / E-mail</label>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="oderick"
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none text-[#2A2A2A]"
                id="login-email-input"
              />
              <UserCheck className="w-3.5 h-3.5 text-[#888] absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Mot de Passe</label>
              <span className="text-[10px] text-[#A1A1AA] cursor-not-allowed">Perdu ?</span>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="••••••"
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none text-[#2A2A2A] font-mono"
                id="login-password-input"
              />
              <KeyRound className="w-3.5 h-3.5 text-[#888] absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-4 bg-[#2A2A2A] hover:bg-black text-white font-sans font-bold text-xs uppercase tracking-widest rounded-none shadow-sm transition-all duration-300 flex items-center justify-center space-x-2"
            id="login-submit-btn"
          >
            <span>Se Connecter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="text-[9px] text-center text-[#999] font-mono uppercase tracking-widest">
          Accès restreint aux administrateurs de l'atelier Nordic Nest.
        </p>
      </motion.div>
    </div>
  );
};
