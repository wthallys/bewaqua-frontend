import clsx from 'clsx'

interface BadgeProps {
  category: 'suitable' | 'unsuitable' | string
  size?:    'sm' | 'md'
}

export function Badge({ category, size = 'md' }: BadgeProps) {
  const suitable = category === 'suitable'
  return (
    <span className={clsx(
      'inline-block rounded-full font-medium tracking-wide',
      size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1',
      suitable
        ? 'bg-verde-claro text-verde'
        : 'bg-verm-claro text-verm',
    )}>
      {suitable ? 'Própria' : 'Imprópria'}
    </span>
  )
}
