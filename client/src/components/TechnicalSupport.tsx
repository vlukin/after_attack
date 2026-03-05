import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface TechnicalSupportProps {
  onClose: () => void;
}

const SUPPORT_URL = "https://t.me/LukinVitaly";

export const TechnicalSupport: React.FC<TechnicalSupportProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 style={{ marginBottom: '1rem' }}>Technical Support</h2>
        <div className="qr-container">
          <div className="qr-code">
            <QRCodeSVG value={SUPPORT_URL} size={200} />
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
            <a href="https://t.me/LukinVitaly" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              https://t.me/LukinVitaly
            </a>
          </p>
        </div>
        <button 
          className="glass-button" 
          onClick={onClose}
          style={{ marginTop: '1.5rem' }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TechnicalSupport;
