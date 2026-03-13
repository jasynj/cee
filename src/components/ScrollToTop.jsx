import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AOS from 'aos'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Allow page to render, then scroll to hash target
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
    // Refresh AOS so new page elements animate
    setTimeout(() => AOS.refresh(), 200)
  }, [pathname, hash])

  return null
}
