import { ImageResponse } from 'next/og'

export const alt = 'Octavio Toledo — Ingeniero de Software'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0C1119',
          backgroundImage:
            'linear-gradient(#151D29 1px, transparent 1px), linear-gradient(90deg, #151D29 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          color: '#E6EBF2',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: 4, textTransform: 'uppercase', color: '#5FABD8' }}>
          Ingeniero de Software
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, textTransform: 'uppercase', lineHeight: 1, marginTop: 16 }}>
          Octavio Toledo
        </div>
        <div style={{ fontSize: 28, color: '#9CA9BC', marginTop: 24, maxWidth: 900 }}>
          Backend para plataformas ERP. Sistemas distribuidos, integridad de datos y arquitectura orientada a eventos.
        </div>
      </div>
    ),
    { ...size }
  )
}
