import { describe, expect, it } from 'vitest'
import { contactSchema } from './contact-schema'

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello, I would like to get in touch about a role.',
    })
    expect(result.success).toBe(true)
  })

  it('rejects an invalid email', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Doe',
      email: 'not-an-email',
      message: 'Hello, I would like to get in touch about a role.',
    })
    expect(result.success).toBe(false)
  })

  it('rejects a message that is too short', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hi',
    })
    expect(result.success).toBe(false)
  })

  it('rejects an empty name', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: 'jane@example.com',
      message: 'Hello, I would like to get in touch about a role.',
    })
    expect(result.success).toBe(false)
  })
})
