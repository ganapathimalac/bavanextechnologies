type RecentTicket = {
  email: string;
  issueKey: string;
  ticketNumber: string;
  createdAt: number;
};

const recentTickets: RecentTicket[] = [];
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;

export function generateTicketNumber(): string {
  const year = new Date().getFullYear();
  const seq = String(Date.now()).slice(-6);
  return `SR-${year}-${seq}`;
}

function issueKey(serviceType: string, description: string): string {
  return `${serviceType.toLowerCase().slice(0, 20)}:${description.toLowerCase().slice(0, 40)}`;
}

export function findDuplicateTicket(
  email: string,
  serviceType: string,
  description: string
): RecentTicket | null {
  const key = issueKey(serviceType, description);
  const now = Date.now();
  const match = recentTickets.find(
    (t) => t.email === email.toLowerCase() && t.issueKey === key && now - t.createdAt < DUPLICATE_WINDOW_MS
  );
  return match ?? null;
}

export function registerTicket(email: string, serviceType: string, description: string, ticketNumber: string) {
  recentTickets.push({
    email: email.toLowerCase(),
    issueKey: issueKey(serviceType, description),
    ticketNumber,
    createdAt: Date.now(),
  });
  if (recentTickets.length > 500) recentTickets.splice(0, recentTickets.length - 500);
}
