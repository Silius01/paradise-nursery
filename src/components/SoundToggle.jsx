import { useState } from 'react'

// Visual-only ambience toggle (a real audio track would be wired in production).
export default function SoundToggle() {
  const [on, setOn] = useState(false)
  return (
    <button
      className={`sound${on ? ' on' : ''}`}
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
    >
      <b />
      {on ? 'Ambience On' : 'Ambience Off'}
    </button>
  )
}
