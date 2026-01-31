
import { BusinessData, Service } from '../types';

export const BUSINESS_INFO: BusinessData = {
  name: "Biuro rachunkowe Księgowa Dla Ciebie Bydgoszcz",
  address: {
    street: "Nakielska 156/1 piętro",
    city: "Bydgoszcz",
    zip: "85-391",
    description: "Łatwy dojazd, parking dla klientów bezpośrednio pod biurem."
  },
  contact: {
    phone: "+48 694 908 338",
    email: "biuro@ksiegowadlaciebie.pl"
  },
  openingHours: [
    { days: "Poniedziałek - Piątek", hours: "08:00 - 16:00" },
    { days: "Sobota - Niedziela", hours: "Zamknięte (kontakt mailowy)" }
  ]
};

export const SERVICES: Service[] = [
  {
    id: "full-accounting",
    title: "Pełna Księgowość",
    description: "Kompleksowe prowadzenie ksiąg rachunkowych dla spółek kapitałowych (z o.o., S.A.) oraz fundacji i stowarzyszeń.",
    icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"
  },
  {
    id: "kpir",
    title: "KPiR i Ryczałt",
    description: "Profesjonalna obsługa jednoosobowych działalności gospodarczych. Optymalizacja formy opodatkowania.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  {
    id: "kadry-place",
    title: "Kadry i Płace",
    description: "Obsługa umów o pracę, zlecenia oraz o dzieło. Rozliczenia ZUS, PFRON i kompleksowa dokumentacja pracownicza.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  },
  {
    id: "consulting",
    title: "Doradztwo Biznesowe",
    description: "Pomoc w rejestracji firmy, wybór najkorzystniejszej formy prawnej i bieżące wsparcie w rozwoju biznesu.",
    icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }
];

export const TRUST_FACTORS = [
  {
    title: "Lokalne Doświadczenie",
    description: "Znamy specyfikę bydgoskiego rynku i urzędów skarbowych."
  },
  {
    title: "Nowoczesne Narzędzia",
    description: "Pracujemy w chmurze, oferując podgląd wyników online 24/7."
  },
  {
    title: "Bezpieczeństwo",
    description: "Posiadamy pełne ubezpieczenie OC oraz certyfikaty MF."
  }
];
