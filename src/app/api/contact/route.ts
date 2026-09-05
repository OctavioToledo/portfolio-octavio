import { Resend } from 'resend'
import { contactSchema } from '@/lib/contact-schema'

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'octatoledo7@gmail.com'
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>'

// Best-effort in-memory throttle. On serverless this only spans a warm instance,
// but it still blunts the cheapest bursts. Honeypot + schema validation do the
// rest of the work.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > MAX_PER_WINDOW
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'invalid_body' }, { status: 400 })
  }

  const data = body as Record<string, unknown>

  // Honeypot: real users never fill this hidden field. Pretend success.
  if (typeof data.company === 'string' && data.company.trim() !== '') {
    return Response.json({ ok: true })
  }

  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return Response.json({ error: 'validation_failed' }, { status: 422 })
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  if (isRateLimited(ip)) {
    return Response.json({ error: 'rate_limited' }, { status: 429 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return Response.json({ error: 'not_configured' }, { status: 500 })
  }

  const { name, email, message } = parsed.data

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Portfolio · mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error: 'send_failed' }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return Response.json({ error: 'send_failed' }, { status: 502 })
  }
}
