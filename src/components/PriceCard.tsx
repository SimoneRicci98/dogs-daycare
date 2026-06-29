import React from "react";
import { Info } from "lucide-react";

const PriceCard: React.FC = () => {
  return (
    <div className="card price-card">
      <div className="price-card-header">
        <Info size={16} className="price-card-header-icon" />
        <span>Listino prezzi e info</span>
      </div>

      <div className="prices-grid">
        <div className="price-item">
          <span className="period">Standard (15 Gen - 30 Lug)</span>
          <span className="price">€20/giorno</span>
        </div>
        <div className="price-item">
          <span className="period">Alta Stagione (1 Ago - 15 Set)</span>
          <span className="price">€25/giorno</span>
        </div>
        <div className="price-item">
          <span className="period">Standard (16 Set - 19 Dic)</span>
          <span className="price">€20/giorno</span>
        </div>
        <div className="price-item">
          <span className="period">Alta Stagione (20 Dic - 14 Gen)</span>
          <span className="price">€25/giorno</span>
        </div>
        <div className="price-item special">
          <span className="period">Natale (24 Dic - 25 Dic)</span>
          <span className="price">€100/giorno</span>
        </div>
        <div className="price-item special">
          <span className="period">Capodanno (31 Dic - 1 Gen)</span>
          <span className="price">€100/giorno</span>
        </div>
      </div>

      <div className="extra-info-section">
        <h4 className="info-title">Regole e Opzioni</h4>
        <ul className="info-list">
          <li>
            <strong>Sconto pluricane:</strong> 50% di sconto sulla tariffa giornaliera dal secondo cane.
          </li>
          <li>
            <strong>Box riscaldato:</strong> +5€ al giorno (pre-selezionato nov-mar).
          </li>
          <li>
            <strong>Piscina:</strong> +25€ una tantum (disponibile giu-ago).
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PriceCard;
