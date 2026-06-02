export function DemoWarning() {
  return (
    <div className="flex gap-3 items-start bg-amber-claro border border-amber/30 rounded-xl px-4 py-3 mb-6 text-sm text-amber">
      <span className="text-base mt-0.5">⚠</span>
      <span>
        API não detectada. Exibindo dados de demonstração.
      </span>
    </div>
  )
}
