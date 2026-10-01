"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DESKTOP_WIDTH = 1440;
const DESKTOP_HEIGHT = 900;

export function LiveProjectPreview() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const resize = () => {
      setScale(viewport.clientWidth / DESKTOP_WIDTH);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={viewportRef} className="live-project-viewport">
      <iframe
        className="live-project-frame"
        src="https://prodyous.co/"
        title="Aperçu interactif du site Prodyous"
        loading="lazy"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="fullscreen"
        scrolling="yes"
        style={{ width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT, transform: `scale(${scale})` }}
      />
      <div className="live-project-mobile-fallback">
        <Image
          src="/projects/prodyous-mobile.png"
          alt="Aperçu du site Prodyous"
          fill
          sizes="(max-width: 600px) 100vw, 1px"
        />
      </div>
    </div>
  );
}
