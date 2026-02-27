
import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('antonio.garcia@netoffice.com');
  const [password, setPassword] = useState('********');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular validación
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#1b4e9b]/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md px-4 z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center select-none mb-2">
            <span className="text-4xl font-semibold tracking-tight text-[#3b7ba9]">NetOffice</span>
            <span className="text-4xl font-light tracking-tight text-[#3b7ba9] ml-1">Timer</span>
          </div>
          <p className="text-slate-400 font-medium text-sm tracking-wide uppercase">Portal de Gestión de RRHH</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Corporativo</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#3b7ba9]/20 focus:bg-white transition-all"
                  placeholder="nombre@netoffice.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#3b7ba9]/20 focus:bg-white transition-all"
                  placeholder="Introduce tu clave"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#1b4e9b] focus:ring-[#1b4e9b]" />
                <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Recordarme</span>
              </label>
              <button type="button" className="text-xs font-bold text-[#3b7ba9] hover:underline">¿Olvidaste tu clave?</button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#1b4e9b] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-[#0072bc] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Entrar al Portal <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
           <ShieldCheck size={16} />
           <p className="text-[10px] font-bold uppercase tracking-widest">Conexión Segura SSL 256-bit</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
