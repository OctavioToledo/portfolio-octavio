import type { ReactNode } from 'react'

type DrawingSheetProps = {
  children: ReactNode
  label?: string
  meta?: string
}

export function DrawingSheet({ children, label, meta }: DrawingSheetProps) {
  return (
    <div className="relative border border-stroke">
      <span className="pointer-events-none absolute left-[7px] top-[7px] h-3.5 w-3.5 border-l border-t border-stroke" />
      <span className="pointer-events-none absolute bottom-[7px] right-[7px] h-3.5 w-3.5 border-b border-r border-amber" />
      <div className="m-[7px] border border-stroke-soft px-7 pt-7 pb-0">
        {(label || meta) && (
          <div className="mb-2 flex justify-between font-mono text-[11px] uppercase tracking-wider text-fg-faint">
            <span>{label}</span>
            <span className="text-amber">{meta}</span>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
