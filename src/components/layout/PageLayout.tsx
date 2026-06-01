import type { ReactNode } from 'react'

interface PageLayoutProps {
  titulo:     string
  subtitulo?: string
  children:   ReactNode
  acoes?:     ReactNode
}

export function PageLayout({ titulo, subtitulo, children, acoes }: PageLayoutProps) {
  return (
    <main className="pt-16 min-h-screen bg-fundo">
      <div className="max-w-6xl mx-auto px-8 py-9">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-[32px] font-normal leading-tight tracking-tight">
              {titulo}
            </h1>
            {subtitulo && (
              <p className="text-sm text-cinza mt-1">{subtitulo}</p>
            )}
          </div>
          {acoes && <div>{acoes}</div>}
        </div>
        {children}
      </div>
    </main>
  )
}
