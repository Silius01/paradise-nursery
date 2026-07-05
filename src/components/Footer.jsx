import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'

export default function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <img src={logo} alt="USG Pyrotechnics and FX" />
          <p style={{ fontSize: '13.5px', maxWidth: '280px' }}>
            Licensed aerial, close-proximity, cold-spark, and drone displays across Central Texas.
            Manor · Austin · Hill Country.
          </p>
        </div>
        <div>
          <h4>Shows</h4>
          <Link to="/services">Weddings</Link>
          <Link to="/services">Municipal</Link>
          <Link to="/services">Corporate</Link>
          <Link to="/services">Cold Spark</Link>
          <Link to="/services">Drone Shows</Link>
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
