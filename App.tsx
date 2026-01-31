
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, BUSINESS_INFO, TRUST_FACTORS } from './data/content';
// Calculator Imported Lazy below
import { Button } from './components/ui/Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#004D40] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <span className="font-display font-bold text-xl hidden sm:block">Księgowa Dla Ciebie</span>
        </div>

        <div className="hidden md:flex items-center gap-10 font-medium text-sm">
          <a href="#services" className="hover:text-[#004D40] transition-colors">Usługi</a>
          <a href="#about" className="hover:text-[#004D40] transition-colors">O biurze</a>
          <a href="#calculator" className="hover:text-[#004D40] transition-colors">Cennik</a>
          <a href="#contact" className="hover:text-[#004D40] transition-colors">Kontakt</a>
        </div>

        <Button variant="secondary" className="hidden sm:flex !py-2.5 !px-6 !text-sm" onClick={() => window.location.href = 'tel:+48694908338'}>
          Zadzwoń teraz
        </Button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <header className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
    <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center z-10">
      <div className="max-w-2xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.1 }
            }
          }}
        >
          <motion.div variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
            <span className="inline-block px-4 py-1.5 bg-[#F5F5F7] text-[#1D1D1F] rounded-full text-xs font-semibold tracking-widest uppercase mb-8">
              Bydgoszcz • Nakielska 156
            </span>
          </motion.div>

          <h1 className="text-6xl lg:text-8xl font-display font-medium leading-[1.1] mb-8 tracking-tight text-[#1D1D1F]">
            <motion.span className="block" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}>
              Księgowość,
            </motion.span>
            <motion.span className="block" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}>
              która pracuje
            </motion.span>
            <motion.span className="block text-[#004D40]" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}>
              dla Ciebie
            </motion.span>
          </h1>

          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1, delay: 0.4 } } }}
            className="text-xl text-gray-500 mb-12 leading-relaxed max-w-lg"
          >
            Nowoczesne podejście do finansów Twojej firmy. JDG, Spółki, Kadry i Płace w sercu Bydgoszczy.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } } }}
          >
            <Button variant="primary" onClick={() => document.getElementById('calculator')?.scrollIntoView()}>
              Oblicz koszt
            </Button>
            <Button variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
              Darmowa konsultacja
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative hidden lg:block"
      >
        <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <img src="https://picsum.photos/seed/accountant/800/1000" alt="Office Professional" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
          <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg border border-white">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"><img src={`https://picsum.photos/seed/${i}/100/100`} /></div>)}
              </div>
              <div>
                <p className="text-sm font-bold">150+ Zadowolonych firm</p>
                <p className="text-xs text-gray-500">Wspieramy lokalny biznes od lat.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Decor */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#004D40]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#004D40]/10 rounded-full blur-[120px]"></div>
      </motion.div>
    </div>
  </header>
);

const Services = () => (
  <section id="services" className="py-32 bg-[#F9F9FB]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-4xl lg:text-5xl font-medium mb-6 tracking-tight text-[#1D1D1F]">Kompleksowa obsługa</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">Wszystko, czego potrzebuje Twój biznes w jednym miejscu. Od rejestracji po optymalizację podatkową.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((s, idx) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-white p-10 rounded-[2rem] shadow-studio border border-transparent hover:shadow-studio-hover transition-all duration-500"
          >
            <div className="w-14 h-14 bg-[#F5F5F7] text-[#1D1D1F] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#004D40] group-hover:text-white transition-colors duration-300">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#1D1D1F]">{s.title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Lazy load heavy interactive components
const Calculator = React.lazy(() => import('./components/Calculator').then(module => ({ default: module.Calculator })));

const WhyChooseUs = () => (
  <section id="about" className="py-32 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
      <div>
        <h2 className="text-4xl lg:text-5xl font-medium mb-8 tracking-tight text-[#1D1D1F]">Dlaczego my?</h2>
        <p className="text-xl text-gray-500 mb-12 leading-relaxed">Wierzymy, że księgowość to nie tylko cyfry, to fundament Twojego spokoju. Nasze biuro w Bydgoszczy łączy tradycyjną rzetelność z cyfrową wygodą.</p>

        <div className="space-y-8">
          {TRUST_FACTORS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex gap-6 group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#F5F5F7] rounded-full flex items-center justify-center text-[#1D1D1F] group-hover:bg-[#004D40] group-hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-[#1D1D1F]">{f.title}</h4>
                <p className="text-gray-500">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="aspect-square bg-[#1D1D1F] rounded-[3rem] p-12 flex flex-col justify-end text-white overflow-hidden group shadow-2xl relative isolate transform-gpu">
          <img
            src="https://picsum.photos/seed/office-bg/1000/1000"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s] ease-studio will-change-transform"
          />
          <div className="absolute inset-0 rounded-[3rem] ring-1 ring-white/10 pointer-events-none z-20"></div>
          <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
            <p className="text-3xl lg:text-4xl font-medium mb-6 leading-tight">"Twoje finanse,<br />nasza pasja."</p>
            <p className="text-white/80 font-medium tracking-widest uppercase text-xs">Zofia Kowalska, Właścicielka</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-[#1D1D1F] rounded-[3rem] p-8 lg:p-16 text-white grid lg:grid-cols-2 gap-16 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">Odwiedź nas w Bydgoszczy</h2>

          <div className="space-y-10">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-3 font-bold">Adres</p>
              <p className="text-2xl font-medium leading-tight">
                {BUSINESS_INFO.address.street}<br />
                {BUSINESS_INFO.address.zip} {BUSINESS_INFO.address.city}
              </p>
              <p className="text-gray-500 mt-2">{BUSINESS_INFO.address.description}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-3 font-bold">Kontakt</p>
              <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="text-2xl font-medium block hover:text-[#004D40] transition-colors">{BUSINESS_INFO.contact.phone}</a>
              <a href={`mailto:${BUSINESS_INFO.contact.email}`} className="text-lg text-gray-400 block mt-1">{BUSINESS_INFO.contact.email}</a>
            </div>

            <div>
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-3 font-bold">Godziny Otwarcia</p>
              {BUSINESS_INFO.openingHours.map((h, i) => (
                <p key={i} className="text-lg">
                  <span className="text-gray-400">{h.days}:</span> {h.hours}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden min-h-[400px] border border-white/5 relative z-10">
          {/* Simple map placeholder - in real prod use Google Maps Embed API */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m3!1d2393.7508499238385!2d17.94363247735313!3d53.124578191289195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470313f8373b754f%3A0x6b168e647c2084c8!2sNakielska%20156%2C%2085-391%20Bydgoszcz!5e0!3m2!1spl!2spl!4v1714420000000!5m2!1spl!2spl"
            className="w-full h-full grayscale opacity-80 contrast-125"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-white border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#004D40] rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="font-display font-bold text-lg">Księgowa Dla Ciebie</span>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <a href="#" className="hover:text-black transition-colors">Polityka Prywatności</a>
          <a href="#" className="hover:text-black transition-colors">Cookies</a>
          <a href="#" className="hover:text-black transition-colors">GDPR / RODO</a>
        </div>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} {BUSINESS_INFO.name}. Projekt: Modern Accountant.
        </p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="antialiased">
      <Header />
      <Hero />
      <Services />
      <WhyChooseUs />
      <React.Suspense fallback={<div className="py-24 text-center text-gray-500">Ładowanie kalkulatora...</div>}>
        <Calculator />
      </React.Suspense>
      <Contact />
      <Footer />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-6 left-6 right-6 z-40 md:hidden">
        <Button variant="primary" className="w-full shadow-studio-hover backdrop-blur-xl" onClick={() => window.location.href = 'tel:+48694908338'}>
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Umów darmową konsultację
        </Button>
      </div>
    </div>
  );
}
