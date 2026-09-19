import { useEffect, useRef, type RefObject } from "react";

const PORTRAIT_MQ = "(max-width: 1023px)";
const REDUCE_MQ = "(prefers-reduced-motion: reduce)";
const PORTRAIT_SRC = "/videos/hero-portrait.mp4";
const LANDSCAPE_SRC = "/videos/hero-landscape.mp4";

function bindHeroVideo(
  video: HTMLVideoElement,
  playVideo: boolean,
  src: string,
  onResume: (resume: (() => void) | undefined) => void,
) {
  if (!playVideo) {
    video.pause();
    video.removeAttribute("src");
    video.load();
    return;
  }

  if (video.getAttribute("src") !== src) {
    video.src = src;
  }
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  const play = () => {
    void video.play().catch(() => {
      const resume = () => {
        void video.play().catch(() => {});
        onResume(undefined);
      };
      onResume(resume);
      document.addEventListener("pointerdown", resume, { once: true });
    });
  };

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) play();
  else video.addEventListener("canplay", play, { once: true });
}

function useHeroSync(
  portraitRef: RefObject<HTMLVideoElement | null>,
  landscapeRef: RefObject<HTMLVideoElement | null>,
) {
  useEffect(() => {
    const portrait = portraitRef.current;
    const landscape = landscapeRef.current;
    if (!portrait || !landscape) return;

    const mq = window.matchMedia(PORTRAIT_MQ);
    const motion = window.matchMedia(REDUCE_MQ);
    const resumes = new Set<() => void>();

    const clearResumes = () => {
      for (const resume of resumes) {
        document.removeEventListener("pointerdown", resume);
      }
      resumes.clear();
    };

    const trackResume = (resume: (() => void) | undefined) => {
      if (!resume) return;
      resumes.add(resume);
    };

    const sync = () => {
      clearResumes();
      const reduce = motion.matches;
      bindHeroVideo(portrait, mq.matches && !reduce, PORTRAIT_SRC, trackResume);
      bindHeroVideo(landscape, !mq.matches && !reduce, LANDSCAPE_SRC, trackResume);
    };

    sync();
    mq.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      clearResumes();
      mq.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, [landscapeRef, portraitRef]);
}

export function HeroBackdrop() {
  const portraitRef = useRef<HTMLVideoElement>(null);
  const landscapeRef = useRef<HTMLVideoElement>(null);
  useHeroSync(portraitRef, landscapeRef);

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
      <video
        ref={landscapeRef}
        className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover lg:block"
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        poster="/images/hero-landscape-poster.jpg"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
      />
    </>
  );
}
