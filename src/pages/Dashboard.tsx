import { useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { StatCard }   from '@/components/ui/StatCard'
import { Badge }      from '@/components/ui/Badge'
import { Spinner }    from '@/components/ui/Spinner'
import { DemoWarning } from '@/components/ui/DemoWarning'
import { PointModal } from '@/components/PointModal'
import { useReport }  from '@/hooks/useReport'
import type { Point } from '@/types'

type Filter = 'all' | 'suitable' | 'unsuitable' | 'rainy'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all',        label: 'Todas'       },
  { id: 'suitable',   label: '✓ Próprias'  },
  { id: 'unsuitable', label: '✕ Impróprias'},
  { id: 'rainy',      label: 'Com chuva'   },
]

export function Dashboard() {
  const { report, loading, isDemo } = useReport()
  const [filter,       setFilter]   = useState<Filter>('all')
  const [search,       setSearch]   = useState('')
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null)

  if (loading) return <PageLayout titulo="Dashboard"><Spinner /></PageLayout>
  if (!report) return null

  const dateFmt = report.collected_at.split('-').reverse().join('/')

  const filtered = (report.points ?? []).filter(p => {
    if (filter === 'suitable'   && p.category !== 'suitable')   return false
    if (filter === 'unsuitable' && p.category !== 'unsuitable') return false
    if (filter === 'rainy'      && !p.rainy)                    return false
    if (search) {
      const q = search.toLowerCase()
      return p.beach_name.toLowerCase().includes(q) || p.address?.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <PageLayout
      titulo="Dashboard"
      subtitulo={`REAB ${report.reab} · Coleta em ${dateFmt}`}
    >
      {isDemo && <DemoWarning />}

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        <StatCard valor={report.total_points}                    label="Pontos monitorados" cor="cinza"  />
        <StatCard valor={report.suitable}                        label="Praias próprias"    cor="verde"  />
        <StatCard valor={report.unsuitable}                      label="Praias impróprias"  cor="verm"   />
        <StatCard valor={report.rainy_points}                    label="Com chuva"          cor="amber"  />
        <StatCard valor={(report.avg_temp ?? 0).toFixed(1) + '°C'} label="Temp. média"     cor="cinza"  />
      </div>

      <div className="mb-6 rounded-xl border border-cinza-borda bg-white p-3 sm:p-4">
        <div className="relative mb-3 sm:mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cinza text-base pointer-events-none">⌕</span>
          <input
            type="text"
            placeholder="Buscar praia..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-full border border-cinza-borda bg-white py-2 pl-8 pr-4 text-sm focus:border-verde-mid focus:outline-none sm:w-72"
          />
        </div>

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={[
                'shrink-0 rounded-full border px-4 py-2 text-sm transition-all',
                filter === f.id
                  ? f.id === 'unsuitable'
                    ? 'bg-verm border-verm text-white'
                    : 'bg-verde border-verde text-white'
                  : 'bg-white border-cinza-borda text-cinza hover:border-cinza',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-cinza-borda bg-white px-5 py-12 text-center text-cinza">
          Nenhum ponto encontrado com os filtros atuais.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(p => (
            <PointCard key={p.point_number} point={p} onClick={() => setSelectedPoint(p)} />
          ))}
        </div>
      )}

      {selectedPoint && (
        <PointModal point={selectedPoint} onClose={() => setSelectedPoint(null)} />
      )}
    </PageLayout>
  )
}

function PointCard({ point: p, onClick }: { point: Point; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative overflow-hidden rounded-xl border border-cinza-borda bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-cinza hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-verde-claro sm:p-5"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l"
        style={{ background: p.category === 'suitable' ? '#1D9E75' : '#A32D2D' }}
      />
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium leading-snug">{p.beach_name}</div>
          <div className="text-[12px] text-cinza mt-0.5">{p.address}</div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="text-[11px] text-cinza bg-cinza-claro px-2 py-0.5 rounded-lg">
            Ponto {p.point_number}
          </span>
          <Badge category={p.category} size="sm" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { val: p.temperature ? `${p.temperature}°` : '—', lbl: 'Temp'   },
          { val: p.collected_time || '—',                    lbl: 'Coleta' },
          { val: p.rainy ? '☁' : '☀',                       lbl: 'Clima'  },
        ].map(m => (
          <div key={m.lbl} className="rounded-lg border border-cinza-borda bg-fundo py-2 text-center">
            <div className="text-base font-medium leading-none">{m.val}</div>
            <div className="text-[10px] text-cinza mt-1">{m.lbl}</div>
          </div>
        ))}
      </div>
    </button>
  )
}
