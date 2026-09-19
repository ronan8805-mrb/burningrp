import { useState } from "react";
import type { GalleryShot } from "@/lib/data";
import { Lightbox } from "@/components/lightbox";
import { cn } from "@/lib/utils";

export function Gallery({ shots }: { shots: GalleryShot[] }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {shots.map((shot, i) => (
          <li key={shot.src + i}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden hairline press"
            >
              <img
                src={shot.src}
                alt={shot.alt}
                className={cn(
                  "aspect-4/3 w-full object-cover transition-transform duration-(--motion-slow) group-hover:scale-[1.03]",
                  i === 0 && "sm:aspect-3/4",
                )}
              />
            </button>
          </li>
        ))}
      </ul>
      {index !== null ? (
        <Lightbox
          shots={shots}
          index={index}
          onClose={() => setIndex(null)}
          onIndex={setIndex}
        />
      ) : null}
    </>
  );
}
