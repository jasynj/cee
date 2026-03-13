import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '../../constants/navigation'
import { MdMenu, MdClose } from 'react-icons/md'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (item) => {
    setIsOpen(false)

    if (item.hash && location.pathname === item.path) {
      const el = document.getElementById(item.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else if (item.hash) {
      navigate(`${item.path}#${item.hash}`)
    } else {
      navigate(item.path)
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-black shadow-lg shadow-black/30 py-2'
          : 'bg-transparent py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer"
          >
            {!logoError ? (
              <img
                src="/images/logo.png"
                alt="CEE Logo"
                className="h-12 w-auto"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-baseline gap-1.5">
                {/* <span className="font-heading text-lg md:text-xl font-semibold text-gold leading-none">CEE</span>
                <span className="hidden sm:inline font-script text-gold text-base md:text-lg leading-none">Craig Events</span> */}
                <img src={logo} alt="Logo" className="h-8 w-auto" onError={() => setLogoError(true)} />
              </div>

            )}
          </button>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`font-nav text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer ${location.pathname === item.path && !item.hash
                  ? 'text-gold'
                  : 'text-white/80 hover:text-gold'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/98 flex items-center justify-center lg:hidden">
          <button
            className="absolute top-6 right-6 text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <MdClose size={32} />
          </button>
          <nav className="flex flex-col items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="font-nav text-lg text-white/90 hover:text-gold transition-colors uppercase tracking-[0.3em] cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
