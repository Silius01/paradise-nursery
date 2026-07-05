import { useState } from 'react'
import Burst from './Burst'
import Lightbox from './Lightbox'
import { GALLERY, GALLERY_FILTERS } from '../data/shows'

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const shows = GALLERY.filter((g) => filter === 'all' || g.cat === filter)

  return (
    <>
      <div className="segbar">
        {GALLERY_FILTERS.map((f) => (
          <button
            key={f.key}
            className={`chip${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid">
        {shows.map((g) => (
          <button
            key={g.name}
            className="card"
            aria-label={`${g.name} — ${g.meta}`}
            onClick={() => setSelected(g)}
          >
            <Burst className="art" pal={g.pal} style={{ height: `${g.h}px` }}>
              <span className="tag">{g.cat}</span>
              <span className="play" aria-hidden="true" />
              <div className="meta">
                <div className="t">{g.name}</div>
                <div className="d">{g.meta}</div>
              </div>
            </Burst>
          </button>
        ))}
      </div>

      <Lightbox show={selected} onClose={() => setSelected(null)} />
    </>
  )
}
