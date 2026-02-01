import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONSENT_KEY = 'cookie_consent';

export const CookieConsent: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if consent has already been given
        const consent = localStorage.getItem(CONSENT_KEY);
        if (!consent) {
            // Small delay before showing banner for better UX
            const timer = setTimeout(() => setShowBanner(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        setShowBanner(false);
    };

    const handleReject = () => {
        localStorage.setItem(CONSENT_KEY, 'rejected');
        setShowBanner(false);
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 md:pb-6 pb-24"
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-navy-900 backdrop-blur-xl border border-navy-800 rounded-2xl shadow-elevated p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gold-500/20 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold mb-1">Szanujemy Twoją prywatność</h3>
                                        <p className="text-sm text-navy-300 leading-relaxed">
                                            Ta strona wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania serwisu oraz poprawy jakości usług.{' '}
                                            <a
                                                href="/privacy-policy.html"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gold-400 hover:text-gold-300 transition-colors underline underline-offset-2"
                                            >
                                                Polityka prywatności
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 flex-shrink-0 ml-14 md:ml-0">
                                    <button
                                        onClick={handleReject}
                                        className="px-5 py-2.5 text-sm font-semibold text-navy-300 hover:text-white transition-colors rounded-xl hover:bg-white/5 border border-navy-700"
                                        aria-label="Odrzuć cookies"
                                    >
                                        Odrzuć
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        className="px-6 py-2.5 text-sm font-semibold text-navy-900 bg-gradient-to-r from-gold-500 to-gold-400 hover:shadow-gold transition-all rounded-xl"
                                        aria-label="Akceptuj cookies"
                                    >
                                        Akceptuję
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
