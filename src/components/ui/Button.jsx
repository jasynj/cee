export default function Button({ variant = 'primary', children, onClick, type = 'button', disabled = false, className = '' }) {
  const base = 'font-nav px-8 py-3 text-sm uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer border-2'

  const variants = {
    primary: 'bg-gold border-gold text-black hover:bg-transparent hover:text-gold disabled:opacity-50',
    outline: 'bg-transparent border-gold text-gold hover:bg-gold hover:text-black disabled:opacity-50',
    white: 'bg-transparent border-white text-white hover:bg-gold hover:border-gold hover:text-black disabled:opacity-50',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
