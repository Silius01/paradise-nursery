import { Shield, CheckDoc, Clock, Launch } from '../components/Icons'

const CREDS = [
  { icon: <Shield size={20} />, title: 'ATF Federal License', body: 'Storage & use of 1.3G display fireworks' },
  { icon: <CheckDoc size={20} />, title: 'TDLR Operators', body: 'State-licensed lead pyrotechnicians' },
  { icon: <Clock size={20} />, title: '$5M Liability', body: 'COI naming your venue on request' },
  { icon: <Launch size={20} />, title: 'Electronic Firing', body: 'Music-synced, frame-accurate shows' },
]

const REVIEWS = [
  { quote: "The finale synced to our first song and half the reception was crying. They handled the venue's fire marshal entirely.", who: 'Priya & Marcus', where: 'Vista West Ranch wedding' },
  { quote: 'Ran our Independence Day show three years running. COI on file, permits pulled early, flawless load-out.', who: 'Parks & Rec Director', where: 'City of Pflugerville' },
  { quote: 'Cold-spark indoor effects our venue swore were impossible. Professional from site survey to teardown.', who: 'Event Lead', where: 'Austin tech launch' },
]

export default function About() {
  return (
    <div className="page">
      <section className="band dusk page-top">
        <div className="wrap about-grid">
          <div>
            <p className="eyebrow mute">About &amp; Safety</p>
            <h2>A licensed crew, an engineered plan, a clean site.</h2>
            <p>
              We&apos;ve produced over 500 displays across Central Texas since 2009 — from Hill
              Country ranch weddings to municipal Fourth of July shows. Every event runs on a written
              safety plan: fallout-zone modeling, wind and weather go/no-go criteria, and coordination
              with your local fire marshal.
            </p>
            <p style={{ color: 'var(--ink)' }}>
              <strong>Burn ban? Often still a go.</strong> Licensed public displays can frequently
              proceed under an approved burn-ban exception with proper permitting — or we pivot to
              cold-spark and close-proximity effects that carry no open-flame risk.
            </p>
            <p className="disclaimer">
              Concept copy — final site verifies all licensing, insurance figures, and burn-ban
              guidance with ATF, TDLR, and the local fire marshal before publishing.
            </p>
          </div>
          <div className="creds">
            {CREDS.map((c) => (
              <div key={c.title} className="cred">
                {c.icon}
                <div>
                  <b>{c.title}</b>
                  <span>{c.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">In Their Words</p>
            <h2>Trusted by couples, cities, and planners.</h2>
          </div>
          <div className="quotes">
            {REVIEWS.map((r) => (
              <div key={r.who} className="q">
                <div className="stars">★★★★★</div>
                <p>&ldquo;{r.quote}&rdquo;</p>
                <div className="who">
                  <b>{r.who}</b> — {r.where}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
