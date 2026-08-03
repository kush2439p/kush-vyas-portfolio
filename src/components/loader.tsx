"use client";

import { useEffect, useState } from "react";
import { MagneticText } from "@/components/magnetic-text";

export function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.sessionStorage.getItem("kush-portfolio-loader") === "seen";

    if (reduced || seen) {
      const timer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem("kush-portfolio-loader", "seen");
      setVisible(false);
    }, 1080);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-loader" aria-hidden="true">
      <div className="loader-sequence">{Array.from({ length: 5 }, (_, index) => <span key={index} />)}</div>
      <p><MagneticText text="Opening portfolio" /></p>
    </div>
  );
}
