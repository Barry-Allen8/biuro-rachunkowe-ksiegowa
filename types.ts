
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BusinessData {
  name: string;
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
