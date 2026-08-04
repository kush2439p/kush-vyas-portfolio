"use client";

import { useEffect, useState } from "react";
import { Leaf } from "@phosphor-icons/react";

export function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.sessionStorage.getItem("kush-portfolio-copper-leaves-loader-v2") === "seen";

    if (reduced || seen) {
      const timer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem("kush-portfolio-copper-leaves-loader-v2", "seen");
      setVisible(false);
    }, 880);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-loader" data-site-loader aria-hidden="true">
      <div className="loader-leaves">{Array.from({ length: 7 }, (_, index) => <Leaf data-loader-leaf weight="fill" key={index} />)}</div>
      <p>KUSH.</p>
    </div>
  );
}
