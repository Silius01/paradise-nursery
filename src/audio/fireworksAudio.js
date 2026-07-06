// Procedural fireworks sound — synthesized with the Web Audio API, so there are
// no audio files to host and no music licensing concerns. Driven by the same
// burst events as the canvas visuals. Off by default; only starts on a user
// gesture (browser autoplay policy) and remembers the choice.

let ctx = null
let master = null
let noiseBuf = null
let enabled = false

const PREF_KEY = 'usg-sound'

function ensure() {
  if (ctx) return
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return
  ctx = new AC()
  master = ctx.createGain()
  master.gain.value = 0.0001
  // gentle limiter so overlapping booms don't clip
  const comp = ctx.createDynamicsCompressor()
  comp.threshold.value = -14
  comp.knee.value = 24
  comp.ratio.value = 12
  master.connect(comp)
  comp.connect(ctx.destination)
  // one reusable white-noise buffer
  const len = Math.floor(ctx.sampleRate * 1.2)
  noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = noiseBuf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
}

export function isEnabled() {
  return enabled
}

export function prefOn() {
  try {
    return localStorage.getItem(PREF_KEY) === 'on'
  } catch {
    return false
  }
}

export function setEnabled(on) {
  if (on) {
    ensure()
    if (!ctx) return false
    if (ctx.state === 'suspended') ctx.resume()
    enabled = true
    const t = ctx.currentTime
    master.gain.cancelScheduledValues(t)
    master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), t)
    master.gain.linearRampToValueAtTime(0.7, t + 0.15)
  } else {
    enabled = false
    if (ctx && master) {
      const t = ctx.currentTime
      master.gain.cancelScheduledValues(t)
      master.gain.setValueAtTime(master.gain.value, t)
      master.gain.linearRampToValueAtTime(0.0001, t + 0.12)
    }
  }
  try {
    localStorage.setItem(PREF_KEY, on ? 'on' : 'off')
  } catch {
    /* ignore */
  }
  return enabled
}

function noiseSource() {
  const s = ctx.createBufferSource()
  s.buffer = noiseBuf
  s.loop = true
  return s
}

// Play a boom + sparkle tail for a burst. `scale` tracks the visual size.
export function playBurst(type = 'peony', scale = 1) {
  if (!enabled || !ctx || ctx.state !== 'running') return
  const t = ctx.currentTime
  const vol = Math.min(1, 0.42 * scale)

  // low thump (filtered noise)
  const boom = noiseSource()
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 300
  const bg = ctx.createGain()
  bg.gain.setValueAtTime(0.0001, t)
  bg.gain.exponentialRampToValueAtTime(vol, t + 0.008)
  bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.45 + 0.25 * scale)
  boom.connect(lp)
  lp.connect(bg)
  bg.connect(master)
  boom.start(t)
  boom.stop(t + 0.8 + 0.25 * scale)

  // sub weight
  const sub = ctx.createOscillator()
  sub.type = 'sine'
  sub.frequency.setValueAtTime(95, t)
  sub.frequency.exponentialRampToValueAtTime(45, t + 0.25)
  const sg = ctx.createGain()
  sg.gain.setValueAtTime(0.0001, t)
  sg.gain.exponentialRampToValueAtTime(vol * 0.8, t + 0.01)
  sg.gain.exponentialRampToValueAtTime(0.0001, t + 0.4)
  sub.connect(sg)
  sg.connect(master)
  sub.start(t)
  sub.stop(t + 0.45)

  // crackle / sparkle tail (high-passed noise pops)
  const pops = type === 'crackle' ? 12 : type === 'willow' ? 4 : type === 'letter' ? 8 : 6
  const spread = 0.5 + scale * 0.25
  for (let i = 0; i < pops; i++) {
    const dt = 0.04 + Math.random() * spread
    const cn = noiseSource()
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 2600 + Math.random() * 2600
    const cg = ctx.createGain()
    cg.gain.setValueAtTime(0.0001, t + dt)
    cg.gain.exponentialRampToValueAtTime(vol * 0.22, t + dt + 0.004)
    cg.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.07)
    cn.connect(hp)
    hp.connect(cg)
    cg.connect(master)
    cn.start(t + dt)
    cn.stop(t + dt + 0.1)
  }
}
