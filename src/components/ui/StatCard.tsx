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
    <div className="bg-white border border-cinza-borda rounded-xl px-5 py-4">
      <div className={clsx('font-display text-4xl leading-none mb-1', cores[cor])}>
        {valor}
      </div>
      <div className="text-sm text-cinza">{label}</div>
    </div>
  )
}
