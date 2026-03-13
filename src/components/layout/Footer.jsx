import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'

const socialLinks = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTiktok, href: '#', label: 'TikTok' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
]

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/about', hash: 'services' },
  // { label: 'Portfolio', path: '/', hash: 'gallery' },
  { label: 'Book an Event', path: '/book' },
]

export default function Footer() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleLinkClick = (link) => {
    if (link.hash) {
      navigate(`${link.path}#${link.hash}`)
    } else {
      navigate(link.path)
    }
  }

  return (
    <footer className="bg-dark-card pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-heading text-2xl font-semibold text-gold mb-4">
              Craig Events
            </h3>
            <p className="font-script text-gold text-lg mb-4">& Entertainments</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Bringing your vision into reality with exceptional event planning, entertainment, and unforgettable experiences.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-nav text-xs uppercase tracking-[0.2em] text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-white/50 text-sm hover:text-gold transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-nav text-xs uppercase tracking-[0.2em] text-white mb-6">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MdLocationOn className="text-gold flex-shrink-0 mt-0.5" size={18} />
                <span>Your City, Your Country</span>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <MdPhone className="text-gold flex-shrink-0" size={18} />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <MdEmail className="text-gold flex-shrink-0" size={18} />
                <span>info@ceecraigevents.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-nav text-xs uppercase tracking-[0.2em] text-white mb-6">
              Newsletter
            </h4>
            <p className="text-white/50 text-sm mb-4">
              Subscribe to get updates on our latest events and offers.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setEmail('')
              }}
              className="flex"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-dark-elevated border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="bg-gold text-black px-5 py-2.5 font-nav text-xs uppercase tracking-wider hover:bg-gold-dark transition-colors cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Craig Events & Entertainments. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Designed with excellence
          </p>
        </div>
      </div>
    </footer>
  )
}
