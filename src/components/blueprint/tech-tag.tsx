import type { ReactNode } from 'react'

export function TechTag({ children }: { children: ReactNode }) {
  return (
    <span className="border border-stroke-soft bg-surface-2 px-2 py-1 font-mono text-[10.5px] tracking-wider text-fg-dim">
      {children}
    </span>
  )
}
