import { useEffect, useState } from 'react'
import { PageLayout }  from '@/components/layout/PageLayout'
import { Spinner }     from '@/components/ui/Spinner'
import { api }         from '@/services/api'
import { DEMO_RANKING } from '@/services/demo'
import type { RankingItem } from '@/types'

export function Ranking() {
  const [data,    setData]    = useState<RankingItem[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.ranking(20).then(d => {
      setData(d?.ranking ?? DEMO_RANKING)
      setLoading(false)
    })
  }, [])

  if (loading) return <PageLayout titulo="Ranking"><Spinner /></PageLayout>

  return (
    <PageLayout
      titulo="Ranking"
      subtitulo="Pontos com maior frequência de semanas impróprias para banho"
    >
      <div className="overflow-hidden rounded-xl border border-cinza-borda bg-white">
        <div className="hidden grid-cols-[44px_minmax(0,1fr)_120px_90px] gap-4 border-b border-cinza-borda px-5 py-3 text-xs font-medium uppercase tracking-wide text-cinza md:grid">
          <span className="text-center">#</span>
          <span>Ponto</span>
          <span className="text-right">Impróprias</span>
          <span className="text-right">% Impr.</span>
        </div>

        {data?.map((r, i) => (
          <div
            key={r.number}
            className="border-b border-cinza-borda/50 px-4 py-4 last:border-0 md:grid md:grid-cols-[44px_minmax(0,1fr)_120px_90px] md:items-center md:gap-4 md:px-5"
          >
            <div className="flex items-start gap-3 md:contents">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FAF3F3] font-display text-xl leading-none md:h-auto md:w-auto md:rounded-none md:bg-transparent md:text-center"
                style={{ color: i < 3 ? '#A32D2D' : '#D3D1C7' }}
              >
                {i + 1}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3 md:block">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium md:truncate-none">{r.beach_name}</div>
                    <div className="mt-0.5 text-xs text-cinza">{r.address}</div>
                  </div>

                  <div
                    className="shrink-0 rounded-full bg-[#FAF3F3] px-2.5 py-1 font-display text-xl leading-none md:hidden"
                    style={{ color: r.pct_unsuitable >= 50 ? '#A32D2D' : '#5F5E5A' }}
                  >
                    {r.pct_unsuitable}%
                  </div>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-verm-claro/80 md:mt-2 md:h-1.5">
                  <div
                    className="h-full rounded-full bg-verm transition-all duration-700"
                    style={{ width: `${r.pct_unsuitable}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-cinza md:hidden">
                  <span>Semanas impróprias</span>
                  <span className="font-medium text-[#2C2C2A]">{r.unsuitable_weeks}/{r.total_weeks}</span>
                </div>
              </div>

              <div className="hidden text-right text-sm text-cinza md:block">
                {r.unsuitable_weeks}/{r.total_weeks} sem.
              </div>

              <div
                className="hidden text-right font-display text-2xl leading-none md:block"
                style={{ color: r.pct_unsuitable >= 50 ? '#A32D2D' : '#5F5E5A' }}
              >
                {r.pct_unsuitable}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
