export function StatGauge({ value, label }: { value: string; label: string }) {
  return (
    <div className="bp-panel bp-panel-hover p-6">
      <div className="font-display text-4xl font-bold text-amber">{value}</div>
      <div className="mt-2 font-mono text-xs uppercase tracking-wider text-fg-dim">{label}</div>
    </div>
  )
}
