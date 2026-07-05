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

    // Launch a shell that bursts in the upper region (around the hero logo).
    // tyFrac = target burst height as a fraction of viewport height (smaller = higher).
    // --- USG letter-shaped bursts -------------------------------------------
    // Sample points that fill a glyph, then explode particles out to those
    // points and let friction settle them into the letter shape.
    const letterCache = {}
    const letterPoints = (ch) => {
      const FH = 74
      const c = document.createElement('canvas')
      const g = c.getContext('2d')
      g.font = `900 ${FH}px Arial, sans-serif`
      c.width = Math.ceil(g.measureText(ch).width) + 8
      c.height = FH + 14
      g.font = `900 ${FH}px Arial, sans-serif` // resizing the canvas reset the context
      g.fillStyle = '#fff'
      g.textBaseline = 'top'
      g.fillText(ch, 4, 4)
      const data = g.getImageData(0, 0, c.width, c.height).data
      const pts = []
      const step = 5
      for (let py = 0; py < c.height; py += step) {
        for (let px = 0; px < c.width; px += step) {
          if (data[(py * c.width + px) * 4 + 3] > 128) pts.push([px / c.width, py / c.height])
        }
      }
      return { pts, aspect: c.width / c.height }
    }
    const getPts = (ch) => letterCache[ch] || (letterCache[ch] = letterPoints(ch))
    const letterBurst = (cx, cy, ch, pal) => {
      const { pts, aspect } = getPts(ch)
      const sizeH = Math.min(H * 0.17, W * 0.15)
      const sizeW = sizeH * aspect
      const f = 0.9 // displacement settles at (target - center) with this friction
      for (let i = 0; i < pts.length; i++) {
        const tx = cx + (pts[i][0] - 0.5) * sizeW
        const ty = cy + (pts[i][1] - 0.5) * sizeH
        const col = hexToRgb(pal[Math.floor(Math.random() * pal.length)])
        const jx = (Math.random() - 0.5) * 3 * DPR
        const jy = (Math.random() - 0.5) * 3 * DPR
        addP(cx, cy, (tx - cx + jx) * (1 - f), (ty - cy + jy) * (1 - f), col, 0.0052, 1.6, 0.004 * DPR, f)
      }
    }
    // Spell "USG" across the sky — U left, S centre, G right, bursting together.
    const fireUSG = () => {
      // burst low, in the open sky below the hero logo/content
      const ty = 0.74 * H
      const g = 0.12 * DPR
      const vy = -Math.sqrt(2 * g * Math.max(1, H - ty)) * 1.04
      ;[['U', 0.31], ['S', 0.5], ['G', 0.69]].forEach(([ch, fx]) => {
        shells.push({ x: fx * W, y: H, vy, ty, pal: PALETTES.white, type: 'letter', letter: ch })
      })
    }

    const TYPES = ['peony', 'peony', 'peony', 'willow', 'willow', 'ring', 'palm', 'crackle', 'double']
    const launch = (px, palKey, tyFrac, type, scale) => {
      const pal = PALETTES[palKey] || PALETTES.green
      const ty = (tyFrac != null ? tyFrac : 0.15 + Math.random() * 0.28) * H
      const g = 0.12 * DPR
      // velocity chosen so the shell reaches ty with a little momentum to spare
      const vy = -Math.sqrt(2 * g * Math.max(1, H - ty)) * 1.04
      shells.push({
        x: px != null ? px : (0.28 + Math.random() * 0.44) * W,
        y: H,
        vy,
        ty,
        pal,
        type: type || TYPES[Math.floor(Math.random() * TYPES.length)],
        // ~28% of shells are big "finale" bursts
        scale: scale != null ? scale : Math.random() < 0.28 ? 1.4 + Math.random() * 0.4 : 0.95 + Math.random() * 0.3,
      })
    }
    const MAXP = 1700
    const WHITE = [255, 255, 255]
    const addP = (x, y, vx, vy, col, decay, r, g, f) => {
      if (sparks.length >= MAXP) return
      sparks.push({ x, y, vx, vy, c: col, life: 1, decay, r, g, f })
    }

    // Several firework shapes for variety. `scale` drives massiveness.
    const burst = (x, y, pal, type = 'peony', scale = 1) => {
      const S = DPR * scale
      const pick = () => hexToRgb(pal[Math.floor(Math.random() * pal.length)])
      if (type === 'ring') {
        const n = 74
        for (let i = 0; i < n; i++) {
          const a = (i / n) * 6.283
          const sp = 3.4 * S * (0.9 + Math.random() * 0.2)
          addP(x, y, Math.cos(a) * sp, Math.sin(a) * sp, pick(), 0.009, 1.4, 0.03 * DPR, 0.986)
        }
      } else if (type === 'willow') {
        const n = 110
        for (let i = 0; i < n; i++) {
          const a = Math.random() * 6.283
          const sp = (Math.random() * 2.4 + 1.6) * S
          addP(x, y, Math.cos(a) * sp, Math.sin(a) * sp - 0.5 * DPR, pick(), 0.0042, 1.7, 0.11 * DPR, 0.993)
        }
      } else if (type === 'palm') {
        const n = 13
        for (let i = 0; i < n; i++) {
          const a = (i / n) * 6.283
          const sp = (Math.random() * 1.6 + 4.6) * S
          addP(x, y, Math.cos(a) * sp, Math.sin(a) * sp - 1.2 * DPR, pick(), 0.006, 2.5, 0.08 * DPR, 0.987)
        }
      } else if (type === 'crackle') {
        burst(x, y, pal, 'peony', scale)
        for (let i = 0; i < 60; i++) {
          const a = Math.random() * 6.283
          const sp = (Math.random() * 4.6 + 0.8) * S
          addP(x, y, Math.cos(a) * sp, Math.sin(a) * sp, WHITE, 0.05, 1.1, 0.05 * DPR, 0.9)
        }
      } else if (type === 'double') {
        burst(x, y, [pal[0]], 'ring', scale * 0.72)
        burst(x, y, pal, 'peony', scale)
      } else {
        // peony / chrysanthemum
        const n = Math.round(100 * scale)
        for (let i = 0; i < n; i++) {
          const a = Math.random() * 6.283
          const sp = (Math.random() * 4.8 + 1.4) * S
          addP(x, y, Math.cos(a) * sp, Math.sin(a) * sp - DPR, pick(), Math.random() * 0.011 + 0.006, Math.random() * 1.7 + 0.9, 0.05 * DPR, 0.985)
        }
      }
    }

    let lastLaunch = 0
    let lastUSG = 0
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
      if (ts - lastLaunch > 750 + Math.random() * 750 && shells.length < 5) {
        const keys = Object.keys(PALETTES)
        launch(null, keys[Math.floor(Math.random() * keys.length)])
        lastLaunch = ts
      }
      // occasionally spell out USG
      if (ts - lastUSG > 15000 + Math.random() * 9000) {
        fireUSG()
        lastUSG = ts
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
        // burst on reaching the target height (or if it starts to fall, as a safety)
        if (sh.y <= sh.ty || sh.vy >= 0) {
          if (sh.type === 'letter') letterBurst(sh.x, sh.y, sh.letter, sh.pal)
          else burst(sh.x, sh.y, sh.pal, sh.type, sh.scale)
          shells.splice(j, 1)
        }
      }
      for (let k = sparks.length - 1; k >= 0; k--) {
        const p = sparks[k]
        p.x += p.vx
        p.y += p.vy
        p.vy += p.g
        p.vx *= p.f
        p.vy *= p.f
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
    let t1, t2, t3
    if (!reduce) {
      const ignite = igniteRef.current
      if (ignite) {
        ignite.classList.remove('go')
        // force reflow so the animation restarts cleanly
        void ignite.offsetWidth
        ignite.classList.add('go')
      }
      t1 = setTimeout(() => burst(W * 0.5, H * 0.28, PALETTES.green, 'crackle', 1.7), 120)
      t2 = setTimeout(() => {
        launch(W * 0.32, 'green', 0.24, 'willow', 1.4)
        launch(W * 0.68, 'white', 0.34, 'double', 1.3)
      }, 620)
      // showcase the USG letters shortly after load
      t3 = setTimeout(fireUSG, 2800)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
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
