import Image from "next/image";

export function LiveProjectPreview() {
  return (
    <div className="live-project-viewport">
      <Image
        className="live-project-static-image"
        src="/projects/prodyous-mobile.png"
        alt="Capture du site Prodyous"
        fill
        sizes="(max-width: 900px) calc(100vw - 32px), 70vw"
      />
    </div>
  );
}
