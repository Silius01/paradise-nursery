import { Link, useNavigate } from 'react-router-dom'
import Carousel from '../components/Carousel'
import { ShieldCheck, Card, Launch, Spark } from '../components/Icons'
import { HIGHLIGHTS, featuredShow } from '../data/shows'
import logo from '../assets/logo.png'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <header className="hero">
        <img className="logo-big" src={logo} alt="USG Pyrotechnics and FX" />
        <h1>
          Fireworks, <span className="accent">choreographed.</span>
        </h1>
        <p className="lede">
          Licensed aerial displays, cold-spark effects, and music-synced pyromusicals for Central
          Texas weddings, cities, and celebrations — designed to the finale, delivered safely.
        </p>
        <div className="hero-cta">
          <Link className="btn btn-primary" to="/contact">
            Get Your Free Quote →
          </Link>
          <Link className="btn btn-ghost" to="/gallery">
            View the Gallery
          </Link>
        </div>
        <div className="place">Manor · Austin · Hill Country</div>
      </header>

      <section className="band">
        <div className="wrap">
          <p className="eyebrow">Featured Shows</p>
          <Carousel />
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow">What We Fire</p>
          <div className="hl-grid">
            {HIGHLIGHTS.map((h) => (
              <button key={h.title} className="hl" onClick={() => navigate(h.to)}>
                <div className="ic">
                  <Spark />
                </div>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
                <span className="go">Explore →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="featured-banner">
            <img src={featuredShow} alt="A USG finale of aerial bursts and ground flame effects over a packed field of spectators" />
            <div className="fb-overlay">
              <p className="eyebrow">From a Recent Show</p>
              <h2>The kind of night the whole town drives out for.</h2>
              <span className="fb-cap">
                Aerial shells, low-break flame effects, and a wall of finale over a packed Central
                Texas field — designed, permitted, and fired by our crew.
              </span>
              <Link className="btn btn-primary" to="/gallery">
                See More Shows →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="trust">
        <div className="wrap">
          <div className="badge">
            <ShieldCheck /> ATF Licensed
          </div>
          <div className="badge">
            <Card /> TDLR Operators
          </div>
          <div className="badge">
            <Launch /> NFPA 1123
          </div>
          <div className="stat">
            <b>500+</b>
            <span>Shows Fired</span>
          </div>
          <div className="stat">
            <b>$5M</b>
            <span>Insured</span>
          </div>
          <div className="stat">
            <b>Zero</b>
            <span>Incidents</span>
          </div>
        </div>
      </div>

      <section className="band cta-band">
        <div className="wrap">
          <p className="eyebrow center">Now Booking 2026</p>
          <h2>Let&apos;s light your night.</h2>
          <p>Tell us the date and venue — we reply within 24 hours and handle every permit.</p>
          <Link className="btn btn-primary" to="/contact">
            Request a Quote →
          </Link>
        </div>
      </section>
    </div>
  )
}
