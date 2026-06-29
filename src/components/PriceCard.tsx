import React from "react";

const PriceCard: React.FC = () => {
  return (
    <div className="price-card">
      <div className="price-card-header">
        <span>Listino prezzi e info</span>
      </div>

      {/* Base rates — 2-column tier layout */}
      <div className="price-tiers">
        <div className="price-tier">
          <div className="tier-badge tier-standard">Standard</div>
          <div className="tier-price">€20<span className="tier-unit">/g</span></div>
          <div className="tier-periods">
            <span>15 Gen – 30 Lug</span>
            <span>16 Set – 19 Dic</span>
          </div>
        </div>
        <div className="price-tier-divider" />
        <div className="price-tier">
          <div className="tier-badge tier-alta">Alta Stagione</div>
          <div className="tier-price">€25<span className="tier-unit">/g</span></div>
          <div className="tier-periods">
            <span>1 Ago – 15 Set</span>
            <span>20 Dic – 14 Gen</span>
          </div>
        </div>
      </div>

      {/* Special prices */}
      <div className="special-prices">
        <div className="special-price-item">
          <span>🎄 Natale <span className="special-dates">24 – 25 Dic</span></span>
          <span className="special-price-value">€100/g</span>
        </div>
        <div className="special-price-item">
          <span>🎆 Capodanno <span className="special-dates">31 Dic – 1 Gen</span></span>
          <span className="special-price-value">€100/g</span>
        </div>
      </div>

      {/* Rules */}
      <div className="extra-info-section">
        <h4 className="info-title">Regole e Opzioni</h4>
        <ul className="info-list">
          <li><strong>Pluricane:</strong> 50% di sconto dal 2° cane.</li>
          <li><strong>Box riscaldato:</strong> +5€/gg </li>
          <li><strong>Piscina:</strong> +25€ una tantum (giu-ago).</li>
        </ul>
      </div>
    </div>
  );
};

export default PriceCard;
