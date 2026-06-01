import { NavLink } from 'react-router-dom'
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
  const dateFmt = collectedAt
    ? collectedAt.split('-').reverse().join('/')
    : null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-cinza-borda flex items-center px-8 gap-0">
      <NavLink to="/" className="font-display text-[22px] text-verde mr-12 leading-none">
        Be<em className="italic text-verde-mid">waqua</em>
      </NavLink>

      <div className="flex gap-1 flex-1">
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
        <div className="flex items-center gap-2 text-sm text-cinza">
          <span className="w-2 h-2 rounded-full bg-verde-mid animate-pulse" />
          <span>REAB {reab}</span>
          {dateFmt && <span className="text-cinza-borda">·</span>}
          {dateFmt && <span>{dateFmt}</span>}
        </div>
      )}
    </nav>
  )
}
