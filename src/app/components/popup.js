import React from 'react';
import './popup.scss';

export default function Popup({ title, children, onClose, buttons }) {
    return (
        <div className="popup">
            <div className="popup-inner">
                <p className="popup-title">{title}</p>
                <div className="popup-content">
                    {children}
                </div>
                <div className="popup-buttons">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className={`button ${button.type || ''}`}
                            onClick={button.onClick}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
