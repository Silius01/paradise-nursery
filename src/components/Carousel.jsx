import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Burst from './Burst'
import { FEATURED } from '../data/shows'
import useReducedMotion from '../hooks/useReducedMotion'

export default function Carousel() {
  const [idx, setIdx] = useState(0)
  const reduce = useReducedMotion()
  const timer = useRef(null)
  const touch = useRef({ x: 0, dx: 0, active: false })
  const N = FEATURED.length

  const goTo = useCallback((i) => setIdx(((i % N) + N) % N), [N])

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    if (!reduce) timer.current = setInterval(() => setIdx((i) => (i + 1) % N), 5200)
  }, [reduce, N])

  useEffect(() => {
    restart()
    return () => timer.current && clearInterval(timer.current)
  }, [restart])

  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, dx: 0, active: true }
    if (timer.current) clearInterval(timer.current)
  }
  const onTouchMove = (e) => {
    if (touch.current.active) touch.current.dx = e.touches[0].clientX - touch.current.x
  }
  const onTouchEnd = () => {
    const { dx } = touch.current
    if (Math.abs(dx) > 45) goTo(idx + (dx < 0 ? 1 : -1))
    touch.current.active = false
    restart()
  }

  return (
    <div
      className="carousel"
      aria-roledescription="carousel"
      aria-label="Featured shows"
      onMouseEnter={() => timer.current && clearInterval(timer.current)}
      onMouseLeave={restart}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="slides" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {FEATURED.map((f, i) => (
          <div className="slide" key={f.name} role="group" aria-label={`${i + 1} of ${N}: ${f.name}`}>
            <Burst className="art" pal={f.pal} img={f.img} alt={f.alt} />
            <div className="cap">
              <div className="k">{f.kind}</div>
              <h3>{f.name}</h3>
              <p>{f.blurb}</p>
              <Link className="btn btn-ghost" to="/gallery">
                See the show →
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button className="car-btn prev" aria-label="Previous slide" onClick={() => { goTo(idx - 1); restart() }}>
        ‹
      </button>
      <button className="car-btn next" aria-label="Next slide" onClick={() => { goTo(idx + 1); restart() }}>
        ›
      </button>
      <div className="dots">
        {FEATURED.map((f, i) => (
          <button
            key={f.name}
            className={i === idx ? 'on' : ''}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => { goTo(i); restart() }}
          />
        ))}
      </div>
    </div>
  )
}
