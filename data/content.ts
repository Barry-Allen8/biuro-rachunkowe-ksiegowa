import { BusinessData, Service } from '../types';

// SEO-optimized business information for Bydgoszcz
export const BUSINESS_INFO: BusinessData = {
  name: "Biuro Rachunkowe Księgowa Dla Ciebie",
  fullName: "Biuro Rachunkowe Księgowa Dla Ciebie - Bydgoszcz Nakielska",
  address: {
    street: "ul. Nakielska 156, I piętro",
    city: "Bydgoszcz",
    zip: "85-391",
    description: "Dogodna lokalizacja z bezpłatnym parkingiem. Łatwy dojazd z centrum Bydgoszczy."
  },
  contact: {
    phone: "+48 694 908 338",
    email: "biuro@ksiegowadlaciebie.pl"
  },
  openingHours: [
    { days: "Poniedziałek - Piątek", hours: "08:00 - 16:00" },
    { days: "Sobota", hours: "Po wcześniejszym umówieniu" },
    { days: "Niedziela", hours: "Zamknięte" }
  ],
  // Legal business identifiers - UPDATE WITH REAL VALUES
  legal: {
    nip: "[ENTER_NIP]",
    regon: "[ENTER_REGON]",
  }
};

// SEO-optimized services for "Biuro Rachunkowe Bydgoszcz"
export const SERVICES: Service[] = [
  {
    id: "pelna-ksiegowosc",
    title: "Pełna Księgowość",
    shortTitle: "Pełna Księgowość Bydgoszcz",
    description: "Kompleksowe prowadzenie ksiąg rachunkowych dla spółek z o.o., S.A., fundacji i stowarzyszeń. Rozliczenia CIT, VAT i profesjonalna obsługa zgodna z Ustawą o Rachunkowości.",
    features: [
      "Prowadzenie ksiąg handlowych",
      "Rozliczenia CIT i VAT",
      "Sprawozdania finansowe",
      "Raporty dla zarządu"
    ],
    icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"
  },
  {
    id: "kpir-ryczalt",
    title: "Księga Przychodów i Rozchodów",
    shortTitle: "KPiR i Ryczałt Bydgoszcz",
    description: "Profesjonalna obsługa jednoosobowych działalności gospodarczych (JDG). KPiR, ryczałt ewidencjonowany, rozliczenia PIT i VAT. Pomoc w wyborze optymalnej formy opodatkowania.",
    features: [
      "Księga Przychodów i Rozchodów (KPiR)",
      "Ryczałt ewidencjonowany",
      "Rozliczenia PIT i VAT",
      "Optymalizacja podatkowa"
    ],
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  {
    id: "kadry-place",
    title: "Obsługa Kadr i Płac",
    shortTitle: "Kadry i Płace Bydgoszcz",
    description: "Kompleksowa obsługa kadrowo-płacowa. Umowy o pracę, zlecenia, dzieło. Rozliczenia ZUS, PFRON, składki społeczne i pełna dokumentacja pracownicza.",
    features: [
      "Listy płac i rozliczenia ZUS",
      "Deklaracje ZUS i PFRON",
      "Umowy o pracę i cywilnoprawne",
      "Akta osobowe i dokumentacja"
    ],
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  },
  {
    id: "podatki-doradztwo",
    title: "Podatki i Doradztwo",
    shortTitle: "Doradztwo Podatkowe Bydgoszcz",
    description: "Profesjonalne doradztwo w zakresie prawa podatkowego. Rozliczenia CIT, PIT, VAT. Optymalizacja obciążeń, pomoc przy kontrolach skarbowych i reprezentacja przed US.",
    features: [
      "Rozliczenia CIT, PIT, VAT",
      "Optymalizacja podatkowa",
      "Pomoc przy kontrolach US",
      "Planowanie podatkowe"
    ],
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  }
];

// Trust indicators for authority building
export const TRUST_BADGES = [
  {
    id: "certyfikat-mf",
    title: "Certyfikat Ministra Finansów",
    shortTitle: "Certyfikat MF",
    description: "Posiadamy uprawnienia wydane przez Ministra Finansów do usługowego prowadzenia ksiąg rachunkowych.",
    icon: "certificate"
  },
  {
    id: "ubezpieczenie-oc",
    title: "Ubezpieczenie OC",
    shortTitle: "Ubezpieczenie OC",
    description: "Pełne ubezpieczenie odpowiedzialności cywilnej chroniące Twój biznes.",
    icon: "shield"
  },
  {
    id: "referencje",
    title: "Referencje Klientów",
    shortTitle: "150+ Klientów",
    description: "Ponad 150 zadowolonych firm w Bydgoszczy i okolicach powierzyło nam swoje finanse.",
    icon: "users"
  }
];

// Why choose us - competitive advantages
export const TRUST_FACTORS = [
  {
    id: "terminowosc",
    title: "Terminowość",
    description: "Gwarantujemy terminowe rozliczenia i składanie deklaracji. Żadnych opóźnień ani kar.",
    icon: "clock"
  },
  {
    id: "bezpieczenstwo",
    title: "Bezpieczeństwo Danych",
    description: "Nowoczesne zabezpieczenia IT i szyfrowanie danych. Pełna zgodność z RODO.",
    icon: "lock"
  },
  {
    id: "indywidualne-podejscie",
    title: "Indywidualne Podejście",
    description: "Każdy klient to dla nas partner. Dostosowujemy rozwiązania do Twoich potrzeb.",
    icon: "heart"
  },
  {
    id: "dostepnosc",
    title: "Stały Kontakt",
    description: "Dedykowany opiekun dostępny telefonicznie i mailowo. Szybka reakcja na pytania.",
    icon: "phone"
  }
];

// Pricing tiers for the pricing section - JDG, Spółki, Kadry
export const PRICING_TIERS = [
  {
    id: "jdg",
    name: "JDG / Ryczałt",
    subtitle: "Jednoosobowa Działalność Gospodarcza",
    priceFrom: 250,
    priceTo: 400,
    currency: "PLN",
    period: "netto / mies.",
    description: "Idealne dla przedsiębiorców prowadzących jednoosobową działalność gospodarczą.",
    features: [
      "Księga Przychodów i Rozchodów (KPiR)",
      "Ryczałt ewidencjonowany",
      "Rozliczenia PIT i VAT",
      "Deklaracje do Urzędu Skarbowego",
      "Kontakt mailowy i telefoniczny",
      "Dostęp do platformy online"
    ],
    highlighted: false,
    cta: "Zapytaj o wycenę"
  },
  {
    id: "spolki",
    name: "Spółki",
    subtitle: "Sp. z o.o., S.A., spółki osobowe",
    priceFrom: 700,
    priceTo: 1500,
    currency: "PLN",
    period: "netto / mies.",
    description: "Kompleksowa pełna księgowość dla spółek kapitałowych i osobowych.",
    features: [
      "Pełna księgowość (księgi handlowe)",
      "Rozliczenia CIT i VAT",
      "Sprawozdania finansowe",
      "Raporty zarządcze",
      "Dedykowany opiekun",
      "Priorytetowa obsługa"
    ],
    highlighted: true,
    badge: "Najpopularniejszy",
    cta: "Zapytaj o wycenę"
  },
  {
    id: "kadry",
    name: "Kadry i Płace",
    subtitle: "Obsługa kadr i płac",
    priceFrom: 60,
    priceTo: 100,
    currency: "PLN",
    period: "za pracownika / mies.",
    description: "Profesjonalna obsługa kadrowo-płacowa. Rozliczenia ZUS, PFRON, dokumentacja pracownicza.",
    features: [
      "Listy płac i rozliczenia",
      "Deklaracje ZUS i składki społeczne",
      "Umowy o pracę i cywilnoprawne",
      "Akta osobowe pracowników",
      "Świadectwa pracy",
      "Rozliczenia PFRON"
    ],
    highlighted: false,
    cta: "Zapytaj o wycenę"
  }
];

// Testimonials for social proof
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Anna Kowalska",
    company: "Kowalska Design Studio",
    role: "Właścicielka",
    content: "Współpracujemy od 3 lat. Profesjonalizm, terminowość i zawsze pomocna obsługa. Polecam każdemu przedsiębiorcy w Bydgoszczy!",
    rating: 5
  },
  {
    id: 2,
    name: "Marek Nowicki",
    company: "TechByd Sp. z o.o.",
    role: "Prezes Zarządu",
    content: "Wreszcie znalazłem biuro rachunkowe, które rozumie potrzeby rozwijającej się firmy IT. Świetna komunikacja i elastyczność.",
    rating: 5
  },
  {
    id: 3,
    name: "Katarzyna Wiśniewska",
    company: "Sklep Internetowy KateShop",
    role: "Właścicielka",
    content: "Od początku mojej działalności korzystam z usług tego biura. Pomoc przy wyborze formy opodatkowania była bezcenna.",
    rating: 5
  }
];

// FAQ for SEO and user education
export const FAQ_ITEMS = [
  {
    question: "Ile kosztuje księgowość dla jednoosobowej działalności w Bydgoszczy?",
    answer: "Ceny księgowości dla JDG zaczynają się od 250 PLN netto miesięcznie. Dokładna cena zależy od liczby dokumentów i zakresu usług. Oferujemy bezpłatną wycenę."
  },
  {
    question: "Czy prowadzicie księgowość online?",
    answer: "Tak! Oferujemy pełną obsługę online. Dokumenty możesz przesyłać elektronicznie, a dostęp do raportów masz 24/7 przez naszą platformę."
  },
  {
    question: "Jak szybko mogę rozpocząć współpracę?",
    answer: "Proces rozpoczęcia współpracy trwa zazwyczaj 1-2 dni robocze. Po podpisaniu umowy przejmujemy dokumentację i zaczynamy działać."
  },
  {
    question: "Czy pomagacie w zakładaniu firmy?",
    answer: "Tak, oferujemy kompleksową pomoc przy rejestracji działalności gospodarczej, w tym wybór formy prawnej i optymalizację podatkową od pierwszego dnia."
  }
];

// SEO metadata
export const SEO_CONTENT = {
  title: "Biuro Rachunkowe Bydgoszcz – Kompleksowa Księgowość i Kadry | Nakielska 156",
  description: "Biuro Rachunkowe Bydgoszcz ul. Nakielska 156 – pełna księgowość, KPiR, ryczałt, kadry i płace. Rozliczenia CIT, PIT, VAT, ZUS. Certyfikat Ministra Finansów, ubezpieczenie OC. Tel: 694 908 338",
  keywords: [
    "biuro rachunkowe bydgoszcz",
    "księgowa bydgoszcz nakielska",
    "pełna księgowość bydgoszcz",
    "obsługa kadr i płac bydgoszcz",
    "księgowość dla spółek bydgoszcz",
    "doradca podatkowy bydgoszcz",
    "KPiR bydgoszcz",
    "Księga Przychodów i Rozchodów",
    "ryczałt bydgoszcz",
    "rozliczenia VAT bydgoszcz",
    "rozliczenia CIT bydgoszcz",
    "rozliczenia PIT bydgoszcz",
    "ZUS bydgoszcz",
    "podatki bydgoszcz"
  ]
};
