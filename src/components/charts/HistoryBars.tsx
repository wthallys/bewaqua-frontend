import type { HistoryEntry } from '@/types'

interface HistoryBarsProps {
  history: HistoryEntry[]
  height?: number
}

export function HistoryBars({ history, height = 80 }: HistoryBarsProps) {
  const chronological = [...history].reverse()

  return (
    <div className="relative" style={{ paddingBottom: 20 }}>
      <div className="flex items-end gap-1.5" style={{ height }}>
        {chronological.map((h, i) => {
          const ok = h.category === 'suitable'
          return (
            <div
              key={i}
              title={`${h.collected_at} — ${ok ? 'Própria' : 'Imprópria'} — ${h.temperature ?? '—'}°C`}
              className="flex-1 rounded-t transition-all duration-500 cursor-default"
              style={{
                height:     ok ? '100%' : '55%',
                background: ok ? '#1D9E75' : '#A32D2D',
              }}
            />
          )
        })}
      </div>
      <div className="flex justify-between text-[10px] text-cinza mt-1 absolute bottom-0 left-0 right-0">
        <span>{chronological[0]?.collected_at?.slice(5)}</span>
        <span>{chronological[chronological.length - 1]?.collected_at?.slice(5)}</span>
      </div>
    </div>
  )
}
