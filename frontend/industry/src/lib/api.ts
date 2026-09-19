export const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export type Company = {
  id: number;
  name: string;
  email: string;
  industry_type?: string | null;
  description?: string | null;
  website?: string | null;
  location?: string | null;
  logo_url?: string | null;
  contact_phone?: string | null;
};

export type Internship = {
  id: number;
  company_id: number;
  title: string;
  description?: string | null;
  location?: string | null;
  duration?: string | null;
  stipend?: string | null;
  mode?: string | null;
  deadline?: string | null;
  status?: string | null;
  posted_at?: string | null;
  skills: string[];
  application_count: number;
};

export type Application = {
  id: number;
  student_id: number;
  internship_id: number;
  status: string;
  applied_at?: string | null;
  student: { id: number; name: string; email: string; branch?: string | null; college?: string | null } | null;
  internship: { id: number; title: string } | null;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
};

export type Summary = {
  active_postings: number;
  applicants: number;
  shortlisted: number;
  offers: number;
  accepted: number;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers ?? {}),
    },
  });

  const text = await response.text();
  let body: unknown = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!response.ok) {
    const detail = typeof body === "object" && body !== null && "detail" in body
      ? String((body as { detail?: unknown }).detail ?? "Request failed")
      : `Request failed (${response.status})`;
    throw new Error(detail);
  }
  return body as T;
}

export const api = {
  login: (email: string, password: string) =>
    request<{ authenticated: boolean; user: Company }>("/auth/company/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (payload: { name: string; email: string; password: string; industry_type?: string; location?: string; description?: string }) =>
    request<Company>("/auth/company/register", { method: "POST", body: JSON.stringify(payload) }),
  company: (id: number) => request<Company>(`/companies/${id}`),
  summary: (id: number) => request<Summary>(`/companies/${id}/summary`),
  internships: (id: number) => request<Internship[]>(`/companies/${id}/internships`),
  applications: (id: number) => request<Application[]>(`/companies/${id}/applications`),
  skills: () => request<{ items: { id: number; name: string }[] }>("/api/skills?limit=200"),
  createInternship: (companyId: number, payload: { title: string; description?: string; location?: string; duration?: string; stipend?: string; mode?: string; deadline?: string; status?: string; required_skills: string[] }) =>
    request<Internship>(`/companies/${companyId}/internships`, { method: "POST", body: JSON.stringify(payload) }),
  updateInternship: (companyId: number, internshipId: number, payload: { status?: string }) =>
    request<Internship>(`/companies/${companyId}/internships/${internshipId}`, { method: "PATCH", body: JSON.stringify(payload) }),
  updateApplication: (companyId: number, applicationId: number, status: string) =>
    request<Application>(`/companies/${companyId}/applications/${applicationId}`, { method: "PATCH", body: JSON.stringify({ status }) }),
};
