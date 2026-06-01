import { useEffect, useRef } from 'react'
import * as L from 'leaflet'
import { PageLayout } from '@/components/layout/PageLayout'
import { Spinner }    from '@/components/ui/Spinner'
import { useReport }  from '@/hooks/useReport'
import type { Point } from '@/types'

export function Map() {
  const { report, loading } = useReport()
  const mapContainerRef     = useRef<HTMLDivElement>(null)
  const leafletRef          = useRef<any>(null)

  useEffect(() => {
    if (!report?.points || leafletRef.current) return

    const map = L.map(mapContainerRef.current!).setView([-9.62, -35.73], 12)
    leafletRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    report.points.forEach((p: Point) => {
      if (!p.lat || !p.lon) return

      const suitable = p.category === 'suitable'
      const color    = suitable ? '#0F6E56' : '#A32D2D'
      const bgLight  = suitable ? '#E1F5EE' : '#FCEBEB'

      L.circleMarker([p.lat, p.lon], {
        radius:      9,
        fillColor:   color,
        color:       '#ffffff',
        weight:      2,
        fillOpacity: 0.92,
      })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:'DM Sans',sans-serif;font-size:13px;line-height:1.5;min-width:190px">
            <div style="font-weight:500;margin-bottom:3px">
              Ponto ${p.point_number} — ${p.beach_name}
            </div>
            <div style="color:#888;font-size:12px;margin-bottom:8px">${p.address || ''}</div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="background:${bgLight};color:${color};padding:2px 8px;border-radius:10px;font-size:11px;font-weight:500">
                ${suitable ? 'Própria' : 'Imprópria'}
              </span>
              ${p.temperature ? `<span style="color:#666">${p.temperature}°C</span>` : ''}
              <span>${p.rainy ? '☁' : '☀'}</span>
            </div>
          </div>
        `)
    })

    return () => {
      map.remove()
      leafletRef.current = null
    }
  }, [report])

  if (loading) return <PageLayout titulo="Mapa"><Spinner /></PageLayout>

  const suitable   = report?.points?.filter(p => p.category === 'suitable').length   ?? 0
  const unsuitable = report?.points?.filter(p => p.category === 'unsuitable').length ?? 0

  return (
    <PageLayout
      titulo="Mapa"
      subtitulo={`Distribuição geográfica dos pontos de coleta · REAB ${report?.reab}`}
    >
      <div className="flex gap-5 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-verde-mid" />
          <span>Própria ({suitable})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-verm" />
          <span>Imprópria ({unsuitable})</span>
        </div>
      </div>

      <div
        ref={mapContainerRef}
        className="h-[520px] rounded-xl overflow-hidden border border-cinza-borda"
      />

      <p className="text-xs text-cinza mt-3">
        Clique em qualquer marcador para ver os detalhes do ponto de coleta.
      </p>
    </PageLayout>
  )
}
