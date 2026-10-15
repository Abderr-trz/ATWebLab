"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DESKTOP_WIDTH = 1440;
const DESKTOP_HEIGHT = 900;

export function LiveDoumiPreview() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (!interactive) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    const resize = () => {
      setScale(viewport.clientWidth / DESKTOP_WIDTH);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [interactive]);

  return (
    <div ref={viewportRef} className={`live-project-viewport ${interactive ? "is-interactive" : ""}`}>
      {interactive ? (
        <iframe
          className="live-project-frame"
          src="https://doumi-phisio.vercel.app/"
          title="Aperçu interactif du site Doumi Physio"
          sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="fullscreen"
          scrolling="yes"
          style={{ width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT, transform: `scale(${scale})` }}
        />
      ) : (
        <div className="live-project-snapshot">
        <Image
          src="/projects/doumi-physio-mobile.png"
          alt="Aperçu du site Doumi Physio"
          fill
          sizes="(max-width: 900px) calc(100vw - 32px), 65vw"
          quality={70}
        />
          <button type="button" className="live-project-launch" onClick={() => setInteractive(true)}>
            Charger l’aperçu interactif
          </button>
        </div>
      )}
    </div>
  );
}
