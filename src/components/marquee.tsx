import { marquee } from "@/lib/data";

export function DoctrineMarquee() {
  const line = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden border-y border-iron bg-hat" aria-hidden="true">
      <div className="marquee-track flex w-max gap-10 py-3">
        {line.map((item, i) => (
          <span key={i} className="ui flex items-center gap-10 whitespace-nowrap text-sm text-sand">
            {item}
            <span className="inline-block size-1.5 bg-fire" />
          </span>
        ))}
      </div>
    </div>
  );
}
