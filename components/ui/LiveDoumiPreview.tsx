"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DESKTOP_WIDTH = 1440;
const DESKTOP_HEIGHT = 900;
const MOBILE_WIDTH = 390;
const MOBILE_HEIGHT = 520;

export function LiveDoumiPreview() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({ width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT, scale: 1 });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const resize = () => {
      const mobile = window.innerWidth <= 600;
      const width = mobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
      const height = mobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;
      setFrame({ width, height, scale: viewport.clientWidth / width });
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
        src="https://doumi-phisio.vercel.app/"
        title="Aperçu interactif du site Doumi Physio"
        loading="lazy"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="fullscreen"
        style={{ width: frame.width, height: frame.height, transform: `scale(${frame.scale})` }}
      />
      <div className="live-project-mobile-fallback">
        <Image
          src="/projects/doumi-physio-mobile.png"
          alt="Aperçu du site Doumi Physio"
          fill
          sizes="(max-width: 600px) 100vw, 1px"
        />
      </div>
    </div>
  );
}
