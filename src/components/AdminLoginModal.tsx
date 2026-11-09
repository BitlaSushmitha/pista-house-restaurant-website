import React, { useState } from 'react';
import { ShieldCheck, Lock, User, X, KeyRound, AlertCircle, Sparkles } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && passcode.trim() === '1234') {
      setError('');
      onSuccess();
    } else {
      setError('Invalid credentials. Use Username: admin and Passcode: 1234 or click Demo Auto-Fill.');
    }
  };

  const handleAutoFill = () => {
    setUsername('admin');
    setPasscode('1234');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md glass-modal rounded-3xl border border-white/12 p-6 sm:p-8 shadow-[0_24px_50px_rgba(0,0,0,0.9),0_0_36px_rgba(5,150,105,0.2)] space-y-6 bg-[#1E293B]/95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#059669]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] shadow-[0_0_16px_rgba(16,185,129,0.25)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F8FAFC]">Management Portal</h3>
              <p className="text-xs text-[#94A3B8]">Pista House Operations Gate</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
            aria-label="Close admin modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Credential Notice Banner with Emerald Green */}
        <div className="p-3.5 rounded-xl bg-[#059669]/15 border border-[#10B981]/30 text-xs text-[#34D399] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#10B981] shrink-0" />
            <span className="text-[#F8FAFC]">Default: <strong className="text-[#34D399]">admin</strong> / <strong className="text-[#34D399]">1234</strong></span>
          </div>
          <button
            type="button"
            onClick={handleAutoFill}
            className="px-2.5 py-1 rounded bg-[#059669] text-white font-bold text-[11px] hover:bg-[#047857] transition-colors cursor-pointer flex items-center gap-1 shrink-0 border border-emerald-400/30 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-white" />
            <span>Demo Auto-Fill</span>
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-3 pl-11 pr-4 rounded-xl bg-[#111827] border border-white/10 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#10B981] min-h-[44px]"
              />
              <User className="w-4 h-4 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">
              Security Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full py-3 pl-11 pr-4 rounded-xl bg-[#111827] border border-white/10 text-[#F8FAFC] text-sm font-mono tracking-widest focus:outline-none focus:border-[#10B981] min-h-[44px]"
              />
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl text-white font-bold bg-[#059669] hover:bg-[#047857] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(5,150,105,0.45)] min-h-[48px] border border-emerald-400/30"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
