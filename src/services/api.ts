import type { Report, PointHistory, RankingItem, CompareResult } from '@/types'

const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}`
  : '/api'

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(BASE + path, {
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return null
    return res.json() as Promise<T>
  } catch {
    return null
  }
}

export const api = {
  latestReport: () =>
    get<Report>('/reports/latest'),

  listReports: () =>
    get<{ total: number; reports: Report[] }>('/reports/'),

  reportByDate: (date: string) =>
    get<Report>(`/reports/${date}`),

  listBeaches: () =>
    get<{ total: number; points: Report[] }>('/beaches/'),

  pointHistory: (number: number, limit = 16) =>
    get<PointHistory>(`/beaches/${number}/history?limit=${limit}`),

  pointTrend: (number: number, weeks = 5) =>
    get<{ trend: string; latest_category: string }>
      (`/beaches/${number}/trend?weeks=${weeks}`),

  ranking: (limit = 20) =>
    get<{ total: number; ranking: RankingItem[] }>(`/ranking?limit=${limit}`),

  compare: (before: string, after: string) =>
    get<CompareResult>(`/compare?before=${before}&after=${after}`),

  triggerUpdate: () =>
    fetch(BASE + '/update', { method: 'POST' }).then(r => r.json()).catch(() => null),
}