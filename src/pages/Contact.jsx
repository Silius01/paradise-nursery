import Configurator from '../components/Configurator'
import { Pin, Phone, Mail } from '../components/Icons'

export default function Contact() {
  return (
    <div className="page">
      <section className="band page-top">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The Signature Moment</p>
            <h2>Build your show, then send it to us.</h2>
            <p>Pick the occasion and a palette, watch the sky, then request your quote below.</p>
          </div>
          <Configurator />
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <div>
            <div className="section-head" style={{ marginBottom: '24px' }}>
              <p className="eyebrow">Request a Quote</p>
              <h2>Let&apos;s talk about your date.</h2>
            </div>
            <form className="quote" onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label>Your name</label>
                <input type="text" placeholder="Jordan Ellis" />
              </div>
              <div className="field">
                <label>Email or phone</label>
                <input type="text" placeholder="you@email.com" />
              </div>
              <div className="field">
                <label>Occasion</label>
                <select>
                  <option>Wedding</option>
                  <option>Municipal / City</option>
                  <option>Corporate</option>
                  <option>Festival</option>
                  <option>Gender Reveal</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field">
                <label>Event date</label>
                <input type="text" placeholder="July 4, 2026" />
              </div>
              <div className="field full">
                <label>Venue or city</label>
                <input type="text" placeholder="Manor, TX — ranch / outdoor field" />
              </div>
              <div className="field full">
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} type="submit">
                  Request My Quote →
                </button>
              </div>
            </form>
            <p className="disclaimer">
              Concept form — not wired up. We reply within 24 hours · No obligation · We pull all
              required permits.
            </p>
          </div>
          <div>
            <div className="info-row">
              <Pin />
              <div>
                <b>Based in Manor, TX</b>
                <span>Serving Austin, Round Rock, Pflugerville, Bastrop, Georgetown &amp; the Hill Country</span>
              </div>
            </div>
            <div className="info-row">
              <Phone />
              <div>
                <b>(512) 555-0199</b>
                <span>Mon–Sat · Book 6–8 weeks ahead for peak dates</span>
              </div>
            </div>
            <div className="info-row">
              <Mail />
              <div>
                <b>hello@usgpyro.com</b>
                <span>Send your date, venue &amp; vision</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
