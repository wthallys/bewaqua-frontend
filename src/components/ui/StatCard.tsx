import clsx from 'clsx'

interface StatCardProps {
  valor: string | number
  label: string
  cor?:  'verde' | 'verm' | 'amber' | 'cinza'
}

const cores = {
  verde: 'text-verde',
  verm:  'text-verm',
  amber: 'text-amber',
  cinza: 'text-cinza',
}

export function StatCard({ valor, label, cor = 'cinza' }: StatCardProps) {
  return (
    <div className="rounded-xl border border-cinza-borda bg-white px-4 py-4 sm:px-5">
      <div className={clsx('mb-1 font-display text-3xl leading-none sm:text-4xl', cores[cor])}>
        {valor}
      </div>
      <div className="text-sm text-cinza">{label}</div>
    </div>
  )
}
