import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const LINKS = [
  { to: '/',            label: 'Dashboard'   },
  { to: '/map',         label: 'Mapa'        },
  { to: '/history',     label: 'Histórico'   },
  { to: '/ranking',     label: 'Ranking'     },
  { to: '/compare',     label: 'Comparativo' },
]

interface NavbarProps {
  reab?:        string
  collectedAt?: string
}

export function Navbar({ reab, collectedAt }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const dateFmt = collectedAt
    ? collectedAt.split('-').reverse().join('/')
    : null

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [mobileMenuOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1100] h-16 border-b border-cinza-borda bg-white">
        <div className="flex h-full items-center gap-4 px-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="font-display text-[22px] text-verde leading-none md:mr-8 lg:mr-12">
            Be<em className="italic text-verde-mid">waqua</em>
          </NavLink>

          <div className="hidden md:flex md:flex-1 md:gap-1">
            {LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => clsx(
                  'px-4 py-1.5 rounded-full text-sm transition-all duration-150 whitespace-nowrap',
                  isActive
                    ? 'bg-verde-claro text-verde font-medium'
                    : 'text-cinza hover:bg-cinza-claro hover:text-[#2C2C2A]',
                )}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {reab && (
            <div className="ml-auto hidden items-center gap-2 text-sm text-cinza md:flex">
              <span className="h-2 w-2 rounded-full bg-verde-mid animate-pulse" />
              <span>REAB {reab}</span>
              {dateFmt && <span className="text-cinza-borda">·</span>}
              {dateFmt && <span>{dateFmt}</span>}
            </div>
          )}

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(open => !open)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-cinza-borda text-cinza transition hover:bg-cinza-claro hover:text-[#2C2C2A] md:hidden"
          >
            {mobileMenuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        className={clsx(
          'fixed inset-0 z-[1080] bg-[#2C2C2A]/35 transition-opacity duration-200 md:hidden',
          mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation"
        className={clsx(
          'fixed right-0 top-0 z-[1090] flex h-screen w-[280px] max-w-[85vw] flex-col border-l border-cinza-borda bg-white shadow-xl transition-transform duration-200 md:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-cinza-borda px-5">
          <span className="font-display text-[22px] text-verde leading-none">
            Be<em className="italic text-verde-mid">waqua</em>
          </span>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fechar menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cinza-borda text-cinza transition hover:bg-cinza-claro hover:text-[#2C2C2A]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-4 py-5">
          {LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => clsx(
                'rounded-2xl px-4 py-3 text-base transition-all duration-150',
                isActive
                  ? 'bg-verde-claro text-verde font-medium'
                  : 'text-cinza hover:bg-cinza-claro hover:text-[#2C2C2A]',
              )}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {reab && (
          <div className="border-t border-cinza-borda px-5 py-4 text-sm text-cinza">
            <div className="mb-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-verde-mid animate-pulse" />
              <span>REAB {reab}</span>
            </div>
            {dateFmt && <span className="block">Atualizado em {dateFmt}</span>}
          </div>
        )}
      </aside>
    </>
  )
}
