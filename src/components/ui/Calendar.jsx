import { useState } from 'react'

export default function Calendar({ selectedDate, onSelect }) {
  const [viewDate, setViewDate] = useState(() => {
    const d = selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date()
    return { year: d.getFullYear(), month: d.getMonth() }
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const daysInMonth = new Date(viewDate.year, viewDate.month + 1, 0).getDate()
  const firstDayOfWeek = new Date(viewDate.year, viewDate.month, 1).getDay()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const prevMonth = () => {
    setViewDate((prev) => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 }
      return { ...prev, month: prev.month - 1 }
    })
  }

  const nextMonth = () => {
    setViewDate((prev) => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 }
      return { ...prev, month: prev.month + 1 }
    })
  }

  const handleDayClick = (day) => {
    const date = new Date(viewDate.year, viewDate.month, day)
    if (date < today) return
    const yyyy = viewDate.year
    const mm = String(viewDate.month + 1).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    onSelect(`${yyyy}-${mm}-${dd}`)
  }

  const isPastMonth =
    viewDate.year < today.getFullYear() ||
    (viewDate.year === today.getFullYear() && viewDate.month <= today.getMonth())

  return (
    <div className="bg-dark-elevated border border-white/10 p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          disabled={isPastMonth}
          className={`w-8 h-8 flex items-center justify-center text-white/50 hover:text-gold transition-colors cursor-pointer ${
            isPastMonth ? 'opacity-30 cursor-not-allowed' : ''
          }`}
        >
          &larr;
        </button>
        <h3 className="font-heading text-lg text-white font-semibold">
          {monthNames[viewDate.month]} {viewDate.year}
        </h3>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-gold transition-colors cursor-pointer"
        >
          &rarr;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="text-center text-white/30 text-xs font-nav uppercase py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const date = new Date(viewDate.year, viewDate.month, day)
          const isPast = date < today
          const dateStr = `${viewDate.year}-${String(viewDate.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isSelected = selectedDate === dateStr

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={isPast}
              className={`h-10 flex items-center justify-center text-sm transition-all cursor-pointer ${
                isPast
                  ? 'text-white/15 cursor-not-allowed'
                  : isSelected
                    ? 'bg-gold text-black font-semibold'
                    : 'text-white/70 hover:bg-gold/20 hover:text-gold'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
