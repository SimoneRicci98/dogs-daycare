import React from "react";
import { Dog, Flame, Waves, Minus, Plus } from "lucide-react";

interface OptionsCardProps {
  numberOfDogs: number;
  setNumberOfDogs: (n: number) => void;
  heatedBox: boolean;
  setHeatedBox: (b: boolean) => void;
  swimmingPool: boolean;
  setSwimmingPool: (b: boolean) => void;
  isPoolSeason: boolean;
}

const OptionsCard: React.FC<OptionsCardProps> = ({
  numberOfDogs,
  setNumberOfDogs,
  heatedBox,
  setHeatedBox,
  swimmingPool,
  setSwimmingPool,
  isPoolSeason,
}) => {
  return (
    <div className="form-section">
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
            type="button"
            className="stepper-btn"
            onClick={() => setNumberOfDogs(Math.max(1, numberOfDogs - 1))}
          >
            <Minus size={16} />
          </button>
          <span className="stepper-value">{numberOfDogs}</span>
          <button
            type="button"
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
            <span className="label-title">Piscina {!isPoolSeason && "(Chiusa)"}</span>
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
    </div>
  );
};

export default OptionsCard;
