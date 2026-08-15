export function SectionHeader({ title, count }: { title: string; count?: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">{title}</h2>
      <div className="h-px flex-1 bg-stroke-soft" />
      {count && (
        <span className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">{count}</span>
      )}
    </div>
  )
}
