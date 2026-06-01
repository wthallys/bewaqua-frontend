export function Spinner({ label = 'Carregando...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="w-8 h-8 rounded-full border-2 border-cinza-borda border-t-verde-mid animate-spin" />
      <span className="text-sm text-cinza">{label}</span>
    </div>
  )
}
