import { useEffect, useState } from 'react'
import * as audio from '../audio/fireworksAudio'

// Fireworks sound toggle. Off by default; audio only starts on a user gesture
// (browser autoplay policy) and the preference is remembered across visits.
export default function SoundToggle() {
  const [on, setOn] = useState(() => audio.prefOn())

  // Returning visitor who left sound on: resume the audio context on their
  // first interaction anywhere (a gesture is required before audio can play).
  useEffect(() => {
    if (!on) return undefined
    const resume = () => audio.setEnabled(true)
    document.addEventListener('pointerdown', resume, { once: true })
    document.addEventListener('keydown', resume, { once: true })
    return () => {
      document.removeEventListener('pointerdown', resume)
      document.removeEventListener('keydown', resume)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = () => {
    const next = !on
    setOn(next)
    audio.setEnabled(next) // the click itself is the required user gesture
  }

  return (
    <button className={`sound${on ? ' on' : ''}`} aria-pressed={on} onClick={toggle}>
      <b />
      {on ? 'Sound On' : 'Sound Off'}
    </button>
  )
}
