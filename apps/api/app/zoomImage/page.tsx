import { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function ZoomableImage({ src, alt }: any) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (isZoomed) {
      setShowOverlay(true);
      setTimeout(() => setFadeIn(true), 20);
    } else {
      setFadeIn(false);
      const timeout = setTimeout(() => setShowOverlay(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isZoomed]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        style={{ cursor: "zoom-in", maxWidth: "300px" }}
        onClick={() => setIsZoomed(true)}
      />

      {showOverlay && (
        <div
          onClick={() => setIsZoomed(false)}
          className={`${styles.overlay} ${fadeIn ? styles.overlayVisible : ""}`}
        >
          <img
            src={src}
            alt={alt}
            className={`${styles.zoomedImage} ${
              fadeIn ? styles.imageVisible : ""
            }`}
          />
        </div>
      )}
    </>
  );
}
