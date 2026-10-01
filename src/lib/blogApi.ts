const API_URL = import.meta.env.VITE_BLOG_API_URL || "http://localhost:5000/api";
const UPLOADS_URL = import.meta.env.VITE_BLOG_UPLOADS_URL || "http://localhost:5000/uploads";
const TENANT = import.meta.env.VITE_BLOG_TENANT || "digital-spark";

export function getBlogImageUrl(image: string | null) {
  return image ? `${UPLOADS_URL}/${image}` : null;
}

export interface BlogAuthor {
  id: string;
  name: string;
}

export interface BlogCategory {
  id: string;
  name: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  image: string | null;
  tags: string | null;
  created_at: string;
  updated_at: string;
  category?: BlogCategory;
  user?: BlogAuthor;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  current_page: number;
  total: number;
  per_page: number;
  last_page: number;
}

interface SingleResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  const body = await res.json().catch(() => null);

  if (!res.ok || !body?.success) {
    throw new Error(body?.message || "Failed to load blog content");
  }

  return body;
}

export function getBlogPosts(page = 1, perPage = 9) {
  const params = new URLSearchParams({
    tenant: TENANT,
    page: String(page),
    per_page: String(perPage),
  });
  return request<PaginatedResponse<BlogPost>>(`/public/blogs?${params.toString()}`);
}

export function getBlogPostBySlug(slug: string) {
  const params = new URLSearchParams({ tenant: TENANT });
  return request<SingleResponse<BlogPost>>(`/public/blogs/${encodeURIComponent(slug)}?${params.toString()}`);
}
