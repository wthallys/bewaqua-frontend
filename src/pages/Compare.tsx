import { useEffect, useState } from 'react'
import { PageLayout }   from '@/components/layout/PageLayout'
import { Spinner }      from '@/components/ui/Spinner'
import { api }          from '@/services/api'
import { DEMO_REPORTS, DEMO_COMPARE } from '@/services/demo'
import type { Report, CompareResult, CompareItem } from '@/types'

export function Compare() {
  const [reports,  setReports]  = useState<Report[]>([])
  const [before,   setBefore]   = useState('')
  const [after,    setAfter]    = useState('')
  const [result,   setResult]   = useState<CompareResult | null>(null)
  const [loading,  setLoading]  = useState(false)
  const [loadingList, setLoadingList] = useState(true)

  useEffect(() => {
    api.listReports().then(d => {
      const list = d?.reports ?? DEMO_REPORTS
      setReports(list)
      if (list.length >= 2) {
        setBefore(list[1].collected_at)
        setAfter(list[0].collected_at)
      }
      setLoadingList(false)
    })
  }, [])

  const compare = async () => {
    if (!before || !after || before === after) return
    setLoading(true)
    const d = await api.compare(before, after)
    setResult(d ?? DEMO_COMPARE)
    setLoading(false)
  }

  const fmt = (d: string) => d.split('-').reverse().join('/')

  return (
    <PageLayout
      titulo="Comparativo"
      subtitulo="Compare dois relatórios e veja o que mudou semana a semana"
    >
      <div className="mb-8 rounded-xl border border-cinza-borda bg-white p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
          <div className="space-y-1.5">
            <label className="block text-sm text-cinza">De:</label>
            <select
              value={before}
              onChange={e => setBefore(e.target.value)}
              disabled={loadingList}
              className="w-full border border-cinza-borda rounded-lg bg-white px-3 py-2 text-sm focus:border-verde-mid focus:outline-none"
            >
              {reports.map(r => (
                <option key={r.collected_at} value={r.collected_at}>
                  {fmt(r.collected_at)} — {r.reab}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm text-cinza">Para:</label>
            <select
              value={after}
              onChange={e => setAfter(e.target.value)}
              disabled={loadingList}
              className="w-full border border-cinza-borda rounded-lg bg-white px-3 py-2 text-sm focus:border-verde-mid focus:outline-none"
            >
              {reports.map(r => (
                <option key={r.collected_at} value={r.collected_at}>
                  {fmt(r.collected_at)} — {r.reab}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={compare}
            disabled={!before || !after || before === after || loading}
            className="w-full rounded-lg bg-verde px-4 py-2 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-40 md:w-auto"
          >
            Comparar
          </button>
        </div>
      </div>

      {loading && <Spinner />}

      {result && !loading && (
        <>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { num: result.summary.improved,  label: 'Melhoraram',  color: '#0F6E56' },
              { num: result.summary.worsened,  label: 'Pioraram',    color: '#A32D2D' },
              { num: result.summary.unchanged, label: 'Sem mudança', color: '#5F5E5A' },
            ].map(s => (
              <div key={s.label} className="bg-white border border-cinza-borda rounded-xl px-5 py-4">
                <div className="font-display text-4xl leading-none mb-1" style={{ color: s.color }}>
                  {s.num}
                </div>
                <div className="text-sm text-cinza">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CompareColumn
              title={`↑ Melhoraram (${result.improved.length})`}
              items={result.improved}
              titleClass="text-verde"
              borderClass="border-verde-claro"
            />
            <CompareColumn
              title={`↓ Pioraram (${result.worsened.length})`}
              items={result.worsened}
              titleClass="text-verm"
              borderClass="border-verm-claro"
            />
            <CompareColumn
              title={`→ Sem mudança (${result.unchanged.length})`}
              items={result.unchanged}
              titleClass="text-cinza"
              borderClass="border-cinza-borda"
              truncate={8}
            />
          </div>
        </>
      )}
    </PageLayout>
  )
}

function CompareColumn({
  title, items, titleClass, borderClass, truncate,
}: {
  title:       string
  items:       CompareItem[]
  titleClass:  string
  borderClass: string
  truncate?:   number
}) {
  const list = truncate ? items.slice(0, truncate) : items

  return (
    <div className={`bg-white border rounded-xl p-4 ${borderClass}`}>
      <p className={`text-xs font-medium uppercase tracking-wide mb-3 pb-2.5 border-b ${borderClass} ${titleClass}`}>
        {title}
      </p>
      {list.length === 0 ? (
        <p className="text-sm text-cinza italic">Nenhuma</p>
      ) : (
        <div className="divide-y divide-cinza-borda/40">
          {list.map(p => (
            <div key={p.number} className="py-2 text-sm flex items-center gap-2">
              <span className="text-cinza">{p.number}</span>
              <span>{p.beach_name.replace(/^Praia d[aeo] /, 'P. ').replace(/^Rio /, 'R. ')}</span>
            </div>
          ))}
          {truncate && items.length > truncate && (
            <p className="text-xs text-cinza pt-2">+ {items.length - truncate} pontos</p>
          )}
        </div>
      )}
    </div>
  )
}
