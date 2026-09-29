type NetworkFieldProps = {
  variant?: "right" | "left" | "wide";
};

export function NetworkField({ variant = "right" }: NetworkFieldProps) {
  return (
    <div className={`network-field network-field-${variant}`} aria-hidden="true">
      <svg viewBox="0 0 760 520" preserveAspectRatio="xMidYMid slice">
        <g className="network-lines">
          <ellipse cx="430" cy="258" rx="302" ry="212" transform="rotate(-12 430 258)" />
          <ellipse cx="430" cy="258" rx="296" ry="116" transform="rotate(21 430 258)" />
          <ellipse cx="430" cy="258" rx="126" ry="226" transform="rotate(-29 430 258)" />
          <ellipse cx="430" cy="258" rx="76" ry="229" transform="rotate(34 430 258)" />
          <path d="M94 362C218 260 330 194 704 116" />
          <path d="M126 118C288 178 470 318 722 388" />
          <path d="M82 270C264 292 468 264 730 208" />
          <path d="M205 70C342 218 470 380 646 474" />
        </g>
        <g className="network-nodes">
          <circle cx="154" cy="331" r="2.2" />
          <circle cx="214" cy="164" r="1.6" />
          <circle cx="302" cy="247" r="2" />
          <circle className="network-node-hot network-node-a" cx="369" cy="215" r="3.4" />
          <circle cx="427" cy="356" r="1.8" />
          <circle cx="514" cy="156" r="2" />
          <circle className="network-node-hot network-node-b" cx="579" cy="287" r="3" />
          <circle cx="657" cy="195" r="1.7" />
          <circle cx="676" cy="395" r="1.8" />
        </g>
      </svg>
    </div>
  );
}
