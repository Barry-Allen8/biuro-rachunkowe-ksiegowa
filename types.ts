export interface Service {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  features?: string[];
  icon: string;
}

export interface BusinessData {
  name: string;
  fullName?: string;
  address: {
    street: string;
    city: string;
    zip: string;
    description: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  openingHours: {
    days: string;
    hours: string;
  }[];
  legal?: {
    nip: string;
    regon: string;
  };
}

export interface CalculationResult {
  min: number;
  max: number;
}

export interface LeadFormData {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  businessType: string;
  invoices: number;
  employees: number;
  isVatPayer: boolean;
}

export interface TrustBadge {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
}

export interface TrustFactor {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  priceFrom: number;
  priceTo: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
