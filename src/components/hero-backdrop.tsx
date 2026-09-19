import { useEffect, useRef } from "react";

const PORTRAIT_MQ = "(max-width: 1023px)";
const PORTRAIT_SRC = "/videos/hero-portrait.mp4";
const LANDSCAPE_SRC = "/videos/hero-landscape.mp4";

function kickPlayback(video: HTMLVideoElement, src: string) {
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;
  video.preload = "auto";

  if (video.getAttribute("src") !== src) {
    video.src = src;
  }

  const play = () => {
    video.muted = true;
    void video.play().catch(() => {});
  };

  play();
  video.addEventListener("loadeddata", play, { once: true });
  video.addEventListener("canplay", play, { once: true });
}

function stopPlayback(video: HTMLVideoElement) {
  video.pause();
  if (video.getAttribute("src")) {
    video.removeAttribute("src");
    video.load();
  }
}

export function HeroBackdrop() {
  const portraitRef = useRef<HTMLVideoElement>(null);
  const landscapeRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const portrait = portraitRef.current;
    const landscape = landscapeRef.current;
    if (!portrait || !landscape) return;

    const mq = window.matchMedia(PORTRAIT_MQ);

    const sync = () => {
      if (mq.matches) {
        stopPlayback(landscape);
        kickPlayback(portrait, PORTRAIT_SRC);
      } else {
        stopPlayback(portrait);
        kickPlayback(landscape, LANDSCAPE_SRC);
      }
    };

    sync();
    mq.addEventListener("change", sync);

    const onVisible = () => {
      if (document.visibilityState === "visible") sync();
    };
    const onGesture = () => {
      const active = mq.matches ? portrait : landscape;
      if (active?.paused) void active.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);
    document.addEventListener("pointerdown", onGesture);
    document.addEventListener("keydown", onGesture);

    return () => {
      mq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVisible);
      document.removeEventListener("pointerdown", onGesture);
      document.removeEventListener("keydown", onGesture);
    };
  }, []);

  return (
    <>
      <picture>
        <source media="(min-width: 1024px)" srcSet="/images/hero-landscape-poster.jpg" />
        <img
          src="/images/hero-portrait-poster.jpg"
          alt="Burning Rope Pharms cowboy reel"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <video
        ref={portraitRef}
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover lg:hidden"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        poster="/images/hero-portrait-poster.jpg"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
      />
      <video
        ref={landscapeRef}
        className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full object-cover lg:block"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        poster="/images/hero-landscape-poster.jpg"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
      />
    </>
  );
}
