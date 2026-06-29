import { useState } from "react";
import Calendar from "./components/Calendar";
import PriceCard from "./components/PriceCard";
import OptionsCard from "./components/OptionsCard";
import SummaryCard from "./components/SummaryCard";
import { Info, CalendarDays } from "lucide-react";
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
  const [showTariffs, setShowTariffs] = useState<boolean>(false);

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
    setShowTariffs(false);
  };

  return (
    <div className="app">
      <div className={`container ${showTariffs ? "prices-active" : ""}`}>
        <header className="title-section">
          <h1 className="title">Pensione Pancalieri</h1>
        </header>

        <div className={`app-grid ${showTariffs ? "prices-active" : ""}`}>
          <div className={`flip-card-container ${showTariffs ? "flipped" : ""}`}>
            <div className="flip-card-inner">
              {/* Front: Calendar */}
              <div className="flip-card-front card">
                <button 
                  type="button" 
                  className="flip-btn" 
                  onClick={() => setShowTariffs(true)}
                  title="Mostra listino prezzi"
                >
                  <Info size={16} />
                </button>
                <Calendar
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  onChange={handleDateChange}
                />
              </div>

              {/* Back: Prices */}
              <div className="flip-card-back card">
                <button 
                  type="button" 
                  className="flip-btn" 
                  onClick={() => setShowTariffs(false)}
                  title="Torna al calendario"
                >
                  <CalendarDays size={16} />
                </button>
                <PriceCard />
              </div>
            </div>
          </div>

          <div className={`grid-item options-section ${showTariffs ? "hidden" : ""}`}>
            <OptionsCard
              numberOfDogs={numberOfDogs}
              setNumberOfDogs={setNumberOfDogs}
              heatedBox={heatedBox}
              setHeatedBox={setHeatedBox}
              swimmingPool={swimmingPool}
              setSwimmingPool={setSwimmingPool}
              isPoolSeason={isPoolSeason}
            />
          </div>

          <div className={`grid-item summary-section ${showTariffs ? "hidden" : ""}`}>
            <SummaryCard
              days={days}
              total={total}
              reset={reset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
