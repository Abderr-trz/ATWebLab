import Image, { type StaticImageData } from "next/image";
import redsalcarsLogo from "@/Logo/redsallogo.png";

const clients: Array<{ name: string; logo: string | StaticImageData }> = [
  { name: "Prodyous", logo: "/clients/prodyous.jpg" },
  { name: "Doumi Physio", logo: "/clients/doumi-physio.png" },
  { name: "Redsalcars", logo: redsalcarsLogo },
];

function ClientGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="client-logo-group" aria-hidden={duplicate || undefined}>
      {clients.map((client) => (
        <div className="client-logo" role={duplicate ? undefined : "listitem"} key={client.name}>
          <Image
            src={client.logo}
            alt={duplicate ? "" : `${client.name}, client AT WebLab`}
            fill
            sizes="(max-width: 600px) 170px, 210px"
          />
        </div>
      ))}
    </div>
  );
}

export function ClientRail() {
  return (
    <section className="client-rail" aria-labelledby="client-rail-title">
      <div className="container client-rail-inner">
        <div className="client-rail-copy">
          <p id="client-rail-title">Ils nous ont fait confiance.</p>
          <span>Des identités différentes, une même exigence.</span>
        </div>
        <div className="client-marquee" role="list" aria-label="Entreprises accompagnées par AT WebLab">
          <div className="client-marquee-track">
            <ClientGroup />
            <ClientGroup duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
