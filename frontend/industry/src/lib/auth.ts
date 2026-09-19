import type { Company } from "./api";

const KEY = "aicp_company_user";

export function getStoredCompany(): Company | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as Company : null;
  } catch { return null; }
}

export function setStoredCompany(company: Company) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(company));
}

export function clearStoredCompany() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}
