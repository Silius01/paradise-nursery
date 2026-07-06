import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Jump to the top on every route change, like a traditional multi-page site.
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
