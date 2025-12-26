import React from "react";

const MPLogo = ({ size = 50 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }}
    >
      {/* Background Circle - Saffron */}
      ircle cx="50" cy="50" r="48" fill="#ff9933"/>
      {/* Inner Circle - White */}
      ircle cx="50" cy="50" r="42" fill="white"/>
      {/* Ashoka Chakra - Navy Blue */}
      ircle cx="50" cy="50" r="35" fill="none" stroke="#000080"
      strokeWidth="2"/>
      {/* Center dot */}
      ircle cx="50" cy="50" r="4" fill="#000080"/>
      {/* 24 Spokes of Ashoka Chakra */}
      {[...Array(24)].map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x2 = 50 + 32 * Math.cos(angle);
        const y2 = 50 + 32 * Math.sin(angle);
        return (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={x2}
            y2={y2}
            stroke="#000080"
            strokeWidth="1.5"
          />
        );
      })}
      {/* Green Border */}
      ircle cx="50" cy="50" r="48" fill="none" stroke="#138808"
      strokeWidth="3"/>
      {/* MP Text */}
      <text
        x="50"
        y="92"
        textAnchor="middle"
        fill="#c41e3a"
        fontSize="12"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        MP
      </text>
    </svg>
  );
};

export default MPLogo;
