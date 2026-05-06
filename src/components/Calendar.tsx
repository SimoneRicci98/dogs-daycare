import DatePicker, { registerLocale } from 'react-datepicker'
import { it } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

registerLocale('it', it)

interface CalendarProps {
  startDate: Date | null
  endDate: Date | null
  onChange: (dates: [Date | null, Date | null]) => void
}

const Calendar: React.FC<CalendarProps> = ({ startDate, endDate, onChange }) => {
  return (
    <div className="custom-calendar-wrapper">
      <div className="calendar-header-info">
        <CalendarIcon size={16} className="text-primary" />
        <span>Seleziona le date</span>
      </div>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        locale="it"
        minDate={new Date()}
        shouldCloseOnSelect={false}
        disabledKeyboardNavigation
        renderCustomHeader={({
          monthDate,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="datepicker-custom-header">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type="button"
              className="nav-button"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="current-month">
              {monthDate.toLocaleString('it-IT', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type="button"
              className="nav-button"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      />
      <div className="calendar-footer-info">
        <div className="date-badge start">
          <label>Check-in</label>
          <strong>{startDate ? startDate.toLocaleDateString('it-IT') : '--/--/--'}</strong>
        </div>
        <div className="date-badge-divider" />
        <div className="date-badge end">
          <label>Check-out</label>
          <strong>{endDate ? endDate.toLocaleDateString('it-IT') : '--/--/--'}</strong>
        </div>
      </div>
    </div>
  )
}

export default Calendar
