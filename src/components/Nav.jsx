import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/gallery', label: 'Gallery' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About & Safety' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30 || pathname !== '/')
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <nav className={solid ? 'solid' : ''}>
        <button className="brand" aria-label="USG Pyrotechnics and FX — home" onClick={() => navigate('/')}>
          <img src={logo} alt="USG Pyrotechnics and FX" />
        </button>
        <div className="navlinks">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="btn btn-primary">
            Get a Quote
          </NavLink>
        </div>
        <button className="menu-btn" aria-label="Open menu" onClick={() => setOpen(true)}>
          ☰
        </button>
      </nav>

      {open && (
        <div className="drawer">
          <button className="close" aria-label="Close menu" onClick={() => setOpen(false)}>
            ✕
          </button>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/contact">Get a Quote</NavLink>
        </div>
      )}
    </>
  )
}
