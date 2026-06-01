import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { HistoryBars } from '@/components/charts/HistoryBars'
import { api } from '@/services/api'
import type { Point, HistoryEntry } from '@/types'

interface PointModalProps {
  point:    Point
  onClose:  () => void
}

export function PointModal({ point, onClose }: PointModalProps) {
  const [history, setHistory] = useState<HistoryEntry[] | null>(null)

  useEffect(() => {
    api.pointHistory(point.point_number, 10).then(d => {
      setHistory(d?.history ?? buildDemoHistory(point))
    })
  }, [point.point_number])

  const suitable   = history?.filter(h => h.category === 'suitable').length ?? 0
  const total      = history?.length ?? 0
  const pct        = total ? Math.round((suitable / total) * 100) : 0

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-end bg-[#2C2C2A]/50"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="mx-auto max-h-[82vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white px-5 py-6 animate-slide-up sm:px-7">
        <div className="w-10 h-1 bg-cinza-borda rounded mx-auto mb-5" />

        <div className="flex justify-between items-start gap-4 mb-5">
          <div>
            <p className="text-xs text-cinza mb-1">Ponto {point.point_number}</p>
            <h2 className="font-display text-2xl font-normal leading-tight">{point.beach_name}</h2>
            <p className="text-sm text-cinza mt-1">{point.address}</p>
          </div>
          <Badge category={point.category} />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {[
            { val: point.temperature ? `${point.temperature}°C` : '—', lbl: 'Temperatura' },
            { val: point.collected_time || '—',                          lbl: 'Hora coleta'  },
            { val: point.rainy ? 'Sim' : 'Não',                          lbl: 'Chuva'        },
          ].map(m => (
            <div key={m.lbl} className="bg-fundo border border-cinza-borda rounded-lg py-2.5 text-center">
              <div className="font-medium text-base leading-none">{m.val}</div>
              <div className="text-[10px] text-cinza mt-1.5">{m.lbl}</div>
            </div>
          ))}
        </div>

        <p className="text-xs font-medium text-cinza uppercase tracking-widest mb-3">
          Histórico recente
        </p>

        {!history ? <Spinner label="Buscando histórico..." /> : (
          <>
            <div className="flex justify-between items-end mb-1">
              <span className="text-sm text-cinza">{total} semanas analisadas</span>
              <span
                className="font-display text-3xl leading-none"
                style={{ color: pct >= 50 ? '#0F6E56' : '#A32D2D' }}
              >
                {pct}%
              </span>
            </div>
            <p className="text-xs text-cinza mb-4">próprias para banho</p>

            <HistoryBars history={history} height={72} />

            <div className="mt-6 divide-y divide-cinza-borda/50">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-cinza w-28">{h.collected_at}</span>
                  <Badge category={h.category} size="sm" />
                  <span className="w-14 text-right">{h.temperature ?? '—'}°C</span>
                  <span className="text-base">{h.rainy ? '☁' : '☀'}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 border border-cinza-borda rounded-xl text-sm text-cinza hover:bg-cinza-claro transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}

function buildDemoHistory(point: Point): HistoryEntry[] {
  return Array.from({ length: 8 }, (_, i) => ({
    collected_at:   `2026-02-${String(24 - i * 7).padStart(2, '0')}`,
    reab:           `0${8 - i}/2026`,
    category:       ([0, 3, 6].includes(i) ? 'suitable' : 'unsuitable') as 'suitable' | 'unsuitable',
    temperature:    +((point.temperature ?? 27) - i * 0.15 + 0.2).toFixed(1),
    rainy:          i === 2 ? 1 : 0,
    collected_time: point.collected_time,
    beach_name:     point.beach_name,
  }))
}
