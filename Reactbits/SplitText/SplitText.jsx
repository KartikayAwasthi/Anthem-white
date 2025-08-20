import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(GSAPSplitText);

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 2.0,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "center",
  onLetterAnimationComplete,
  playOnLoad = true,
}) => {
  const ref = useRef(null);
  const tlRef = useRef(null);
  const splitterRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Initialize animation only once
  const initAnimation = () => {
    if (typeof window === "undefined" || !ref.current || !text || hasAnimatedRef.current) return;

    const el = ref.current;
    const absoluteLines = splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    try {
      splitterRef.current = new GSAPSplitText(el, {
        type: splitType,
        absolute: absoluteLines,
        linesClass: "split-line",
      });
    } catch (error) {
      console.error("Failed to create SplitText:", error);
      return;
    }

    let targets;
    switch (splitType) {
      case "lines":
        targets = splitterRef.current.lines;
        break;
      case "words":
        targets = splitterRef.current.words;
        break;
      case "chars":
      default:
        targets = splitterRef.current.chars;
    }

    if (!targets || targets.length === 0) {
      splitterRef.current.revert();
      return;
    }

    targets.forEach((t) => {
      t.style.willChange = "transform, opacity";
    });

    tlRef.current = gsap.timeline({
      paused: true,
      smoothChildTiming: true,
      onComplete: () => {
        hasAnimatedRef.current = true;
        gsap.set(targets, {
          ...to,
          clearProps: "willChange",
          immediateRender: true,
        });
        onLetterAnimationComplete?.();
      },
    });

    tlRef.current.set(targets, { ...from, immediateRender: false, force3D: true });
    tlRef.current.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    if (playOnLoad) {
      tlRef.current.play();
    }
  };

  // Cleanup function
  const cleanupAnimation = () => {
    if (tlRef.current) {
      tlRef.current.kill();
    }
    if (splitterRef.current) {
      splitterRef.current.revert();
    }
    gsap.killTweensOf(ref.current);
  };

  useEffect(() => {
    initAnimation();
    return () => {
      cleanupAnimation();
    };
    // We only want this to run once on mount and clean up on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle text changes
  useEffect(() => {
    if (text && ref.current) {
      cleanupAnimation();
      hasAnimatedRef.current = false;
      initAnimation();
    }
  }, [text]);

  const startAnimation = () => {
    if (tlRef.current && !hasAnimatedRef.current) {
      tlRef.current.play();
      hasAnimatedRef.current = true;
    }
  };

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: "break-word",
      }}
      data-start-animation={startAnimation}
    >
      {text}
    </p>
  );
};

export default SplitText;