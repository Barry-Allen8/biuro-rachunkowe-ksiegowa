import React, { useState, useMemo, useEffect } from 'react';
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

  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => setIsCalculating(false), 400);
    return () => clearTimeout(timer);
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
        honeypot: formData.get('website_url'),
        calculatorData: {
          businessType,
          invoices,
          employees,
          isVatPayer,
          priceRange
        }
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
      if (import.meta.env.DEV) console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Nie udało się wysłać formularza. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="calculator" className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold mb-4"
          >
            Kalkulator
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy-900 mb-6"
          >
            Oblicz Koszt Księgowości
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-navy-600 max-w-2xl mx-auto text-lg"
          >
            Wycena dostosowana do Twoich potrzeb w 30 sekund. Bez zobowiązań.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 bg-white rounded-3xl p-8 lg:p-10 shadow-card border border-navy-100"
          >
            <div>
              <label className="block text-sm font-semibold mb-4 text-navy-900">Typ działalności</label>
              <div className="grid grid-cols-3 gap-3">
                {(['JDG', 'SPZOO', 'OTHER'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setBusinessType(type)}
                    className={`py-4 px-4 rounded-xl border-2 transition-all duration-300 text-sm font-semibold ${
                      businessType === type
                        ? 'border-navy-900 bg-navy-900 text-white shadow-depth-md'
                        : 'border-navy-200 text-navy-600 hover:border-navy-300 hover:bg-navy-50'
                    }`}
                  >
                    {type === 'JDG' ? 'JDG' : type === 'SPZOO' ? 'Sp. z o.o.' : 'Inna'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-semibold text-navy-900">Liczba dokumentów / miesiąc</label>
                <span className="text-navy-900 font-bold font-display text-lg">{invoices}</span>
              </div>
              <input
                type="range"
                min="1"
                max="200"
                step="1"
                value={invoices}
                onChange={(e) => setInvoices(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-navy-400 mt-2">
                <span>1</span>
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-4 text-navy-900">Liczba pracowników</label>
                <input
                  type="number"
                  min="0"
                  value={employees}
                  onChange={(e) => setEmployees(parseInt(e.target.value) || 0)}
                  className="input-premium text-center text-lg font-semibold"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-4 text-navy-900">Płatnik VAT</label>
                <button
                  onClick={() => setIsVatPayer(!isVatPayer)}
                  className={`flex-1 rounded-xl border-2 transition-all duration-300 flex items-center justify-center font-semibold text-lg ${
                    isVatPayer
                      ? 'bg-navy-900 text-white border-navy-900 shadow-depth-md'
                      : 'border-navy-200 text-navy-500 hover:bg-navy-50'
                  }`}
                >
                  {isVatPayer ? 'TAK' : 'NIE'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Result Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <motion.div
              layout
              className="bg-navy-900 text-white p-8 lg:p-10 rounded-3xl shadow-elevated relative overflow-hidden"
            >
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {!showLeadForm ? (
                    isCalculating ? (
                      <motion.div
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-6"
                      >
                        <div className="h-4 bg-white/10 rounded-full w-40 mx-auto mb-6 animate-pulse" />
                        <div className="h-16 bg-white/10 rounded-2xl w-56 mx-auto mb-8 animate-pulse" />
                        <div className="h-14 bg-white/10 rounded-full w-full animate-pulse" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                      >
                        <p className="text-navy-300 mb-3 font-medium">Szacunkowy koszt netto</p>
                        <div className="text-5xl lg:text-6xl font-display font-bold mb-2 tracking-tight">
                          {priceRange.min} - {priceRange.max}
                        </div>
                        <p className="text-gold-400 font-semibold mb-6">PLN / miesiąc</p>
                        <p className="text-sm text-navy-300 mb-8 leading-relaxed">
                          Dokładna cena zależy od specyfiki działalności. Umów się na darmową konsultację, aby otrzymać wiążącą ofertę.
                        </p>
                        <Button variant="gold" className="w-full" onClick={() => setShowLeadForm(true)}>
                          Odbierz pełną wycenę
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Button>
                      </motion.div>
                    )
                  ) : isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-display font-bold mb-3">Dziękujemy!</h3>
                      <p className="text-navy-300">Skontaktujemy się z Tobą w ciągu 2 godzin roboczych.</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-display font-bold">Gdzie wysłać ofertę?</h3>
                        <button
                          onClick={() => setShowLeadForm(false)}
                          className="text-navy-400 hover:text-white transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <form onSubmit={handleSubmitLead} className="space-y-4">
                        {/* Honeypot for anti-spam */}
                        <input type="text" name="website_url" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                        <input
                          name="name"
                          required
                          placeholder="Imię i Nazwisko"
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all text-white placeholder:text-navy-400"
                          disabled={isLoading}
                        />
                        <input
                          name="company"
                          required
                          placeholder="Nazwa firmy"
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all text-white placeholder:text-navy-400"
                          disabled={isLoading}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            name="email"
                            required
                            type="email"
                            placeholder="Email"
                            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all text-white placeholder:text-navy-400"
                            disabled={isLoading}
                          />
                          <input
                            name="phone"
                            required
                            type="tel"
                            placeholder="Telefon"
                            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all text-white placeholder:text-navy-400"
                            disabled={isLoading}
                          />
                        </div>

                        <div className="flex items-start gap-3 pt-2">
                          <input
                            required
                            type="checkbox"
                            name="gdpr"
                            id="gdpr-calc"
                            className="mt-1"
                            disabled={isLoading}
                          />
                          <label htmlFor="gdpr-calc" className="text-xs text-navy-400 leading-relaxed cursor-pointer">
                            Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przygotowania i przesłania oferty.{' '}
                            <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:underline">
                              Polityka prywatności
                            </a>
                          </label>
                        </div>

                        {errorMessage && (
                          <p className="text-red-400 text-sm font-medium bg-red-400/10 p-3 rounded-lg">{errorMessage}</p>
                        )}

                        <Button type="submit" variant="gold" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                              Wysyłanie...
                            </>
                          ) : (
                            'Wyślij zapytanie'
                          )}
                        </Button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 opacity-5 blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 blur-[80px] pointer-events-none" />
            </motion.div>

            {/* Additional info */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-navy-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Bez zobowiązań</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Odpowiedź w 2h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
