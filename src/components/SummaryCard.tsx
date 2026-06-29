import React from "react";
import { RefreshCw } from "lucide-react";

interface SummaryCardProps {
  days: number;
  total: number;
  reset: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ days, total, reset }) => {
  return (
    <div className="summary-card">
      <div className="summary-details">
        <div className="detail-item">
          <span className="detail-label">Durata</span>
          <span className="detail-value">
            {days} {days === 1 ? "giorno" : "giorni"}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Totale</span>
          <span className="total-value">€{total.toFixed(2)}</span>
        </div>
      </div>
      <button onClick={reset} className="reset-btn">
        <RefreshCw
          size={16}
          style={{ marginRight: "8px", verticalAlign: "middle" }}
        />
        Nuovo Calcolo
      </button>
    </div>
  );
};

export default SummaryCard;
