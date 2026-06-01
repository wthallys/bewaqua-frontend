// ── Measurement point within a report ────────────────────────────────────────
export interface Point {
  id:             number
  report_id:      number
  point_number:   number
  collected_at:   string        // "2026-02-24"
  rainy:          boolean
  temperature:    number | null
  collected_time: string        // "07:25"
  category:       'suitable' | 'unsuitable'
  beach_name:     string
  address:        string
  lat:            number | null
  lon:            number | null
}

// ── Weekly report ─────────────────────────────────────────────────────────────
export interface Report {
  id:           number
  reab:         string          // "08/2026"
  collected_at: string          // "2026-02-24"
  responsible:  string | null
  source_file:  string | null
  total_points: number
  suitable:     number
  unsuitable:   number
  rainy_points: number
  avg_temp:     number | null
  max_temp:     number | null
  min_temp:     number | null
  imported_at:  string
  points?:      Point[]
}

// ── History of a single beach point ──────────────────────────────────────────
export interface HistoryEntry {
  collected_at:   string
  reab:           string
  category:       'suitable' | 'unsuitable'
  temperature:    number | null
  rainy:          number          // 0 | 1 from SQLite
  collected_time: string
  beach_name:     string
}

export interface PointHistory {
  point:      number
  beach_name: string
  total:      number
  history:    HistoryEntry[]
}

// ── Ranking ───────────────────────────────────────────────────────────────────
export interface RankingItem {
  number:           number
  beach_name:       string
  address:          string
  total_weeks:      number
  unsuitable_weeks: number
  pct_unsuitable:   number
  avg_temperature:  number
}

// ── Comparison ────────────────────────────────────────────────────────────────
export interface CompareItem {
  number:          number
  beach_name:      string
  category_before: 'suitable' | 'unsuitable' | null
  category_after:  'suitable' | 'unsuitable' | null
  change:          'improved' | 'worsened' | 'unchanged'
}

export interface CompareResult {
  before:    string
  after:     string
  summary: {
    improved:  number
    worsened:  number
    unchanged: number
  }
  improved:  CompareItem[]
  worsened:  CompareItem[]
  unchanged: CompareItem[]
}
