import type { CSSProperties } from "react";

const axes = [-1, 0, 1];
const layers = [
  { name: "top", y: -1 },
  { name: "middle", y: 0 },
  { name: "bottom", y: 1 },
] as const;

function faceLabel(face: string, layer: number, x: number, z: number) {
  if (face === "front" && z === 1) {
    const labels: Record<string, string> = {
      "-1:-1": "</>", "-1:1": "API", "0:0": "{ }", "1:-1": "UI", "1:1": "01",
    };
    return labels[`${layer}:${x}`] || "";
  }
  if (face === "right" && x === 1) {
    const labels: Record<string, string> = {
      "-1:-1": "DB", "0:0": "UX", "1:1": "JS",
    };
    return labels[`${layer}:${z}`] || "";
  }
  if (face === "top" && layer === -1 && x === 0 && z === 0) return "WEB";
  return "";
}

export function WebDevCube() {
  return (
    <div className="web-cube-scene" aria-hidden="true">
      <div className="web-cube-halo" />
      <div className="web-cube web-rubik">
        {layers.map((layer, layerIndex) => (
          <div className={`web-cube-layer web-cube-layer-${layer.name}`} key={layer.name}>
            {axes.flatMap((z) =>
              axes.map((x, index) => {
                const style = {
                  "--cubie-x": `${x * 72}px`,
                  "--cubie-z": `${z * 72}px`,
                } as CSSProperties;
                const material = (index + layerIndex * 2) % 4;

                return (
                  <span className={`web-cubie material-${material}`} style={style} key={`${x}-${z}`}>
                    {(["front", "back", "right", "left", "top", "bottom"] as const).map((face) => {
                      const label = faceLabel(face, layer.y, x, z);
                      return <i className={`cubie-face cubie-${face} ${label ? "has-code" : ""}`} key={face}>{label}</i>;
                    })}
                  </span>
                );
              }),
            )}
          </div>
        ))}
      </div>
      <div className="web-cube-shadow" />
    </div>
  );
}