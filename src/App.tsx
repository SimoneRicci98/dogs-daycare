import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { it } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import './App.css'

registerLocale('it', it)

interface DateRange {
  start: Date | null
  end: Date | null
}

interface TariffPeriod {
  start: string
  end: string
  price: number
}

function App() {
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null })
  const [numberOfDogs, setNumberOfDogs] = useState<number>(2)
  const [heatedBox, setHeatedBox] = useState<boolean>(false)
  const [swimmingPool, setSwimmingPool] = useState<boolean>(false)

  const tariffPeriods: TariffPeriod[] = [
    { start: '15/01', end: '30/07', price: 20 },
    { start: '01/08', end: '15/09', price: 25 },
    { start: '16/09', end: '19/12', price: 20 },
    { start: '20/12', end: '14/01', price: 25 },
    { start: '24/12', end: '25/12', price: 100 },
    { start: '31/12', end: '01/01', price: 100 }
  ]

  const getTariffForDate = (date: Date): number => {
    const month = date.getMonth() + 1
    
    for (const period of tariffPeriods) {
      const [startDay, startMonth] = period.start.split('/').map(Number)
      const [endDay, endMonth] = period.end.split('/').map(Number)
      
      let startDate = new Date(date.getFullYear(), startMonth - 1, startDay)
      let endDate = new Date(date.getFullYear(), endMonth - 1, endDay)
      
      // Handle year transitions for periods that cross year boundaries
      if (endMonth < startMonth) {
        // This period crosses into the next year
        if (month >= startMonth) {
          // Current date is in the start year
          endDate = new Date(date.getFullYear() + 1, endMonth - 1, endDay)
        } else {
          // Current date is in the end year
          startDate = new Date(date.getFullYear() - 1, startMonth - 1, startDay)
        }
      }
      
      if (date >= startDate && date <= endDate) {
        return period.price
      }
    }
    
    return 20
  }

  const calculateTotal = (): number => {
    if (!dateRange.start || !dateRange.end) return 0

    const days = Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    let total = 0

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(dateRange.start)
      currentDate.setDate(dateRange.start.getDate() + i)
      
      let dailyPrice = getTariffForDate(currentDate)
      
      if (numberOfDogs > 1) {
        const firstDogPrice = dailyPrice
        const additionalDogsPrice = (dailyPrice / 2) * (numberOfDogs - 1)
        dailyPrice = firstDogPrice + additionalDogsPrice
      }
      
      if (heatedBox) {
        dailyPrice += 5
      }
      
      total += dailyPrice
    }

    if (swimmingPool) {
      total += 25
    }

    return total
  }

  const handleDateChange = (type: 'start' | 'end', date: Date | null) => {
    if (type === 'start') {
      setDateRange(prev => ({ ...prev, start: date }))
    } else {
      setDateRange(prev => ({ ...prev, end: date }))
    }
  }

  const reset = () => {
    setDateRange({ start: null, end: null })
    setNumberOfDogs(2)
    setHeatedBox(false)
    setSwimmingPool(false)
  }

  const total = calculateTotal()

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Calendario Pensione Cani</h1>
        
        <div className="form-group">
          <label>Data di inizio:</label>
          <DatePicker
            selected={dateRange.start}
            onChange={(date: Date | null) => handleDateChange('start', date)}
            selectsStart
            startDate={dateRange.start}
            endDate={dateRange.end}
            dateFormat="dd/MM/yyyy"
            placeholderText="Seleziona data di inizio"
            className="date-picker"
            locale="it"
          />
        </div>

        <div className="form-group">
          <label>Data di fine:</label>
          <DatePicker
            selected={dateRange.end}
            onChange={(date: Date | null) => handleDateChange('end', date)}
            selectsEnd
            startDate={dateRange.start}
            endDate={dateRange.end}
            minDate={dateRange.start || undefined}
            dateFormat="dd/MM/yyyy"
            placeholderText="Seleziona data di fine"
            className="date-picker"
            locale="it"
          />
        </div>

        <div className="form-group">
          <label>Numero di cani:</label>
          <input
            type="number"
            min="1"
            value={numberOfDogs}
            onChange={(e) => setNumberOfDogs(parseInt(e.target.value) || 1)}
            className="number-input"
          />
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={heatedBox}
              onChange={(e) => setHeatedBox(e.target.checked)}
            />
            Box riscaldato (+5€/giorno)
          </label>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={swimmingPool}
              onChange={(e) => setSwimmingPool(e.target.checked)}
            />
            Piscina (+25€ totale)
          </label>
        </div>

        {total > 0 && (
          <div className="total">
            <h2>Totale: €{total.toFixed(2)}</h2>
          </div>
        )}

        <button onClick={reset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  )
}

export default App
