
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';

interface APIResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

export const Calculator: React.FC = () => {
  const [businessType, setBusinessType] = useState<'JDG' | 'SPZOO' | 'OTHER'>('JDG');
  const [invoices, setInvoices] = useState(10);
  const [employees, setEmployees] = useState(0);
  const [isVatPayer, setIsVatPayer] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // API State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const priceRange = useMemo(() => {
    let base = businessType === 'JDG' ? 250 : businessType === 'SPZOO' ? 700 : 450;

    // Invoices logic
    if (invoices > 10) base += Math.floor((invoices - 10) / 10) * 50;

    // Employees logic
    base += employees * 60;

    // VAT payer
    if (isVatPayer) base += 50;

    return {
      min: Math.floor(base * 0.9),
      max: Math.ceil(base * 1.1)
    };
  }, [businessType, invoices, employees, isVatPayer]);

  const handleSubmitLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // Rate limit: 1 request per 30 seconds
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      setErrorMessage('Proszę odczekać chwilę przed kolejnym wysłaniem.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        company: formData.get('company'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        gdprConsent: formData.get('gdpr') === 'on',
        honeypot: formData.get('website_url'), // Honeypot field
      };

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result: APIResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Wystąpił błąd podczas wysyłania.');
      }

      setLastSubmitTime(now);
      setIsSubmitted(true);
    } catch (error) {
      // No console.log in production as requested
      if (import.meta.env.DEV) console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Nie udało się wysłać formularza. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Controls */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Oblicz koszt księgowości</h2>
              <p className="text-gray-500 text-lg">Wycena dostosowana do Twoich potrzeb w 30 sekund.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Typ działalności</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['JDG', 'SPZOO', 'OTHER'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setBusinessType(type)}
                      className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium ${businessType === type
                        ? 'border-[#004D40] bg-[#004D40]/5 text-[#004D40]'
                        : 'border-gray-200 text-gray-500 hover:border-gray-400'
                        }`}
                    >
                      {type === 'JDG' ? 'JDG' : type === 'SPZOO' ? 'Sp. z o.o.' : 'Inna'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-semibold">Liczba dokumentów / mies</label>
                  <span className="text-[#004D40] font-bold">{invoices}</span>
                </div>
                <input
                  type="range" min="1" max="200" step="1"
                  value={invoices}
                  onChange={(e) => setInvoices(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#004D40]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Pracownicy</label>
                  <input
                    type="number" min="0"
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#004D40] outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-3">Płatnik VAT</label>
                  <button
                    onClick={() => setIsVatPayer(!isVatPayer)}
                    className={`flex-1 rounded-xl border transition-all flex items-center justify-center font-medium ${isVatPayer ? 'bg-[#004D40] text-white border-[#004D40]' : 'border-gray-200 text-gray-500'
                      }`}
                  >
                    {isVatPayer ? 'TAK' : 'NIE'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              layout
              className="bg-[#1D1D1F] text-white p-10 rounded-[2rem] shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {!showLeadForm ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <p className="text-gray-400 mb-2 font-medium">Szacunkowy koszt netto</p>
                      <div className="text-6xl font-bold mb-6 tracking-tight">
                        {priceRange.min} - {priceRange.max} <span className="text-xl font-normal text-gray-500">PLN</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-10">Dokładna cena zależy od specyfiki działalności. Umów się na darmową konsultację, aby otrzymać wiążącą ofertę.</p>
                      <Button variant="primary" className="w-full" onClick={() => setShowLeadForm(true)}>
                        Odbierz pełną wycenę
                      </Button>
                    </motion.div>
                  ) : isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-[#004D40] rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Dziękujemy!</h3>
                      <p className="text-gray-400">Skontaktujemy się z Tobą w ciągu 2 godzin roboczych.</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <h3 className="text-2xl font-bold mb-4">Gdzie wysłać ofertę?</h3>
                      <form onSubmit={handleSubmitLead} className="space-y-4">
                        {/* Honeypot for anti-spam */}
                        <input type="text" name="website_url" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                        <input name="name" required placeholder="Imię i Nazwisko" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-[#004D40] outline-none transition-colors" disabled={isLoading} />
                        <input name="company" required placeholder="Nazwa firmy" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-[#004D40] outline-none transition-colors" disabled={isLoading} />
                        <input name="email" required type="email" placeholder="Email" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-[#004D40] outline-none transition-colors" disabled={isLoading} />
                        <input name="phone" required type="tel" placeholder="Telefon" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-[#004D40] outline-none transition-colors" disabled={isLoading} />

                        <div className="flex items-start gap-3 mt-4">
                          <input required type="checkbox" name="gdpr" id="gdpr" className="mt-1 accent-[#004D40]" disabled={isLoading} />
                          <label htmlFor="gdpr" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                            Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przygotowania i przesłania oferty. <a href="#" className="underline">Polityka prywatności</a>.
                          </label>
                        </div>

                        {errorMessage && (
                          <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
                        )}

                        <Button type="submit" variant="primary" className="w-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
                          {isLoading ? 'Wysyłanie...' : 'Wyślij zapytanie'}
                        </Button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#004D40] opacity-10 blur-[100px] pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
