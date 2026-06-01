export type CustomerRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  location?: string;
};

/** Seed customer database — replace with CRM/database lookup in production. */
const customerDatabase: CustomerRecord[] = [
  {
    id: "CUST-001",
    fullName: "Gokulakannan M",
    email: "gokul@bavanex.com",
    phone: "+32465119690",
    company: "Bavanex Technologies",
    location: "Belgium",
  },
  {
    id: "CUST-002",
    fullName: "Sandeep Shenoy",
    email: "sandeep@example.com",
    phone: "+919876543210",
    company: "TechCorp India",
    location: "Chennai",
  },
  {
    id: "CUST-003",
    fullName: "Nikita Reddy",
    email: "nikita@example.com",
    phone: "+31612345678",
    company: "EuroSoft BV",
    location: "Netherlands",
  },
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[\s\-().+]/g, "");
}

export function validateCustomer(input: string): CustomerRecord | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const normalizedInput = normalize(trimmed);
  const emailInput = trimmed.includes("@") ? trimmed.toLowerCase() : null;

  for (const customer of customerDatabase) {
    if (customer.id.toLowerCase() === trimmed.toLowerCase()) return customer;
    if (emailInput && customer.email.toLowerCase() === emailInput) return customer;
    if (normalize(customer.phone).includes(normalizedInput) || normalizedInput.includes(normalize(customer.phone)))
      return customer;
    if (customer.company && normalize(customer.company).includes(normalizedInput)) return customer;
    if (normalize(customer.fullName).includes(normalizedInput)) return customer;
  }

  return null;
}

export function generateCustomerRef(): string {
  const year = new Date().getFullYear();
  const seq = String(Date.now()).slice(-6);
  return `CUST-${year}-${seq}`;
}
