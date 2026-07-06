import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { YouTube, Facebook, XTwitter } from './Icons'

// href null = account not live yet (shown but not linked)
const SOCIAL = [
  { name: 'YouTube', href: 'https://www.youtube.com/@usgpyrotechnics7869', Icon: YouTube },
  { name: 'Facebook', href: 'https://www.facebook.com/USGpyrotechnics', Icon: Facebook },
  { name: 'X', href: null, Icon: XTwitter },
]

export default function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <img src={logo} alt="USG Pyrotechnics and FX" />
          <p style={{ fontSize: '13.5px', maxWidth: '280px' }}>
            Licensed aerial, close-proximity, and cold-spark displays across Central Texas. Manor ·
            Austin · Hill Country.
          </p>
          <div className="socials">
            {SOCIAL.map(({ name, href, Icon }) =>
              href ? (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                  <Icon />
                </a>
              ) : (
                <span key={name} className="soon" title={`${name} — coming soon`} aria-label={`${name} coming soon`}>
                  <Icon />
                </span>
              ),
            )}
          </div>
        </div>
        <div>
          <h4>Shows</h4>
          <Link to="/services">Weddings</Link>
          <Link to="/services">Municipal</Link>
          <Link to="/services">Corporate</Link>
          <Link to="/services">Cold Spark</Link>
          <Link to="/services">Pyromusicals</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/about">About &amp; Safety</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/services">How It Works</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Service Area</h4>
          <Link to="/contact">Manor</Link>
          <Link to="/contact">Austin</Link>
          <Link to="/contact">Round Rock</Link>
          <Link to="/contact">Bastrop</Link>
          <Link to="/contact">Lake Travis</Link>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 USG Pyrotechnics &amp; FX · Concept prototype</span>
        <span>ATF Licensed · TDLR Operators · Fully Insured</span>
      </div>
    </footer>
  )
}
