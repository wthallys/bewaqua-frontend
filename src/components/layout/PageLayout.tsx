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
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4 sm:mb-8">
          <div>
            <h1 className="font-display text-[28px] font-normal leading-tight tracking-tight sm:text-[32px]">
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
