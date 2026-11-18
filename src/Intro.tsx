import { useEffect, useRef, useState } from "react";

const ornaments = [
  {
    src: "/assets/8b542.png",
    alt: "Four-petal ivory floral ornament",
    className: "ornament--top",
  },
  {
    src: "/assets/cc176.png",
    alt: "Eight-point ivory floral ornament",
    className: "ornament--middle",
  },
  {
    src: "/assets/e9028.png",
    alt: "Four-point ivory floral ornament",
    className: "ornament--bottom",
  },
];

interface IntroProps {
  onComplete?: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [activeOrnament, setActiveOrnament] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const ornamentRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activateOrnament = (index: number) => {
    if (isExiting) return;

    setActiveOrnament(index);
    setAnimationKey((key) => key + 1);

    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= 3) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete?.();
        }, 700);
      }, 400);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        activeOrnament === null
          ? direction === 1
            ? 0
            : ornaments.length - 1
          : (activeOrnament + direction + ornaments.length) % ornaments.length;

      setActiveOrnament(nextIndex);
      ornamentRefs.current[nextIndex]?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeOrnament]);

  return (
    <header
      className={`ornamental-canvas ${isExiting ? "is-exiting" : ""}`}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) setActiveOrnament(null);
      }}
      aria-label="Wedding celebration intro"
    >
      <div className="damask-layer" aria-hidden="true" />

      <div className="ornament-stack" role="group" aria-label="Decorative floral ornaments">
        {ornaments.map((ornament, index) => (
          <button
            ref={(element) => {
              ornamentRefs.current[index] = element;
            }}
            key={ornament.src}
            type="button"
            className={`ornament ${ornament.className} ${
              activeOrnament === index ? "is-active" : ""
            } ${activeOrnament !== null && activeOrnament !== index ? "is-rotating" : ""}`}
            aria-label={`Select ${ornament.alt.toLowerCase()} and rotate the other ornaments`}
            aria-pressed={activeOrnament === index}
            onClick={() => activateOrnament(index)}
          >
            <span
              key={activeOrnament !== null ? `${animationKey}-${index}` : index}
              className="ornament__image-wrap"
            >
              <img src={ornament.src} alt="" draggable="false" />
            </span>
          </button>
        ))}
      </div>
    </header>
  );
}
