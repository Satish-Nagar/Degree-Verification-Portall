import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="menu-toggle">☰</button>
          <div className="header-search">
            <input
              type="text"
              placeholder="Search anything..."
              className="header-search-input"
            />
          </div>
        </div>

        <div className="header-right">
          <button className="header-icon-btn" title="Notifications">
            🔔
            <span className="notification-badge">5</span>
          </button>
          <button className="header-icon-btn" title="Settings">
            ⚙️
          </button>
          <div className="header-divider"></div>
          <div className="header-user">
            <span className="header-user-name">Mriganka Shekhar Barman</span>
            <div className="header-avatar">MSB</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
