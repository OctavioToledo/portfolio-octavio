export function StatGauge({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-stroke-soft p-6">
      <div className="font-display text-4xl font-bold text-brand">{value}</div>
      <div className="mt-2 font-mono text-xs uppercase tracking-wider text-fg-dim">{label}</div>
    </div>
  )
}
