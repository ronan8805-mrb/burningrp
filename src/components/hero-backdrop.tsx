import { useEffect, useRef } from "react";

const PORTRAIT_MQ = "(max-width: 1023px)";
const REDUCE_MQ = "(prefers-reduced-motion: reduce)";
const VIDEO_SRC = "/videos/hero-portrait.mp4";

export function HeroBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia(PORTRAIT_MQ);
    const motion = window.matchMedia(REDUCE_MQ);
    let resume: (() => void) | undefined;

    const clearResume = () => {
      if (!resume) return;
      document.removeEventListener("pointerdown", resume);
      resume = undefined;
    };

    const sync = () => {
      clearResume();
      const playVideo = mq.matches && !motion.matches;
      if (!playVideo) {
        video.pause();
        video.removeAttribute("src");
        video.load();
        return;
      }

      if (video.getAttribute("src") !== VIDEO_SRC) {
        video.src = VIDEO_SRC;
      }
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const play = () => {
        void video.play().catch(() => {
          resume = () => {
            void video.play().catch(() => {});
            clearResume();
          };
          document.addEventListener("pointerdown", resume, { once: true });
        });
      };

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) play();
      else video.addEventListener("canplay", play, { once: true });
    };

    sync();
    mq.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      clearResume();
      mq.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <>
      <picture>
        <source media="(min-width: 1024px)" srcSet="/images/hero-cowboy.jpg" />
        <img
          src="/images/hero-portrait-poster.jpg"
          alt="Burning Rope Pharms cowboy reel"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover lg:hidden"
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        poster="/images/hero-portrait-poster.jpg"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
      />
    </>
  );
}
