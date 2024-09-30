import React from "react";
import styles from "./Tooltips.module.css";

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  width?: string;
};

export default function Tooltips({
  children,
  content,
  position = "top",
  width,
}: Props) {
  const tooltipStyle = {
    maxWidth: width || "100px",
  };

  const tooltipClass = `${styles.tooltip} ${
    styles["tooltip" + position.charAt(0).toUpperCase() + position.slice(1)]
  }`;

  return (
    <div className={styles.container}>
      {children}
      <div className={tooltipClass} style={tooltipStyle}>
        {content}
      </div>
    </div>
  );
}
