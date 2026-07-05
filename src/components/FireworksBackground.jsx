import { useEffect, useRef } from 'react'
import { PALETTES, hexToRgb } from '../data/shows'
import useReducedMotion from '../hooks/useReducedMotion'

export default function FireworksBackground() {
  const canvasRef = useRef(null)
  const igniteRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, DPR
    let raf
    const shells = []
    const sparks = []
    const stars = []
    for (let i = 0; i < 80; i++) {
      stars.push({ x: Math.random(), y: Math.random() * 0.8, r: Math.random() * 1.3 + 0.2, t: Math.random() * 6.28 })
    }

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.width = window.innerWidth * DPR
      H = canvas.height = window.innerHeight * DPR
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    const launch = (px, palKey) => {
      const pal = PALETTES[palKey] || PALETTES.green
      shells.push({
        x: px != null ? px : (0.15 + Math.random() * 0.7) * W,
        y: H,
        vy: -(Math.random() * 3 + 9.5) * DPR,
        pal,
        life: 0,
        max: Math.random() * 20 + 42,
      })
    }
    const burst = (x, y, pal, count = 60) => {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * 6.283
        const sp = (Math.random() * 4 + 1.5) * DPR
        const col = hexToRgb(pal[Math.floor(Math.random() * pal.length)])
        sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - DPR, c: col, life: 1, decay: Math.random() * 0.012 + 0.008, r: Math.random() * 1.6 + 0.8 })
      }
    }

    let lastLaunch = 0
    const frame = (ts) => {
      raf = requestAnimationFrame(frame)
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        s.t += 0.02
        ctx.globalAlpha = (0.5 + Math.sin(s.t) * 0.4) * 0.7
        ctx.fillStyle = '#c7d3c9'
        ctx.beginPath()
        ctx.arc(s.x * W, s.y * H, s.r * DPR, 0, 6.283)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (reduce) return

      ctx.globalCompositeOperation = 'lighter'
      if (ts - lastLaunch > 900 + Math.random() * 900 && shells.length < 4) {
        const keys = Object.keys(PALETTES)
        launch(null, keys[Math.floor(Math.random() * keys.length)])
        lastLaunch = ts
      }
      for (let j = shells.length - 1; j >= 0; j--) {
        const sh = shells[j]
        ctx.globalAlpha = 1
        ctx.fillStyle = '#eaffee'
        ctx.beginPath()
        ctx.arc(sh.x, sh.y, 1.8 * DPR, 0, 6.283)
        ctx.fill()
        ctx.strokeStyle = 'rgba(180,255,190,.35)'
        ctx.lineWidth = 1.4 * DPR
        ctx.beginPath()
        ctx.moveTo(sh.x, sh.y)
        ctx.lineTo(sh.x, sh.y - sh.vy * 2)
        ctx.stroke()
        sh.y += sh.vy
        sh.vy += 0.12 * DPR
        sh.life++
        if (sh.vy >= -1.5 * DPR || sh.life > sh.max) {
          burst(sh.x, sh.y, sh.pal, 60)
          shells.splice(j, 1)
        }
      }
      for (let k = sparks.length - 1; k >= 0; k--) {
        const p = sparks[k]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.05 * DPR
        p.vx *= 0.985
        p.vy *= 0.985
        p.life -= p.decay
        if (p.life <= 0) {
          sparks.splice(k, 1)
          continue
        }
        ctx.globalAlpha = p.life
        ctx.fillStyle = `rgb(${p.c[0]},${p.c[1]},${p.c[2]})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * DPR, 0, 6.283)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
    }
    raf = requestAnimationFrame(frame)

    // one-shot "ignite" on first mount
    let t1, t2
    if (!reduce) {
      const ignite = igniteRef.current
      if (ignite) {
        ignite.classList.remove('go')
        // force reflow so the animation restarts cleanly
        void ignite.offsetWidth
        ignite.classList.add('go')
      }
      t1 = setTimeout(() => burst(W * 0.5, H * 0.34, PALETTES.green, 110), 120)
      t2 = setTimeout(() => {
        launch(W * 0.32, 'green')
        launch(W * 0.7, 'white')
      }, 700)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [reduce])

  return (
    <>
      <div id="sky-bg" />
      <canvas id="fx" ref={canvasRef} aria-hidden="true" />
      <div id="ignite" ref={igniteRef} aria-hidden="true" />
    </>
  )
}
