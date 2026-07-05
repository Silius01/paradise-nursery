import { PALETTES } from '../data/shows'

// The CSS-generated firework-burst placeholder art (stands in for real
// show photos/video in the concept build).
export default function Burst({ pal = 'green', className = '', style = {}, children, ...rest }) {
  const [c1, c2] = PALETTES[pal] || PALETTES.green
  return (
    <div className={`burst ${className}`} style={{ '--c1': c1, '--c2': c2, ...style }} {...rest}>
      {children}
    </div>
  )
}
