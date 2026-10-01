import { useEffect, useRef } from "react";

const VIDEO_SRC = "/videos/universe-ride.mp4";

const WORLDS = [
  "/images/universe/grounds.jpg",
  "/images/universe/zestperado.jpg",
  "/images/universe/lucky7s.jpg",
  "/images/universe/kaleidorope.jpg",
  "/images/universe/fruitstand.jpg",
  "/images/universe/blackopz.jpg",
  "/images/universe/skywalker.jpg",
  "/images/universe/babyyoda.jpg",
  "/images/universe/smoothie.jpg",
  "/images/universe/bluehawaii.jpg",
  "/images/universe/zog.jpg",
  "/images/universe/keylimez.jpg",
  "/images/universe/zfuel.jpg",
  "/images/universe/bananafuel.jpg",
  "/images/universe/grounds.jpg",
];

export function UniverseRide() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<"video" | "stills">("stills");

  useEffect(() => {
    const video = videoRef.current;
    const stack = stackRef.current;
    if (!stack) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const paintStills = (p: number) => {
      const slides = stack.children;
      const n = slides.length;
      if (!n) return;
      const x = reduce ? 0 : p * (n - 1);
      const i = Math.min(n - 1, Math.floor(x));
      const f = x - i;
      for (let s = 0; s < n; s++) {
        const el = slides[s] as HTMLElement;
        let opacity = 0;
        if (s === i) opacity = 1 - (s === n - 1 ? 0 : f);
        else if (s === i + 1) opacity = f;
        el.style.opacity = String(opacity);
      }
      stack.style.opacity = modeRef.current === "video" ? "0" : "1";
    };

    const apply = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max <= 1 ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
      const clip = video;
      if (
        modeRef.current === "video" &&
        clip &&
        Number.isFinite(clip.duration) &&
        clip.duration > 0
      ) {
        const target = (reduce ? 0 : p) * Math.max(0, clip.duration - 0.04);
        if (Math.abs(clip.currentTime - target) > 0.03) {
          const seeker = clip as HTMLVideoElement & { fastSeek?: (t: number) => void };
          if (seeker.fastSeek) seeker.fastSeek(target);
          else clip.currentTime = target;
        }
      }
      paintStills(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    const onReady = () => {
      modeRef.current = "video";
      if (video) video.style.opacity = "1";
      onScroll();
    };
    const onFail = () => {
      modeRef.current = "stills";
      if (video) video.style.opacity = "0";
      onScroll();
    };

    video?.addEventListener("loadeddata", onReady);
    video?.addEventListener("error", onFail);
    if (video?.error) onFail();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.documentElement);
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      video?.removeEventListener("loadeddata", onReady);
      video?.removeEventListener("error", onFail);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-0"
        muted
        playsInline
        preload="auto"
        poster="/images/universe/grounds.jpg"
        src={VIDEO_SRC}
      />
      <div ref={stackRef} className="absolute inset-0">
        {WORLDS.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/25 to-black/55" />
    </div>
  );
}
