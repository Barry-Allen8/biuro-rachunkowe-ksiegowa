import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, BUSINESS_INFO, TRUST_FACTORS, TRUST_BADGES, PRICING_TIERS, TESTIMONIALS, ABOUT_CONTENT, FAQ_ITEMS } from './data/content';
import { Button } from './components/ui/Button';
import { CookieConsent } from './components/CookieConsent';

// SVG Icons Component
const Icons = {
  certificate: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  shield: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  users: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  clock: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  lock: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  heart: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  phone: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  check: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  star: (
    <svg className="w-5 h-5 fill-gold-400 text-gold-400" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  mapPin: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  mail: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  menu: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

const getIcon = (iconName: string) => {
  return Icons[iconName as keyof typeof Icons] || Icons.check;
};

// Smooth scroll helper
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 130;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: 'services', label: 'Usługi' },
    { href: 'about', label: 'O nas' },
    { href: 'pricing', label: 'Cennik' },
    { href: 'contact', label: 'Kontakt' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-2' : 'bg-transparent py-2'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Przewiń do góry strony"
          >
            <div className="h-[90px] sm:h-[110px] lg:h-[120px] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <img
                src="/IR.svg"
                alt="IR Księgowa dla Ciebie - Biuro Rachunkowe Bydgoszcz - logo"
                className="h-full w-auto max-w-[300px] sm:max-w-[360px] lg:max-w-[420px] object-contain drop-shadow-sm transition-opacity duration-300 group-hover:opacity-90"
                loading="eager"
                decoding="async"
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-navy-700 hover:text-navy-900 font-medium text-sm transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            {/* Phone number display - visible when scrolled on desktop */}
            <a
              href={`tel:${BUSINESS_INFO.contact.phone}`}
              className={`hidden lg:flex items-center gap-2 text-navy-700 hover:text-navy-900 transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <span className="text-sm font-medium">Zadzwoń:</span>
              <span className="font-bold text-navy-900">{BUSINESS_INFO.contact.phone}</span>
            </a>

            <Button
              variant="gold"
              size="sm"
              className="hidden sm:flex"
              onClick={() => window.location.href = `tel:${BUSINESS_INFO.contact.phone}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden lg:inline">Zadzwoń teraz</span>
              <span className="lg:hidden">Zadzwoń</span>
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-navy-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? Icons.close : Icons.menu}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-navy-100"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={`#${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block py-3 px-4 text-navy-700 hover:bg-navy-50 rounded-lg font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

// Hero Section
const Hero = () => (
  <header className="relative min-h-screen flex items-center py-24 lg:py-28 bg-gradient-to-br from-navy-50 via-white to-navy-50">
    {/* Background Pattern */}
    <div className="absolute inset-0 pattern-dots opacity-50" />

    {/* Decorative Elements */}
    <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-900/5 rounded-full blur-3xl" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 py-12 lg:py-0">
      <div className="max-w-2xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
          }}
        >
          {/* SEO-Optimized H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.2] mb-8 tracking-tight overflow-visible">
            <motion.span className="block text-navy-900" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}>
              Biuro Rachunkowe
            </motion.span>
            <motion.span className="block text-navy-900" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}>
              Bydgoszcz
            </motion.span>
            <motion.span className="block text-gradient-gold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mt-3 mb-2 leading-[1.5] pb-2" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}>
              Kompleksowa Księgowość i Kadry
            </motion.span>
          </h1>

          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } } }}
            className="text-lg sm:text-xl text-navy-600 mb-10 leading-relaxed max-w-lg"
          >
            Profesjonalna <strong>pełna księgowość</strong>, <strong>obsługa kadr i płac</strong>, <strong>KPiR</strong>, <strong>ryczałt</strong> oraz rozliczenia <strong>CIT</strong>, <strong>PIT</strong>, <strong>VAT</strong> i <strong>ZUS</strong>. Certyfikat MF, ubezpieczenie OC. Zaufało nam ponad 150 firm.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } } }}
          >
            <Button variant="gold" size="lg" onClick={() => scrollToSection('contact')}>
              Darmowa Wycena
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection('services')}>
              Zobacz usługi
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-start gap-8 mt-12 pt-10 border-t border-navy-100"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, delay: 0.7 } } }}
          >
            {TRUST_BADGES.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 text-navy-600">
                <div className="w-11 h-11 bg-navy-900 rounded-xl flex items-center justify-center text-white shadow-sm">
                  {getIcon(badge.icon)}
                </div>
                <span className="text-sm font-semibold">{badge.shortTitle}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Image/Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative hidden lg:block"
      >
        <div className="flex flex-col gap-8">
          {/* Main Card */}
          <div className="bg-white rounded-3xl p-8 shadow-elevated border border-navy-100">
            <picture>
              <source srcSet="/hero-workspace.webp" type="image/webp" />
              <img
                src="/hero-workspace.png"
                alt="Biuro Rachunkowe Bydgoszcz ul. Nakielska 156 - profesjonalna księgowość, kadry i płace, rozliczenia CIT PIT VAT ZUS"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
            </picture>

            {/* Stats Overlay */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-navy-50 rounded-xl">
                <p className="text-2xl font-display font-bold text-navy-900">150+</p>
                <p className="text-xs text-navy-500 font-medium">Klientów</p>
              </div>
              <div className="text-center p-4 bg-navy-50 rounded-xl">
                <p className="text-2xl font-display font-bold text-navy-900">15+</p>
                <p className="text-xs text-navy-500 font-medium">Lat doświadczenia</p>
              </div>
              <div className="text-center p-4 bg-navy-50 rounded-xl">
                <p className="text-2xl font-display font-bold text-navy-900">100%</p>
                <p className="text-xs text-navy-500 font-medium">Satysfakcji</p>
              </div>
            </div>
          </div>

          {/* Certificate Badge - positioned in document flow to prevent overlap */}
          <motion.div
            className="relative self-start bg-gold-500 text-navy-900 px-6 py-4 rounded-2xl shadow-lg border border-gold-400/20"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="font-display font-bold text-lg">Certyfikat MF</p>
            <p className="text-sm text-navy-900/80">Licencjonowane biuro</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </header>
);

// Trust Badges Section
const TrustBadgesSection = () => (
  <section className="py-20 bg-white border-y border-navy-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {TRUST_BADGES.map((badge, idx) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="flex items-start gap-4 p-6 bg-navy-50 rounded-2xl hover:bg-navy-100 hover:shadow-sm transition-all duration-300"
          >
            <div className="flex-shrink-0 w-14 h-14 bg-navy-900 rounded-xl flex items-center justify-center text-gold-400 shadow-sm">
              {getIcon(badge.icon)}
            </div>
            <div>
              <h3 className="font-display font-bold text-navy-900 mb-1.5">{badge.title}</h3>
              <p className="text-sm text-navy-600 leading-relaxed">{badge.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Certyfikaty i Bezpieczeństwo Section
const CertyfikatySection = () => (
  <section id="certyfikaty" className="py-20 lg:py-28 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 right-10 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 bg-gold-500/20 text-gold-400 rounded-full text-sm font-semibold mb-4"
        >
          Gwarancja Bezpieczeństwa
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6"
        >
          Certyfikaty i Bezpieczeństwo
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-navy-200 max-w-2xl mx-auto text-lg"
        >
          Twoje finanse w profesjonalnych rękach. Działamy zgodnie z najwyższymi standardami branżowymi.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
        {/* Certyfikat Ministra Finansów */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
        >
          <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className="text-2xl font-display font-bold text-white mb-3">
            Certyfikat Ministra Finansów
          </h3>
          <p className="text-navy-200 leading-relaxed mb-4">
            Posiadamy oficjalne uprawnienia wydane przez Ministra Finansów do usługowego prowadzenia ksiąg rachunkowych zgodnie z art. 76a ustawy o rachunkowości.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gold-400 text-sm">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
              Licencjonowana działalność księgowa
            </li>
            <li className="flex items-center gap-2 text-gold-400 text-sm">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
              Regularne szkolenia i aktualizacje
            </li>
          </ul>
        </motion.div>

        {/* Ubezpieczenie OC */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
        >
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-2xl font-display font-bold text-white mb-3">
            Obowiązkowe Ubezpieczenie OC
          </h3>
          <p className="text-navy-200 leading-relaxed mb-4">
            Posiadamy pełne ubezpieczenie odpowiedzialności cywilnej zawodowej, które chroni Twój biznes przed ewentualnymi szkodami wynikającymi z naszych usług.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-emerald-400 text-sm">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              Pełna ochrona Twojego biznesu
            </li>
            <li className="flex items-center gap-2 text-emerald-400 text-sm">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              Zgodność z wymogami prawnymi
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Additional trust indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-center"
      >
        <div className="px-6 py-3.5 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
          <span className="text-gold-400 font-bold">15+</span>
          <span className="text-navy-200 ml-2">lat doświadczenia</span>
        </div>
        <div className="px-6 py-3.5 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
          <span className="text-gold-400 font-bold">150+</span>
          <span className="text-navy-200 ml-2">obsłużonych firm</span>
        </div>
        <div className="px-6 py-3.5 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
          <span className="text-gold-400 font-bold">100%</span>
          <span className="text-navy-200 ml-2">zgodność z RODO</span>
        </div>
      </motion.div>
    </div>
  </section>
);

// Services Section
const Services = () => (
  <section id="services" className="py-24 lg:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold mb-4"
        >
          Nasze Usługi
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy-900 mb-6"
        >
          Kompleksowa Obsługa Księgowa
          <br />
          <span className="text-gold-500">w Bydgoszczy</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-navy-600 max-w-2xl mx-auto text-lg"
        >
          Od JDG po spółki kapitałowe. KPiR, ryczałt, pełna księgowość, kadry i płace, rozliczenia podatków (CIT, PIT, VAT) i ZUS.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {SERVICES.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group bg-white p-8 rounded-2xl border border-navy-100 hover:border-navy-200 hover:shadow-card-hover transition-all duration-500"
          >
            <div className="w-14 h-14 bg-navy-50 text-navy-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-navy-900 group-hover:text-white transition-all duration-500">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
              </svg>
            </div>
            <h3 className="text-xl font-display font-bold text-navy-900 mb-3">{service.title}</h3>
            <p className="text-navy-500 text-sm leading-relaxed mb-4">{service.description}</p>

            {service.features && (
              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-navy-600">
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Why Choose Us Section - Enhanced with compelling story
const WhyChooseUs = () => (
  <section id="about" className="py-24 lg:py-32 bg-navy-900 text-white overflow-hidden relative">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-white/10 text-gold-400 rounded-full text-sm font-semibold mb-6"
          >
            O Nas
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6"
          >
            {ABOUT_CONTENT.headline}
            <br />
            <span className="text-gold-400">{ABOUT_CONTENT.subheadline}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-navy-200 text-base mb-8 leading-relaxed space-y-4"
          >
            {ABOUT_CONTENT.story.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.div>

          {/* Highlights */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-3 mb-10"
          >
            {ABOUT_CONTENT.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gold-400">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white text-sm">{highlight}</span>
              </li>
            ))}
          </motion.ul>

          <div className="grid sm:grid-cols-2 gap-6">
            {TRUST_FACTORS.map((factor, i) => (
              <motion.div
                key={factor.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-4 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-900 transition-all duration-300">
                  {getIcon(factor.icon)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-white mb-1">{factor.title}</h4>
                  <p className="text-navy-300 text-sm">{factor.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/10">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{Icons.star}</span>
              ))}
            </div>

            <blockquote className="text-xl lg:text-2xl font-medium text-white mb-8 leading-relaxed">
              "{TESTIMONIALS[0].content}"
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gold-400 rounded-full flex items-center justify-center text-navy-900 font-display font-bold text-xl">
                {TESTIMONIALS[0].name.charAt(0)}
              </div>
              <div>
                <p className="font-display font-bold text-white">{TESTIMONIALS[0].name}</p>
                <p className="text-navy-300 text-sm">{TESTIMONIALS[0].role}, {TESTIMONIALS[0].company}</p>
              </div>
            </div>
          </div>

          {/* Decorative Quote */}
          <div className="absolute -top-6 -right-6 text-gold-400/20 text-9xl font-serif">"</div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Testimonials Section - All client reviews
const TestimonialsSection = () => (
  <section id="testimonials" className="py-24 lg:py-32 bg-navy-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold mb-4"
        >
          Opinie Klientów
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy-900 mb-6"
        >
          Co Mówią Nasi Klienci
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-navy-600 max-w-2xl mx-auto text-lg"
        >
          Zaufało nam ponad 150 firm z Bydgoszczy i okolic. Oto co mówią o współpracy z nami.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {TESTIMONIALS.map((testimonial, idx) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 border border-navy-100"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i}>{Icons.star}</span>
              ))}
            </div>
            <blockquote className="text-navy-700 mb-6 leading-relaxed">
              "{testimonial.content}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center text-gold-400 font-display font-bold text-lg">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-display font-bold text-navy-900">{testimonial.name}</p>
                <p className="text-navy-500 text-sm">{testimonial.role}, {testimonial.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Pricing Section
const Pricing = () => (
  <section id="pricing" className="py-24 lg:py-32 bg-navy-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 bg-navy-900 text-white rounded-full text-sm font-semibold mb-4"
        >
          Cennik
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy-900 mb-6"
        >
          Przejrzyste Ceny
          <br />
          <span className="text-gold-500">Bez Ukrytych Kosztów</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-navy-600 max-w-2xl mx-auto text-lg"
        >
          Wybierz pakiet dopasowany do potrzeb Twojej firmy. Każda wycena jest indywidualna.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {PRICING_TIERS.map((tier, idx) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`relative bg-white rounded-3xl p-8 ${tier.highlighted
              ? 'ring-2 ring-gold-500 shadow-elevated scale-105'
              : 'border border-navy-100 shadow-card hover:shadow-card-hover'
              } transition-all duration-500`}
          >
            {tier.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gold-500 text-navy-900 px-4 py-1.5 rounded-full text-sm font-bold">
                  {tier.badge}
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-xl font-display font-bold text-navy-900 mb-2">{tier.name}</h3>
              <p className="text-navy-500 text-sm">{tier.subtitle}</p>
            </div>

            <div className="text-center mb-8 pb-8 border-b border-navy-100">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-navy-500 text-lg">od</span>
                <span className="text-4xl font-display font-bold text-navy-900">{tier.priceFrom}</span>
                <span className="text-navy-500">{tier.currency}</span>
              </div>
              <p className="text-sm text-navy-400 mt-1">{tier.period}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mt-0.5">
                    {Icons.check}
                  </span>
                  <span className="text-navy-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={tier.highlighted ? 'gold' : 'outline'}
              className="w-full"
              onClick={() => scrollToSection('contact')}
            >
              {tier.cta}
            </Button>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-navy-500 mt-12"
      >
        * Ceny orientacyjne. Dokładna wycena po analizie dokumentacji.
        <br />
        Skontaktuj się z nami, aby otrzymać bezpłatną, spersonalizowaną ofertę.
      </motion.p>
    </div>
  </section>
);

// Lazy load Calculator
const Calculator = React.lazy(() => import('./components/Calculator').then(module => ({ default: module.Calculator })));

// FAQ Section with accordion
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Extended FAQ items for better SEO
  const extendedFAQItems = [
    ...FAQ_ITEMS,
    {
      question: "Jakie dokumenty są potrzebne do rozpoczęcia współpracy?",
      answer: "Do rozpoczęcia współpracy potrzebujemy: wypisu z CEIDG lub KRS, NIP i REGON firmy, danych kontaktowych oraz pełnomocnictwa do reprezentowania firmy przed US i ZUS. Pomożemy Ci przygotować wszystkie niezbędne dokumenty."
    },
    {
      question: "Czy oferujecie usługi dla firm spoza Bydgoszczy?",
      answer: "Tak! Dzięki pełnej digitalizacji i możliwości współpracy online obsługujemy klientów z całej Polski. Dokumenty możesz przesyłać elektronicznie, a spotkania odbywać się mogą przez wideokonferencje."
    },
    {
      question: "Jak wygląda rozliczanie się za usługi księgowe?",
      answer: "Oferujemy przejrzyste miesięczne abonamenty bez ukrytych kosztów. Faktura wystawiana jest na początku każdego miesiąca. Cena zależy od zakresu usług i liczby dokumentów. Pierwsza konsultacja jest bezpłatna."
    }
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-navy-100 text-navy-700 rounded-full text-sm font-semibold mb-4"
          >
            Często Zadawane Pytania
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy-900 mb-6"
          >
            Masz Pytania?
            <br />
            <span className="text-gold-500">Mamy Odpowiedzi</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-navy-600 max-w-2xl mx-auto text-lg"
          >
            Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług księgowych.
          </motion.p>
        </div>

        <div className="space-y-4">
          {extendedFAQItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-navy-100 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-navy-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-display font-semibold text-navy-900 pr-4">{item.question}</span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 text-navy-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-navy-600 leading-relaxed border-t border-navy-100 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-navy-600 mb-4">Nie znalazłeś odpowiedzi na swoje pytanie?</p>
          <Button variant="gold" onClick={() => scrollToSection('contact')}>
            Skontaktuj się z nami
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// Form state type
interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  gdpr: boolean;
  honeypot: string; // Spam protection
}

// Web3Forms API Key - Replace with your own key from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

// Contact Section
const Contact = () => {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
    gdpr: false,
    honeypot: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Validation functions
  const validateName = (name: string): string | null => {
    if (!name.trim()) return 'Imię i nazwisko jest wymagane';
    if (name.trim().length < 3) return 'Imię i nazwisko musi mieć min. 3 znaki';
    if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/.test(name)) return 'Imię i nazwisko może zawierać tylko litery';
    return null;
  };

  const validateEmail = (email: string): string | null => {
    if (!email.trim()) return 'Email jest wymagany';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Nieprawidłowy format email';
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    if (!phone.trim()) return 'Telefon jest wymagany';
    // Polish phone format: +48 XXX XXX XXX or XXX XXX XXX or XXXXXXXXX
    const phoneRegex = /^(\+48\s?)?(\d{3}\s?\d{3}\s?\d{3}|\d{9})$/;
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!phoneRegex.test(cleanPhone) && !/^\+48\d{9}$/.test(cleanPhone)) {
      return 'Nieprawidłowy format telefonu (np. +48 600 000 000)';
    }
    return null;
  };

  const validateField = (field: string, value: string | boolean) => {
    let error: string | null = null;
    switch (field) {
      case 'name':
        error = validateName(value as string);
        break;
      case 'email':
        error = validateEmail(value as string);
        break;
      case 'phone':
        error = validatePhone(value as string);
        break;
    }
    setErrors((prev: Record<string, string>) => ({ ...prev, [field]: error || '' }));
    return !error;
  };

  const handleBlur = (field: string) => {
    validateField(field, formState[field as keyof typeof formState]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Honeypot spam check - if filled, it's a bot
    if (formState.honeypot) {
      setIsSubmitted(true);
      return;
    }

    // Validate all fields
    const nameValid = validateField('name', formState.name);
    const emailValid = validateField('email', formState.email);
    const phoneValid = validateField('phone', formState.phone);

    if (!nameValid || !emailValid || !phoneValid) {
      return;
    }

    if (!formState.gdpr) {
      setErrors((prev: Record<string, string>) => ({ ...prev, gdpr: 'Zgoda RODO jest wymagana' }));
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nowe zapytanie od ${formState.name} - Biuro Rachunkowe`,
          from_name: 'Biuro Rachunkowe - Formularz Kontaktowy',
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          message: formState.message || 'Brak wiadomości - proszę o kontakt.',
          zgoda_rodo: formState.gdpr ? 'Tak' : 'Nie',
          // Redirect after submission (optional)
          redirect: false
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        // Reset form
        setFormState({
          name: '',
          email: '',
          phone: '',
          message: '',
          gdpr: false,
          honeypot: ''
        });
      } else {
        throw new Error(result.message || 'Błąd wysyłania formularza');
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError('Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub zadzwoń do nas bezpośrednio.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold mb-4"
          >
            Kontakt
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy-900 mb-6"
          >
            Skontaktuj się z Nami
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-navy-600 max-w-2xl mx-auto text-lg"
          >
            Umów się na bezpłatną konsultację. Odpowiemy w ciągu 2 godzin roboczych.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 lg:p-10 shadow-elevated border border-navy-100"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-navy-900 mb-2">Dziękujemy!</h3>
                <p className="text-navy-600">Skontaktujemy się z Tobą w ciągu 2 godzin roboczych.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for spam protection - hidden from users */}
                <input
                  type="text"
                  name="botcheck"
                  value={formState.honeypot}
                  onChange={(e) => setFormState(prev => ({ ...prev, honeypot: e.target.value }))}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Error banner */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                  >
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-700">{submitError}</p>
                  </motion.div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-navy-900 mb-2">
                    Imię i Nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => {
                      setFormState(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) validateField('name', e.target.value);
                    }}
                    onBlur={() => handleBlur('name')}
                    className={`input-premium ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="Jan Kowalski"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-navy-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => {
                        setFormState(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) validateField('email', e.target.value);
                      }}
                      onBlur={() => handleBlur('email')}
                      className={`input-premium ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
                      placeholder="jan@firma.pl"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-navy-900 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formState.phone}
                      onChange={(e) => {
                        setFormState(prev => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) validateField('phone', e.target.value);
                      }}
                      onBlur={() => handleBlur('phone')}
                      className={`input-premium ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
                      placeholder="+48 600 000 000"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-navy-900 mb-2">
                    Wiadomość <span className="text-navy-400 font-normal">(opcjonalnie)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    className="input-premium resize-none"
                    placeholder="Opisz swoją działalność i potrzeby..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="gdpr"
                    checked={formState.gdpr}
                    onChange={(e) => {
                      setFormState(prev => ({ ...prev, gdpr: e.target.checked }));
                      if (errors.gdpr) setErrors((prev: Record<string, string>) => ({ ...prev, gdpr: '' }));
                    }}
                    className={`mt-1 w-4 h-4 rounded border-navy-300 text-gold-500 focus:ring-gold-500 ${errors.gdpr ? 'border-red-400' : ''}`}
                  />
                  <div>
                    <label htmlFor="gdpr" className="text-sm text-navy-600">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie zgodnie z{' '}
                      <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-navy-900 underline hover:no-underline">
                        Polityką Prywatności
                      </a>
                      . *
                    </label>
                    {errors.gdpr && (
                      <p className="mt-1 text-sm text-red-600">{errors.gdpr}</p>
                    )}
                  </div>
                </div>

                <Button type="submit" variant="gold" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Wysyłanie...
                    </span>
                  ) : (
                    'Wyślij wiadomość'
                  )}
                </Button>

                <p className="text-xs text-navy-400 text-center">
                  Odpowiadamy w ciągu 2 godzin roboczych. Możesz też{' '}
                  <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="text-gold-600 hover:text-gold-700 font-medium">
                    zadzwonić bezpośrednio
                  </a>
                  .
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-navy-900 rounded-3xl p-8 lg:p-10 text-white">
              <h3 className="text-2xl font-display font-bold mb-8">Dane Kontaktowe</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gold-400 flex-shrink-0">
                    {Icons.mapPin}
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Adres</p>
                    <p className="text-navy-200">
                      {BUSINESS_INFO.address.street}<br />
                      {BUSINESS_INFO.address.zip} {BUSINESS_INFO.address.city}
                    </p>
                    <p className="text-navy-400 text-sm mt-1">{BUSINESS_INFO.address.description}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gold-400 flex-shrink-0">
                    {Icons.phone}
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Telefon</p>
                    <a href={`tel:${BUSINESS_INFO.contact.phone.replace(/\s/g, '')}`} className="text-gold-400 text-lg font-medium hover:text-gold-300 transition-colors block">
                      {BUSINESS_INFO.contact.phone}
                    </a>
                    <a
                      href={`https://wa.me/${BUSINESS_INFO.contact.phone.replace(/[\s+]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Napisz na WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gold-400 flex-shrink-0">
                    {Icons.mail}
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Email</p>
                    <a href={`mailto:${BUSINESS_INFO.contact.email}`} className="text-navy-200 hover:text-white transition-colors">
                      {BUSINESS_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gold-400 flex-shrink-0">
                    {Icons.clock}
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Godziny Otwarcia</p>
                    {BUSINESS_INFO.openingHours.map((h, i) => (
                      <p key={i} className="text-navy-200 text-sm">
                        <span className="text-navy-400">{h.days}:</span> {h.hours}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-3xl overflow-hidden h-64 lg:h-80 shadow-depth-md border border-navy-100">
              <iframe
                src="https://maps.google.com/maps?q=Głogowska+20E,+Bydgoszcz,+Poland&output=embed"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokalizacja biura rachunkowego - ul. Głogowska 20E/2, Bydgoszcz"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-navy-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center mb-6">
            <div className="h-12 sm:h-14 flex items-center">
              <img
                src="/IR.svg"
                alt="IR Księgowa dla Ciebie - Biuro Rachunkowe Bydgoszcz - logo"
                className="h-full w-auto max-w-[180px] object-contain brightness-0 invert"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <p className="text-navy-300 text-sm leading-relaxed mb-6">
            Profesjonalne biuro rachunkowe w Bydgoszczy. Pełna księgowość, kadry i płace, doradztwo podatkowe.
          </p>

          {/* Trust badges */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gold-500/10 rounded-lg border border-gold-500/20">
              <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="text-xs text-gold-400 font-medium">Certyfikat MF</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs text-emerald-400 font-medium">Ubezpieczenie OC</span>
            </div>
          </div>

          {/* Legal identifiers */}
          <div className="space-y-1.5 text-sm">
            {BUSINESS_INFO.legal && (
              <>
                <p className="text-navy-400">
                  <span className="text-navy-500 font-medium">NIP:</span> {BUSINESS_INFO.legal.nip}
                </p>
                <p className="text-navy-400">
                  <span className="text-navy-500 font-medium">REGON:</span> {BUSINESS_INFO.legal.regon}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-white mb-6">Usługi</h4>
          <ul className="space-y-3">
            {SERVICES.map(service => (
              <li key={service.id}>
                <a href={`#services`} className="text-navy-300 hover:text-gold-400 transition-colors text-sm">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold text-white mb-6">Kontakt</h4>
          <ul className="space-y-3 text-sm">
            <li className="text-navy-300">
              {BUSINESS_INFO.address.street}<br />
              {BUSINESS_INFO.address.zip} {BUSINESS_INFO.address.city}
            </li>
            <li>
              <a href={`tel:${BUSINESS_INFO.contact.phone.replace(/\s/g, '')}`} className="text-gold-400 hover:text-gold-300 transition-colors font-medium">
                {BUSINESS_INFO.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS_INFO.contact.email}`} className="text-navy-300 hover:text-white transition-colors">
                {BUSINESS_INFO.contact.email}
              </a>
            </li>
            {BUSINESS_INFO.social?.facebook && (
              <li>
                <a href={BUSINESS_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-navy-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-display font-bold text-white mb-6">Informacje</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-navy-300 hover:text-white transition-colors">
                Polityka Prywatności
              </a>
            </li>
            <li>
              <a href="/privacy-policy.html#cookies" target="_blank" rel="noopener noreferrer" className="text-navy-300 hover:text-white transition-colors">
                Polityka Cookies
              </a>
            </li>
            <li>
              <a href="/privacy-policy.html#rodo" target="_blank" rel="noopener noreferrer" className="text-navy-300 hover:text-white transition-colors">
                RODO / GDPR
              </a>
            </li>
            <li>
              <a href="/regulamin.html" target="_blank" rel="noopener noreferrer" className="text-navy-300 hover:text-white transition-colors">
                Regulamin Usług
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-navy-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-navy-400 text-sm">
          © {new Date().getFullYear()} {BUSINESS_INFO.name}. Wszelkie prawa zastrzeżone.
        </p>
        <div className="flex items-center gap-2 text-navy-400 text-sm">
          <span>Certyfikowane biuro rachunkowe</span>
          <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
          <span>Ubezpieczenie OC</span>
        </div>
      </div>
    </div>
  </footer>
);

// Back to Top Button Component
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-navy-900 hover:bg-navy-800 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Przewiń do góry"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Main App
export default function App() {
  return (
    <div className="antialiased bg-white">
      <Header />
      <Hero />
      <TrustBadgesSection />
      <CertyfikatySection />
      <Services />
      <WhyChooseUs />
      <TestimonialsSection />
      <Pricing />
      <React.Suspense fallback={
        <div className="py-24 text-center text-navy-500">
          <div className="w-8 h-8 border-2 border-navy-200 border-t-navy-900 rounded-full animate-spin mx-auto mb-4" />
          Ładowanie kalkulatora...
        </div>
      }>
        <Calculator />
      </React.Suspense>
      <FAQ />
      <Contact />
      <Footer />

      {/* Cookie Consent */}
      <CookieConsent />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Floating Action Button (FAB) - Call Now */}
      <motion.a
        href={`tel:${BUSINESS_INFO.contact.phone}`}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gold-500 hover:bg-gold-400 text-navy-900 rounded-full flex items-center justify-center shadow-elevated hover:shadow-xl transition-all duration-300 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Zadzwoń teraz"
      >
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {/* Tooltip on hover - desktop only */}
        <span className="absolute right-full mr-3 px-3 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden lg:block">
          Zadzwoń: {BUSINESS_INFO.contact.phone}
        </span>
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-gold-500 animate-ping opacity-20" />
      </motion.a>
    </div>
  );
}
