"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DESKTOP_WIDTH = 1440;
const DESKTOP_HEIGHT = 900;

export function LiveProjectPreview() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [embeddable, setEmbeddable] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const resize = () => setScale(viewport.clientWidth / DESKTOP_WIDTH);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/prodyous-status", { signal: controller.signal })
      .then((response) => response.json())
      .then((result: { embeddable?: boolean }) => setEmbeddable(result.embeddable === true))
      .catch(() => setEmbeddable(false));
    return () => controller.abort();
  }, []);

  return (
    <div ref={viewportRef} className="live-project-viewport">
      {embeddable && <iframe
        className="live-project-frame"
        src="https://prodyous.co/"
        title="Aperçu interactif du site Prodyous"
        loading="lazy"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="fullscreen"
        style={{ width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT, transform: `scale(${scale})` }}
      />}
      <div className={`live-project-mobile-fallback ${embeddable ? "embed-ready" : "fallback-visible"}`}>
        <Image src="/projects/prodyous-mobile.png" alt="Aperçu du site Prodyous" fill sizes="(max-width: 600px) 100vw, 1px" />
      </div>
    </div>
  );
}
