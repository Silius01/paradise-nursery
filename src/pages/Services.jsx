import { Spark } from '../components/Icons'
import { SERVICES, STEPS } from '../data/shows'

export default function Services() {
  return (
    <div className="page">
      <section className="band page-top">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">What We Fire</p>
            <h2>From a first-dance finale to a city&apos;s July 4th.</h2>
          </div>
          <div className="svc-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className={`svc${s.specialty ? ' specialty' : ''}`}>
                {s.specialty ? (
                  <span className="pill">Burn-ban proof</span>
                ) : (
                  <div className="ic">
                    <Spark size={20} />
                  </div>
                )}
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">How It Works</p>
            <h2>We handle the permits. You watch the sky.</h2>
          </div>
          <div className="timeline">
            {STEPS.map((s) => (
              <div key={s.n} className="step">
                <div className="n">{s.n}</div>
                <div className="dot" />
                <div className="bar" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
