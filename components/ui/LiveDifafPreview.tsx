"use client";

import { useState } from "react";

export function LiveDifafPreview() {
  const [interactive, setInteractive] = useState(false);
  return (
    <div className="live-project-viewport">
      {interactive ? (
        <iframe
          className="live-project-frame"
          src="https://studio-difaf.vercel.app/"
          title="Aperçu interactif du prototype Studio DIFAF"
          loading="lazy"
          sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ width: "100%", height: "100%", minHeight: 380, border: 0 }}
        />
      ) : (
        <div className="live-project-snapshot" style={{ display: "grid", placeItems: "center", background: "#101010", minHeight: 380, padding: 32, textAlign: "center" }}>
          <div>
            <p style={{ color: "#A59A89", letterSpacing: ".22em", fontSize: 12 }}>AT WEBLAB / PROTOTYPE</p>
            <h3 style={{ color: "#F1EEE7", fontSize: "clamp(2rem, 5vw, 4rem)", margin: "12px 0" }}>STUDIO DIFAF</h3>
            <p style={{ color: "#C9C2B8", marginBottom: 24 }}>Portfolio photo & vidéo — Expérience cinématique</p>
            <button type="button" className="live-project-launch" onClick={() => setInteractive(true)}>
              Explorer le prototype interactif
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
