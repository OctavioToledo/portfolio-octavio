'use client'

import { useEffect, useState } from 'react'
import { getActiveSectionId, type SectionOffset } from './scroll-spy'

export function useScrollSpy(sectionIds: string[], offset: number = 80): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null)

  useEffect(() => {
    function handleScroll() {
      const sections: SectionOffset[] = sectionIds
        .map((id) => {
          const el = document.getElementById(id)
          return el ? { id, top: el.offsetTop } : null
        })
        .filter((s): s is SectionOffset => s !== null)

      setActiveId(getActiveSectionId(sections, window.scrollY, offset))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sectionIds, offset])

  return activeId
}
