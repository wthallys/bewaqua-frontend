import { useState, useCallback } from 'react'
import { PageLayout }  from '@/components/layout/PageLayout'
import { Badge }       from '@/components/ui/Badge'
import { Spinner }     from '@/components/ui/Spinner'
import { HistoryBars } from '@/components/charts/HistoryBars'
import { api }         from '@/services/api'
import { DEMO_REPORT } from '@/services/demo'
import type { PointHistory } from '@/types'

const POINT_OPTIONS = DEMO_REPORT.points!.map(p => ({
  number: p.point_number,
  label:  `${p.point_number} — ${p.beach_name}`,
}))

export function History() {
  const [pointNumber, setPointNumber] = useState(25)
  const [data,        setData]        = useState<PointHistory | null>(null)
  const [loading,     setLoading]     = useState(false)

  const fetch = useCallback(async (number: number) => {
    setLoading(true)
    const d = await api.pointHistory(number, 16)
    if (d) {
      setData(d)
    } else {
      const point = DEMO_REPORT.points!.find(p => p.point_number === number)!
      setData({
        point:      number,
        beach_name: point.beach_name,
        total:      8,
        history:    Array.from({ length: 8 }, (_, i) => ({
          collected_at:   `2026-02-${String(24 - i * 7).padStart(2, '0')}`,
          reab:           `0${8 - i}/2026`,
          category:       ([0, 3, 6].includes(i) ? 'suitable' : 'unsuitable') as 'suitable' | 'unsuitable',
          temperature:    +((point.temperature ?? 27) - i * 0.15 + 0.2).toFixed(1),
          rainy:          i === 2 ? 1 : 0,
          collected_time: point.collected_time,
          beach_name:     point.beach_name,
        })),
      })
    }
    setLoading(false)
  }, [])

  const history    = data?.history ?? []
  const suitable   = history.filter(h => h.category === 'suitable').length
  const total      = history.length
  const pct        = total ? Math.round((suitable / total) * 100) : 0

  return (
    <PageLayout
      titulo="Histórico"
      subtitulo="Evolução semanal de um ponto de coleta ao longo do tempo"
    >
      <div className="flex flex-wrap gap-3 items-center mb-8">
        <label className="text-sm text-cinza">Ponto de coleta:</label>
        <select
          value={pointNumber}
          onChange={e => setPointNumber(+e.target.value)}
          className="border border-cinza-borda rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-verde-mid"
        >
          {POINT_OPTIONS.map(p => (
            <option key={p.number} value={p.number}>{p.label}</option>
          ))}
        </select>
        <button
          onClick={() => fetch(pointNumber)}
          className="px-4 py-1.5 bg-verde text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
        >
          Buscar
        </button>
      </div>

      {loading && <Spinner />}

      {!loading && data && (
        <>
          <div className="bg-white border border-cinza-borda rounded-xl p-6 mb-6">
            <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
              <div>
                <p className="text-xs text-cinza mb-1">Ponto {data.point}</p>
                <h2 className="font-display text-2xl font-normal">{data.beach_name}</h2>
              </div>
              <div className="text-right">
                <div
                  className="font-display text-5xl leading-none"
                  style={{ color: pct >= 50 ? '#0F6E56' : '#A32D2D' }}
                >
                  {pct}%
                </div>
                <p className="text-xs text-cinza mt-1">de semanas próprias</p>
              </div>
            </div>

            <HistoryBars history={history} height={80} />

            <div className="flex justify-between text-xs text-cinza mt-3">
              <span>Próprias: <strong className="text-verde">{suitable}</strong></span>
              <span>Impróprias: <strong className="text-verm">{total - suitable}</strong></span>
              <span>últimas {total} semanas</span>
            </div>
          </div>

          <div className="bg-white border border-cinza-borda rounded-xl overflow-hidden">
            <div className="grid grid-cols-[140px_1fr_110px_70px_44px] gap-4 px-5 py-3 border-b border-cinza-borda text-xs text-cinza font-medium uppercase tracking-wide">
              <span>Data</span>
              <span>Situação</span>
              <span>Categoria</span>
              <span className="text-right">Temp.</span>
              <span className="text-right">Chuva</span>
            </div>
            {history.map((h, i) => (
              <div
                key={i}
                className="grid grid-cols-[140px_1fr_110px_70px_44px] gap-4 px-5 py-3 items-center text-sm border-b border-cinza-borda/50 last:border-0"
              >
                <span className="text-cinza">{h.collected_at}</span>
                <div className="h-2 rounded bg-cinza-claro overflow-hidden">
                  <div
                    className="h-full rounded"
                    style={{ width: '100%', background: h.category === 'suitable' ? '#1D9E75' : '#A32D2D' }}
                  />
                </div>
                <Badge category={h.category} size="sm" />
                <span className="text-right">{h.temperature ?? '—'}°C</span>
                <span className="text-right text-base">{h.rainy ? '☁' : '☀'}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && !data && (
        <div className="text-center text-cinza py-16">
          Selecione um ponto e clique em Buscar
        </div>
      )}
    </PageLayout>
  )
}
