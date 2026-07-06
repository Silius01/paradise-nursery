import { PALETTES } from '../data/shows'

// Firework artwork for cards/slides. Renders a real photo when `img` is given,
// otherwise falls back to the CSS-generated firework-burst placeholder.
export default function Burst({ pal = 'green', img, alt = '', className = '', style = {}, children, ...rest }) {
  const [c1, c2] = PALETTES[pal] || PALETTES.green
  return (
    <div
      className={`burst ${img ? 'has-img' : ''} ${className}`}
      style={{ '--c1': c1, '--c2': c2, ...style }}
      {...rest}
    >
      {img && <img className="burst-photo" src={img} alt={alt} loading="lazy" />}
      {children}
    </div>
  )
}
