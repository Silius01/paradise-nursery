import { useEffect, useRef } from 'react'
import Burst from './Burst'

export default function Lightbox({ show, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!show) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={show.name}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <Burst className="lb-art" pal={show.pal} img={show.img} alt={show.alt} />
      <div className="lb-info">
        <div className="lb-t">{show.name}</div>
        <div className="lb-d">{show.meta}</div>
        <div className="lb-note">Full show reel plays here in the production build.</div>
      </div>
      <button className="lb-close" aria-label="Close" ref={closeRef} onClick={onClose}>
        ✕
      </button>
    </div>
  )
}
