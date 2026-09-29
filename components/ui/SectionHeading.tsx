export function SectionHeading({ title, intro, number }: { title: string; intro?: string; number?: string }) {
  return (
    <div className="section-heading">
      {number && <span className="section-number" aria-hidden="true">{number}</span>}
      <div>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  );
}
