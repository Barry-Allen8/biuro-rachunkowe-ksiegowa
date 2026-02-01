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
            const timer = setTimeout(() => setShowBanner(true), 1000);
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
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                    style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-5 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Ta strona wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania serwisu oraz poprawy jakości usług.{' '}
                                        <a
                                            href="/privacy-policy.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#004D40] underline hover:opacity-70 transition-opacity font-medium"
                                        >
                                            Polityka prywatności
                                        </a>
                                    </p>
                                </div>

                                <div className="flex gap-3 flex-shrink-0">
                                    <button
                                        onClick={handleReject}
                                        className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-50"
                                        aria-label="Odrzuć cookies"
                                    >
                                        Odrzuć
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        className="px-5 py-2.5 text-sm font-medium text-white bg-[#004D40] hover:bg-[#00695C] transition-colors rounded-lg shadow-sm"
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
