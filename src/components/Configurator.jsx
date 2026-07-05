import { useCallback, useEffect, useRef, useState } from 'react'
import { PALETTES, hexToRgb } from '../data/shows'
import useReducedMotion from '../hooks/useReducedMotion'

const OCCASIONS = ['Wedding', 'Corporate', 'City Event', 'Gender Reveal']
const INTENSITY = [
  { v: 1, label: 'Elegant' },
  { v: 2, label: 'Signature' },
  { v: 3, label: 'Spectacular' },
]

export default function Configurator() {
  const [occ, setOcc] = useState('Wedding')
  const [pal, setPal] = useState('green')
  const [intensity, setIntensity] = useState(2)
  const reduce = useReducedMotion()

  const canvasRef = useRef(null)
  const sparks = useRef([])
  const dims = useRef({ w: 0, h: 0, dpr: 1 })
  const timers = useRef([])

  const measure = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const r = c.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = r.width * dpr
    c.height = r.height * dpr
    dims.current = { w: c.width, h: c.height, dpr }
  }, [])

  const drawStatic = useCallback(() => {
    measure()
    const c = canvasRef.current
    const cx = c.getContext('2d')
    const { w, h, dpr } = dims.current
    const colors = PALETTES[pal]
    cx.clearRect(0, 0, w, h)
    cx.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 90; i++) {
      const a = (i / 90) * 6.283
      const rad = (60 + (i % 5) * 12) * dpr
      const col = hexToRgb(colors[i % colors.length])
      cx.globalAlpha = 0.8
      cx.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`
      cx.beginPath()
      cx.arc(w / 2 + Math.cos(a) * rad, h * 0.42 + Math.sin(a) * rad, 1.6 * dpr, 0, 6.283)
      cx.fill()
    }
    cx.globalCompositeOperation = 'source-over'
    cx.globalAlpha = 1
  }, [measure, pal])

  const fire = useCallback(() => {
    if (reduce) {
      drawStatic()
      return
    }
    measure()
    const { w, h, dpr } = dims.current
    const colors = PALETTES[pal]
    const bursts = intensity + 1
    timers.current.forEach(clearTimeout)
    timers.current = []
    for (let b = 0; b < bursts; b++) {
      const t = setTimeout(() => {
        const x = (0.25 + Math.random() * 0.5) * w
        const y = (0.25 + Math.random() * 0.35) * h
        for (let i = 0; i < 55 + intensity * 20; i++) {
          const a = Math.random() * 6.283
          const sp = (Math.random() * 3.5 + 1.2) * dpr
          const col = hexToRgb(colors[Math.floor(Math.random() * colors.length)])
          sparks.current.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - dpr, c: col, life: 1, decay: Math.random() * 0.01 + 0.006, r: Math.random() * 1.5 + 0.7 })
        }
      }, b * 260)
      timers.current.push(t)
    }
  }, [reduce, measure, drawStatic, pal, intensity])

  // Animation loop
  useEffect(() => {
    if (reduce) return undefined
    const cx = canvasRef.current.getContext('2d')
    let raf
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const { w, h, dpr } = dims.current
      if (!w) return
      cx.clearRect(0, 0, w, h)
      cx.globalCompositeOperation = 'lighter'
      const arr = sparks.current
      for (let k = arr.length - 1; k >= 0; k--) {
        const p = arr[k]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.045 * dpr
        p.vx *= 0.985
        p.vy *= 0.985
        p.life -= p.decay
        if (p.life <= 0) {
          arr.splice(k, 1)
          continue
        }
        cx.globalAlpha = p.life
        cx.fillStyle = `rgb(${p.c[0]},${p.c[1]},${p.c[2]})`
        cx.beginPath()
        cx.arc(p.x, p.y, p.r * dpr, 0, 6.283)
        cx.fill()
      }
      cx.globalCompositeOperation = 'source-over'
      cx.globalAlpha = 1
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  // Fire on mount and whenever palette or intensity changes.
  useEffect(() => {
    const t = setTimeout(fire, 180)
    return () => clearTimeout(t)
  }, [fire])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  return (
    <div className="config">
      <div className="controls">
        <p className="cfg-label" style={{ marginTop: 0 }}>The Occasion</p>
        <div className="cfg-row">
          {OCCASIONS.map((o) => (
            <button key={o} className={`opt${occ === o ? ' sel' : ''}`} onClick={() => setOcc(o)}>
              {o === 'Gender Reveal' ? 'Reveal' : o}
            </button>
          ))}
        </div>

        <p className="cfg-label">The Palette</p>
        <div className="cfg-row">
          {Object.keys(PALETTES).map((k) => (
            <button
              key={k}
              className={`swatch${pal === k ? ' sel' : ''}`}
              aria-label={`${k} palette`}
              style={{ background: `linear-gradient(135deg, ${PALETTES[k][0]}, ${PALETTES[k][1]})`, color: PALETTES[k][0] }}
              onClick={() => setPal(k)}
            />
          ))}
        </div>

        <p className="cfg-label">Finale Intensity</p>
        <div className="cfg-row">
          {INTENSITY.map((it) => (
            <button key={it.v} className={`opt${intensity === it.v ? ' sel' : ''}`} onClick={() => setIntensity(it.v)}>
              {it.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '28px' }}>
          <button className="btn btn-primary" onClick={fire}>
            ▲ Launch Preview
          </button>
        </div>
      </div>
      <div className="preview">
        <canvas ref={canvasRef} aria-hidden="true" />
      </div>
    </div>
  )
}
