import { describe, expect, it } from 'vitest'
import { getActiveSectionId } from './scroll-spy'

describe('getActiveSectionId', () => {
  const sections = [
    { id: 'hero', top: 0 },
    { id: 'about', top: 500 },
    { id: 'contact', top: 1200 },
  ]

  it('returns the first section id when at the top', () => {
    expect(getActiveSectionId(sections, 0)).toBe('hero')
  })

  it('returns the section whose top has been scrolled past', () => {
    expect(getActiveSectionId(sections, 600)).toBe('about')
  })

  it('returns the last matching section when scrolled past all tops', () => {
    expect(getActiveSectionId(sections, 5000)).toBe('contact')
  })

  it('applies the offset before comparing', () => {
    expect(getActiveSectionId(sections, 480, 40)).toBe('about')
  })

  it('returns null for an empty sections array', () => {
    expect(getActiveSectionId([], 100)).toBeNull()
  })
})
