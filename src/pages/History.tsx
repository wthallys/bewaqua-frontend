import { useState, useCallback, useEffect } from 'react'
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

  useEffect(() => {
    fetch(pointNumber)
  }, [fetch, pointNumber])

  const history    = data?.history ?? []
  const suitable   = history.filter(h => h.category === 'suitable').length
  const total      = history.length
  const pct        = total ? Math.round((suitable / total) * 100) : 0

  return (
    <PageLayout
      titulo="Histórico"
      subtitulo="Evolução semanal de um ponto de coleta ao longo do tempo"
    >
      <div className="mb-8 rounded-xl border border-cinza-borda bg-white p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="space-y-1.5">
            <label className="block text-sm text-cinza">Ponto de coleta:</label>
            <select
              value={pointNumber}
              onChange={e => setPointNumber(+e.target.value)}
              className="w-full rounded-lg border border-cinza-borda bg-white px-3 py-2 text-sm focus:border-verde-mid focus:outline-none"
            >
              {POINT_OPTIONS.map(p => (
                <option key={p.number} value={p.number}>{p.label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => fetch(pointNumber)}
            className="w-full rounded-lg bg-verde px-4 py-2 text-sm text-white transition-opacity hover:opacity-90 md:w-auto"
          >
            Atualizar histórico
          </button>
        </div>
      </div>

      {loading && <Spinner />}

      {!loading && data && (
        <>
          <div className="mb-6 rounded-xl border border-cinza-borda bg-white p-4 sm:p-6">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs text-cinza mb-1">Ponto {data.point}</p>
                <h2 className="font-display text-2xl font-normal leading-tight sm:text-[28px]">{data.beach_name}</h2>
              </div>
              <div className="rounded-xl bg-fundo px-4 py-3 text-left sm:text-right">
                <div
                  className="font-display text-4xl leading-none sm:text-5xl"
                  style={{ color: pct >= 50 ? '#0F6E56' : '#A32D2D' }}
                >
                  {pct}%
                </div>
                <p className="text-xs text-cinza mt-1">de semanas próprias</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[320px]">
                <HistoryBars history={history} height={104} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 text-xs text-cinza sm:grid-cols-3 sm:gap-4">
              <span className="rounded-lg bg-fundo px-3 py-2">Próprias: <strong className="text-verde">{suitable}</strong></span>
              <span className="rounded-lg bg-fundo px-3 py-2">Impróprias: <strong className="text-verm">{total - suitable}</strong></span>
              <span className="rounded-lg bg-fundo px-3 py-2">Últimas {total} semanas</span>
            </div>
          </div>

          <div className="hidden overflow-hidden rounded-xl border border-cinza-borda bg-white md:block">
            <div className="grid grid-cols-[140px_1fr_110px_70px_44px] gap-4 border-b border-cinza-borda px-5 py-3 text-xs font-medium uppercase tracking-wide text-cinza">
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

          <div className="space-y-3 md:hidden">
            {history.map((h, i) => (
              <div key={i} className="rounded-xl border border-cinza-borda bg-white p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-cinza">Coleta</p>
                    <p className="text-sm font-medium">{h.collected_at}</p>
                  </div>
                  <Badge category={h.category} size="sm" />
                </div>

                <div className="mb-3 h-2 overflow-hidden rounded bg-cinza-claro">
                  <div
                    className="h-full rounded"
                    style={{ width: '100%', background: h.category === 'suitable' ? '#1D9E75' : '#A32D2D' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-lg bg-fundo px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wide text-cinza">Temperatura</p>
                    <p className="mt-1 font-medium">{h.temperature ?? '—'}°C</p>
                  </div>
                  <div className="rounded-lg bg-fundo px-3 py-2 text-right">
                    <p className="text-[11px] uppercase tracking-wide text-cinza">Chuva</p>
                    <p className="mt-1 text-base">{h.rainy ? '☁' : '☀'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && !data && (
        <div className="rounded-xl border border-dashed border-cinza-borda bg-white py-16 text-center text-cinza">
          Selecione um ponto e clique em Buscar
        </div>
      )}
    </PageLayout>
  )
}
