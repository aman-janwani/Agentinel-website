"use client";

import { useEffect, useState } from "react";

export function NavbarScrollBorder() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
      style={{
        background: "linear-gradient(90deg, transparent, #E5E7EB 20%, #E5E7EB 80%, transparent)",
        opacity: scrolled ? 1 : 0,
      }}
    />
  );
}
