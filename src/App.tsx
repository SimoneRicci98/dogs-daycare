import { useState } from "react";
import Calendar from "./components/Calendar";
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
  };

  const { days, total } = (() => {
    if (!dateRange.start || !dateRange.end) return { days: 0, total: 0 };

    const dayCount =
      Math.ceil(
        (dateRange.end.getTime() - dateRange.start.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    console.log(dayCount);
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
    setNumberOfDogs(1);
    setHeatedBox(false);
    setSwimmingPool(false);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Calcola Preventivo</h1>

        <div className="calendar-container">
          <Calendar
            startDate={dateRange.start}
            endDate={dateRange.end}
            onChange={handleDateChange}
          />
        </div>

        <div className="form-group">
          <label>Numero di cani:</label>
          <input
            type="number"
            min="1"
            value={numberOfDogs}
            onChange={(e) => setNumberOfDogs(parseInt(e.target.value) || 2)}
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

        {days > 0 && (
          <div className="summary">
            <div className="summary-item">
              <span>Numero di giorni</span>
              <strong>{days}</strong>
            </div>
            <div className="summary-item total">
              <span>Totale</span>
              <strong>€{total.toFixed(2)}</strong>
            </div>
          </div>
        )}

        <button onClick={reset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
