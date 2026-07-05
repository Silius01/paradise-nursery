import featuredShow from '../assets/featured-show.jpg'

export { featuredShow }

// Firework palettes — brand green leads; others kept for realistic variety.
export const PALETTES = {
  green: ['#7DF59A', '#3DB54E', '#e9fff0'],
  white: ['#ffffff', '#bfffcf', '#7DF59A'],
  gold: ['#FFD86B', '#F2A93B', '#ff7a1a'],
  magenta: ['#FF3D7F', '#ff8ab0', '#c11e56'],
  cyan: ['#2EE6D6', '#8bfff2', '#0fa9a0'],
  reveal: ['#FF3D7F', '#3A8DFF', '#ffffff'],
}

export const FEATURED = [
  { name: 'Central Texas Independence Day', kind: 'Municipal · July 4th', img: featuredShow, alt: 'A USG finale of aerial bursts and ground flame effects over a packed field of spectators', blurb: 'Aerial shells, low-break flame effects, and a wall of finale over a packed field — the kind of night a whole town turns out for.' },
  { name: 'Vista West Ranch', kind: 'Wedding · Pyromusical', pal: 'green', blurb: "A six-minute first-dance finale synced note-for-note to the couple's song." },
  { name: 'City of Pflugerville', kind: 'Municipal · July 4th', pal: 'white', blurb: 'An 18-minute civic display for 12,000 spectators — permits and COI handled end to end.' },
  { name: 'Drone + Pyro Hybrid', kind: 'Specialty · 200 Drones', pal: 'green', blurb: 'A 200-drone light show woven into live pyro — quiet, burn-ban-proof storytelling.' },
  { name: 'Hill Country Estate', kind: 'Wedding · Monogram Finale', pal: 'magenta', blurb: "The couple's initials written in the sky above a private ranch." },
  { name: 'Indoor Gala', kind: 'Specialty · Cold Spark', pal: 'cyan', blurb: 'No open flame, no permits, no smoke — indoor-safe fountains for a black-tie launch.' },
]

export const GALLERY = [
  { name: 'Central Texas Independence Day', meta: 'Municipal · flame + aerial finale', cat: 'municipal', img: featuredShow, alt: 'Fireworks finale with ground flame effects over a large crowd', h: 200 },
  { name: 'Vista West Ranch', meta: 'Wedding · 6 min · pyromusical', cat: 'wedding', pal: 'green', h: 150 },
  { name: 'City of Pflugerville', meta: 'Municipal · 18 min · July 4th', cat: 'municipal', pal: 'white', h: 120 },
  { name: 'Q4 Product Launch', meta: 'Corporate · cold spark + aerial', cat: 'corporate', pal: 'cyan', h: 170 },
  { name: 'Blanco County Fair', meta: 'Festival · grand finale', cat: 'festival', pal: 'gold', h: 130 },
  { name: 'Hill Country Estate', meta: 'Wedding · monogram finale', cat: 'wedding', pal: 'green', h: 190 },
  { name: "It's a Girl!", meta: 'Reveal · ground + aerial', cat: 'specialty', pal: 'reveal', h: 120 },
  { name: 'Downtown NYE', meta: 'Municipal · midnight count', cat: 'municipal', pal: 'green', h: 160 },
  { name: 'Dell Diamond', meta: 'Corporate · stadium walk-out', cat: 'corporate', pal: 'white', h: 140 },
  { name: 'Lakeway Barge Show', meta: 'Festival · waterfront', cat: 'festival', pal: 'green', h: 175 },
  { name: 'Indoor Gala', meta: 'Specialty · cold spark fountains', cat: 'specialty', pal: 'cyan', h: 120 },
  { name: 'Ranch Proposal', meta: 'Wedding · private, 3 min', cat: 'wedding', pal: 'magenta', h: 145 },
  { name: 'Drone + Pyro Hybrid', meta: 'Specialty · 200-drone show', cat: 'specialty', pal: 'green', h: 200 },
]

export const GALLERY_FILTERS = [
  { key: 'all', label: 'All Shows' },
  { key: 'wedding', label: 'Weddings' },
  { key: 'municipal', label: 'Municipal' },
  { key: 'corporate', label: 'Corporate' },
  { key: 'festival', label: 'Festivals' },
  { key: 'specialty', label: 'Specialty' },
]

export const SERVICES = [
  { title: 'Weddings & Private', body: 'First-dance finales, monogram shells, and low-noise ranch options tuned to your colors.', specialty: false },
  { title: 'Municipal & Public', body: 'July 4th, Juneteenth, and NYE shows with full permit handling and additional-insured COIs.', specialty: false },
  { title: 'Corporate & Grand Openings', body: 'Brand-color choreography, stadium walk-outs, and product-launch moments.', specialty: false },
  { title: 'Festivals & Fairs', body: 'County-fair finales and waterfront barge shows scaled to your crowd and site.', specialty: false },
  { title: 'Cold Spark Fountains', body: 'Indoor-safe, no open flame, no permit headaches — perfect for venues that ban aerial pyro.', specialty: true },
  { title: 'Drone Light Shows', body: 'Quiet, pet-friendly, burn-ban-proof aerial storytelling — solo or synced with fireworks.', specialty: true },
]

export const HIGHLIGHTS = [
  { title: 'Weddings', body: 'Cinematic finales designed to your first dance.', to: '/gallery' },
  { title: 'Municipal Shows', body: 'Civic displays with every permit handled.', to: '/services' },
  { title: 'Cold Spark & Drone', body: 'Burn-ban-proof effects, indoor or out.', to: '/services' },
  { title: 'Build Your Show', body: 'Design it live, then send it to a quote.', to: '/contact' },
]

export const STEPS = [
  { n: '01', title: 'Consult & Quote', body: 'Tell us the date, venue, and vibe. We reply within 24 hours.' },
  { n: '02', title: 'Site Survey & Permits', body: 'We assess the launch site and file every required permit for you.' },
  { n: '03', title: 'Design & Choreograph', body: 'A shot-by-shot show designed to your music and palette.' },
  { n: '04', title: 'Show Day', body: 'Licensed crew sets up, fires electronically, and clears the site clean.' },
]

export function hexToRgb(h) {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
