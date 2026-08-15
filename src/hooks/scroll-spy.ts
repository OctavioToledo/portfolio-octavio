export type SectionOffset = { id: string; top: number }

export function getActiveSectionId(
  sections: SectionOffset[],
  scrollY: number,
  offset: number = 0
): string | null {
  if (sections.length === 0) return null
  const sorted = [...sections].sort((a, b) => a.top - b.top)
  let active = sorted[0].id
  for (const section of sorted) {
    if (scrollY + offset >= section.top) {
      active = section.id
    }
  }
  return active
}
