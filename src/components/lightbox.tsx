import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import type { GalleryShot } from "@/lib/data";

export function Lightbox({
  shots,
  index,
  onClose,
  onIndex,
}: {
  shots: GalleryShot[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const shot = shots[index];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % shots.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + shots.length) % shots.length);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, onIndex, shots.length]);

  if (!shot) return null;

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center bg-bone/92 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-4 right-4 inline-flex size-11 items-center justify-center text-cream"
        aria-label="Close gallery"
        onClick={onClose}
      >
        <X className="size-6" />
      </button>
      {shots.length > 1 ? (
        <>
          <button
            type="button"
            className="absolute left-2 inline-flex size-11 items-center justify-center text-cream md:left-6"
            aria-label="Previous still"
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index - 1 + shots.length) % shots.length);
            }}
          >
            <ChevronLeft className="size-8" />
          </button>
          <button
            type="button"
            className="absolute right-2 inline-flex size-11 items-center justify-center text-cream md:right-6"
            aria-label="Next still"
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index + 1) % shots.length);
            }}
          >
            <ChevronRight className="size-8" />
          </button>
        </>
      ) : null}
      <img
        src={shot.src}
        alt={shot.alt}
        className="max-h-[86svh] max-w-full object-contain hairline"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
