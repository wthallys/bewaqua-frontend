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
      <div className="bg-white border border-cinza-borda rounded-xl overflow-hidden">
        <div className="grid grid-cols-[44px_1fr_120px_90px] gap-4 px-5 py-3 border-b border-cinza-borda text-xs text-cinza font-medium uppercase tracking-wide">
          <span className="text-center">#</span>
          <span>Ponto</span>
          <span className="text-right">Impróprias</span>
          <span className="text-right">% Impr.</span>
        </div>

        {data?.map((r, i) => (
          <div
            key={r.number}
            className="grid grid-cols-[44px_1fr_120px_90px] gap-4 px-5 py-4 border-b border-cinza-borda/50 last:border-0 items-center"
          >
            <div
              className="font-display text-xl text-center leading-none"
              style={{ color: i < 3 ? '#A32D2D' : '#D3D1C7' }}
            >
              {i + 1}
            </div>

            <div>
              <div className="text-sm font-medium">{r.beach_name}</div>
              <div className="text-xs text-cinza mt-0.5">{r.address}</div>
              <div className="mt-2 h-1.5 rounded-full bg-verm-claro overflow-hidden">
                <div
                  className="h-full rounded-full bg-verm transition-all duration-700"
                  style={{ width: `${r.pct_unsuitable}%` }}
                />
              </div>
            </div>

            <div className="text-right text-sm text-cinza">
              {r.unsuitable_weeks}/{r.total_weeks} sem.
            </div>

            <div
              className="text-right font-display text-2xl leading-none"
              style={{ color: r.pct_unsuitable >= 50 ? '#A32D2D' : '#5F5E5A' }}
            >
              {r.pct_unsuitable}%
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
