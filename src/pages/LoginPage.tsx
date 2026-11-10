import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import rriLogo from '../assets/rri-logo.svg';
import cfBrand from '../assets/cloudflare-brand.svg';
import loginHero from '../assets/login-hero.png';
import { Check, Eye, EyeOff } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, verify2FA, twoFactorPending, setTwoFactorPending } = useApp();

  // Login form state
  const [identifier, setIdentifier] = useState('user1@rri.co.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(true);
  const [isVerifyingCaptcha, setIsVerifyingCaptcha] = useState(false);

  // 2FA state (pre-filled with valid 6-digit mock OTP)
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (twoFactorPending && inputRefs.current[5]) {
      inputRefs.current[5]?.focus();
    }
  }, [twoFactorPending]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    login(identifier.trim());
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedDigits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      pastedDigits.forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verify2FA(otp.join(''));
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50 font-sans">
      {/* Left Column: Hero Section (Matching Figma Node 950:34482) */}
      <div className="relative w-full md:w-1/2 min-h-[320px] md:min-h-screen bg-[#1866EF] text-white p-8 sm:p-12 md:p-16 flex flex-col justify-end overflow-hidden">
        {/* Background photo of people working with coffee & laptop */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 pointer-events-none"
          style={{ backgroundImage: `url(${loginHero})` }}
        />

        {/* Bottom Hero Text Block (Aligned to bottom as in Figma MAX primaryAxisAlign) */}
        <div className="relative z-10 space-y-4 max-w-lg mb-4 sm:mb-8">
          <h1 className="font-['Oxanium'] font-bold text-3xl sm:text-4xl md:text-[38px] text-white tracking-tight leading-tight">
            Portal Pemeriksa<br />Naskah RRI
          </h1>
          <p className="text-sm font-semibold text-white/90 max-w-sm leading-relaxed">
            Menjaga orisinalitas, standar redaksi, dan kualitas pemberitaan publik.
          </p>
          <div className="pt-2 text-xs font-normal text-white/70 font-sans">
            RRI Editools v0.1
          </div>
        </div>
      </div>

      {/* Right Column: Form Section */}
      <div className="w-full md:w-1/2 p-6 sm:p-12 md:p-16 flex flex-col justify-center items-center bg-white">
        <div className="max-w-md w-full">
          {/* RRI Logo Header */}
          <div className="mb-8">
            <img src={rriLogo} alt="RRI Radio Republik Indonesia" className="h-10 w-auto" />
          </div>

          {!twoFactorPending ? (
            /* STEP 1: LOGIN CREDENTIALS FORM (Matching media_1794273431007_3f700340.jpg) */
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#1866EF] tracking-tight">
                  Selamat datang
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Silakan masuk menggunakan NIP atau Email Anda.
                </p>
              </div>

              {/* Quick Account Switcher (For Testing & Demo) */}
              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl mb-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-900 tracking-wide uppercase">
                    Pilihan Akun Cepat (Simulasi Demo)
                  </span>
                  <span className="text-[10px] text-blue-600 font-medium">Klik untuk ganti</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIdentifier('user1@rri.co.id');
                      setPassword('editor123');
                      setIsCaptchaVerified(true);
                    }}
                    className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                      identifier.includes('user1') || identifier.includes('editor')
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <p className="text-xs font-semibold leading-tight">Editor</p>
                    <p className={`text-[10px] truncate ${identifier.includes('user1') || identifier.includes('editor') ? 'text-blue-100' : 'text-slate-400'}`}>
                      user1@rri.co.id
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIdentifier('cameron.newton@rri.co.id');
                      setPassword('admin123');
                      setIsCaptchaVerified(true);
                    }}
                    className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                      identifier.includes('cameron') || identifier.includes('admin')
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <p className="text-xs font-semibold leading-tight">Admin</p>
                    <p className={`text-[10px] truncate ${identifier.includes('cameron') || identifier.includes('admin') ? 'text-blue-100' : 'text-slate-400'}`}>
                      cameron.newton@rri.co.id
                    </p>
                  </button>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                    Masukkan NIP / email pengguna <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Masukkan NIP / email pengguna di sini ..."
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                    Masukkan kata sandi penguna <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi di sini..."
                      required
                      className="w-full px-3.5 py-2.5 pr-10 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Cloudflare Turnstile Box */}
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between shadow-2xs">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <button
                      type="button"
                      onClick={() => {
                        if (!isCaptchaVerified) {
                          setIsVerifyingCaptcha(true);
                          setTimeout(() => {
                            setIsVerifyingCaptcha(false);
                            setIsCaptchaVerified(true);
                          }, 400);
                        } else {
                          setIsCaptchaVerified(false);
                        }
                      }}
                      className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                        isCaptchaVerified
                          ? 'bg-[#1866EF] border-[#1866EF] text-white'
                          : 'bg-white border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {isCaptchaVerified && <Check className="w-4 h-4 stroke-[3]" />}
                      {isVerifyingCaptcha && (
                        <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      )}
                    </button>
                    <span className="text-xs font-normal text-slate-700">Verify you are human</span>
                  </label>

                  <div className="flex flex-col items-end">
                    <img src={cfBrand} alt="Cloudflare" className="h-5 w-auto" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isCaptchaVerified}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#1866EF] hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  Lanjutkan ke Verifikasi 2FA
                </button>
              </form>
            </div>
          ) : (
            /* STEP 2: 2FA OTP FORM (Matching media_1794273435427_6986ae5f.jpg) */
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#1866EF] tracking-tight">
                  Verifikasi Dua Langkah (2FA)
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Kami mengirimkan 6-digit kode OTP ke email{' '}
                  <span className="font-semibold text-slate-800">{identifier}</span>.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <span className="text-slate-500">Akan Masuk Sebagai:</span>
                  <span className="font-bold">
                    {identifier.toLowerCase().includes('admin') || identifier.toLowerCase().includes('cameron')
                      ? 'Administrator (Cameron Newton)'
                      : 'Editor (Siti Rahmawati)'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleVerify2FASubmit} className="space-y-6">
                {/* 6 OTP boxes */}
                <div className="flex justify-between gap-2 sm:gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        inputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className={`w-12 h-14 text-center text-xl font-bold rounded-lg border transition-colors ${
                        idx === 4
                          ? 'border-[#1866EF] ring-2 ring-blue-100 bg-white'
                          : 'border-slate-300 bg-white'
                      } focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 shadow-2xs`}
                    />
                  ))}
                </div>

                {/* Timer row */}
                <div className="text-xs text-slate-500 text-center">
                  <span>Kode berlaku dalam 04:28 WIB · </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtp(['1', '2', '3', '4', '', '']);
                    }}
                    className="text-[#1866EF] font-semibold hover:underline"
                  >
                    Kirim ulang kode
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#1866EF] hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  Verifikasi & Masuk ke Dashboard
                </button>

                {/* Back to Login Button (Now works properly!) */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setTwoFactorPending(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                  >
                    ← Kembali ke Layar Login Utama
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
