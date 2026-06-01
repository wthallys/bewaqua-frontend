export function DemoWarning() {
  return (
    <div className="flex gap-3 items-start bg-amber-claro border border-amber/30 rounded-xl px-4 py-3 mb-6 text-sm text-amber">
      <span className="text-base mt-0.5">⚠</span>
      <span>
        API não detectada em{' '}
        <code className="font-mono bg-amber/10 px-1 rounded">localhost:8000</code>.
        {' '}Exibindo dados de demonstração. Inicie com{' '}
        <code className="font-mono bg-amber/10 px-1 rounded">python -m app.api.main</code>.
      </span>
    </div>
  )
}
