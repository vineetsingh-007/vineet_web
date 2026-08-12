import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<"default" | "interactive" | "card">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isCoarse, setIsCoarse] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkCoarse = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
      setIsCoarse(coarse);
      return coarse;
    };

    if (checkCoarse()) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setIsVisible(true);
    };

    const tick = () => {
      // Smooth interpolation for the outer ring (lag effect)
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t?.closest) return;

      const isInteractive = !!t.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']");
      const isCard = !!t.closest(".glass, .glass-strong, [data-cursor='card']");

      if (isInteractive) {
        setHoverState("interactive");
      } else if (isCard) {
        setHoverState("card");
      } else {
        setHoverState("default");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const onResize = () => {
      checkCoarse();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("resize", onResize);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  const getRingStyle = () => {
    const baseStyle = {
      opacity: isVisible ? 1 : 0,
      transition: "width 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s, background-color 0.3s, opacity 0.3s, backdrop-filter 0.3s",
    };

    if (hoverState === "interactive") {
      return {
        ...baseStyle,
        width: 40,
        height: 40,
        borderColor: "rgba(255, 255, 255, 0.55)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(1px)",
        WebkitBackdropFilter: "blur(1px)",
      };
    }

    if (hoverState === "card") {
      return {
        ...baseStyle,
        width: 28,
        height: 28,
        borderColor: "rgba(255, 255, 255, 0.3)",
        backgroundColor: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
      };
    }

    return {
      ...baseStyle,
      width: 20,
      height: 20,
      borderColor: "rgba(255, 255, 255, 0.15)",
      backgroundColor: "transparent",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
    };
  };

  const getDotStyle = () => {
    const baseStyle = {
      opacity: isVisible ? 1 : 0,
      transition: "transform 0.1s ease-out, width 0.3s ease, height 0.3s ease, opacity 0.3s",
    };

    if (hoverState === "interactive") {
      return {
        ...baseStyle,
        width: 2,
        height: 2,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
      };
    }

    if (hoverState === "card") {
      return {
        ...baseStyle,
        width: 4,
        height: 4,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
      };
    }

    return {
      ...baseStyle,
      width: 5,
      height: 5,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
    };
  };

  if (isCoarse) return null;

  return (
    <>
      <div
        ref={ring}
        className="cursor-ring"
        style={getRingStyle()}
      />
      <div
        ref={dot}
        className="cursor-dot"
        style={getDotStyle()}
      />
    </>
  );
}
