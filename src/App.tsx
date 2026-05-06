import { useState } from "react";
import Calendar from "./components/Calendar";
import { Dog, Flame, Waves, Minus, Plus, RefreshCw } from "lucide-react";
import "./App.css";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface TariffPeriod {
  start: string;
  end: string;
  price: number;
}

function App() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [numberOfDogs, setNumberOfDogs] = useState<number>(2);
  const [heatedBox, setHeatedBox] = useState<boolean>(false);
  const [swimmingPool, setSwimmingPool] = useState<boolean>(false);

  const tariffPeriods: TariffPeriod[] = [
    { start: "15/01", end: "30/07", price: 20 },
    { start: "01/08", end: "15/09", price: 25 },
    { start: "16/09", end: "19/12", price: 20 },
    { start: "20/12", end: "14/01", price: 25 },
    { start: "24/12", end: "25/12", price: 100 },
    { start: "31/12", end: "01/01", price: 100 },
  ];

  const getTariffForDate = (date: Date): number => {
    const month = date.getMonth() + 1;

    for (const period of tariffPeriods) {
      const [startDay, startMonth] = period.start.split("/").map(Number);
      const [endDay, endMonth] = period.end.split("/").map(Number);

      let startDate = new Date(date.getFullYear(), startMonth - 1, startDay);
      let endDate = new Date(date.getFullYear(), endMonth - 1, endDay);

      if (endMonth < startMonth) {
        if (month >= startMonth) {
          endDate = new Date(date.getFullYear() + 1, endMonth - 1, endDay);
        } else {
          startDate = new Date(
            date.getFullYear() - 1,
            startMonth - 1,
            startDay
          );
        }
      }

      if (date >= startDate && date <= endDate) {
        return period.price;
      }
    }

    return 20;
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setDateRange({ start, end });

    if (start) {
      const month = start.getMonth(); // 0-indexed
      const isWinter = month >= 10 || month <= 2; // Nov (10) to Mar (2)
      const isSummer = month >= 5 && month <= 7; // Jun (5) to Aug (7)

      if (isWinter) setHeatedBox(true);
      if (!isWinter) setHeatedBox(false);
      if (isSummer) setSwimmingPool(true);
      if (!isSummer) setSwimmingPool(false);
    }
  };

  const isPoolSeason = (() => {
    if (!dateRange.start) return true;
    const month = dateRange.start.getMonth();
    return month >= 5 && month <= 7; // June 1st to August 31st
  })();

  const { days, total } = (() => {
    if (!dateRange.start || !dateRange.end) return { days: 0, total: 0 };

    const dayCount =
      Math.ceil(
        (dateRange.end.getTime() - dateRange.start.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    let totalCost = 0;

    for (let i = 0; i < dayCount; i++) {
      const currentDate = new Date(dateRange.start);
      currentDate.setDate(dateRange.start.getDate() + i);

      let dailyPrice = getTariffForDate(currentDate);

      if (numberOfDogs > 1) {
        const firstDogPrice = dailyPrice;
        const additionalDogsPrice = (dailyPrice / 2) * (numberOfDogs - 1);
        dailyPrice = firstDogPrice + additionalDogsPrice;
      }

      if (heatedBox) {
        dailyPrice += 5;
      }

      totalCost += dailyPrice;
    }

    if (swimmingPool) {
      totalCost += 25;
    }

    return { days: dayCount, total: totalCost };
  })();

  const reset = () => {
    setDateRange({ start: null, end: null });
    setNumberOfDogs(2);
    setHeatedBox(false);
    setSwimmingPool(false);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="title-section">
          <h1 className="title">Pensione Pancalieri</h1>
        </header>

        <section className="card">
          <Calendar
            startDate={dateRange.start}
            endDate={dateRange.end}
            onChange={handleDateChange}
          />
        </section>

        <section className="form-section">
          <div className="input-row">
            <div className="input-label-with-icon">
              <div className="icon-box">
                <Dog size={20} />
              </div>
              <div className="label-text">
                <span className="label-title">Numero di cani</span>
                <span className="label-desc">Sconto dal secondo cane</span>
              </div>
            </div>
            <div className="stepper">
              <button 
                className="stepper-btn" 
                onClick={() => setNumberOfDogs(Math.max(1, numberOfDogs - 1))}
              >
                <Minus size={16} />
              </button>
              <span className="stepper-value">{numberOfDogs}</span>
              <button 
                className="stepper-btn" 
                onClick={() => setNumberOfDogs(numberOfDogs + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="input-row">
            <div className="input-label-with-icon">
              <div className="icon-box">
                <Flame size={20} />
              </div>
              <div className="label-text">
                <span className="label-title">Box riscaldato</span>
                <span className="label-desc">+5€ al giorno</span>
              </div>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={heatedBox}
                onChange={(e) => setHeatedBox(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="input-row" style={{ opacity: isPoolSeason ? 1 : 0.6 }}>
            <div className="input-label-with-icon">
              <div className="icon-box">
                <Waves size={20} />
              </div>
              <div className="label-text">
                <span className="label-title">Piscina {!isPoolSeason && '(Chiusa)'}</span>
                <span className="label-desc">+25€ una tantum</span>
              </div>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={swimmingPool}
                disabled={!isPoolSeason}
                onChange={(e) => setSwimmingPool(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </section>

        <div className="summary-card">
          <div className="summary-details">
            <div className="detail-item">
              <span className="detail-label">Durata</span>
              <span className="detail-value">{days} {days === 1 ? 'giorno' : 'giorni'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Totale</span>
              <span className="total-value">€{total.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={reset} className="reset-btn">
            <RefreshCw size={16} style={{marginRight: '8px', verticalAlign: 'middle'}} />
            Nuovo Calcolo
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
