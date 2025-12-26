import React from "react";
import "./ProminentBox.css";

const ProminentBox = ({
  children,
  title,
  icon,
  variant = "default",
  className = "",
}) => {
  return (
    <div className={`prominent-box prominent-box-${variant} ${className}`}>
      {title && (
        <div className="prominent-box-header">
          {icon && <span className="prominent-box-icon">{icon}</span>}
          <h3 className="prominent-box-title">{title}</h3>
        </div>
      )}
      <div className="prominent-box-content">{children}</div>
    </div>
  );
};

export default ProminentBox;
