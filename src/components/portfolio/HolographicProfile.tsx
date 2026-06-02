import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import profileImg from "@/assets/vineet-profile.jpeg";

/**
 * Premium profile card — subtle 3D parallax, no scanlines/HUD chips.
 */
export function HolographicProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 16, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 100, damping: 16, mass: 0.5 });
  const rotY = useTransform(sx, [-0.5, 0.5], [6, -6]);
  const rotX = useTransform(sy, [-0.5, 0.5], [-5, 5]);

  // Spotlight variables
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x / r.width - 0.5);
    my.set(y / r.height - 0.5);
    spotlightX.set(x);
    spotlightY.set(y);
  }

  function onEnter() { setHovered(true); }
  
  function onLeave() {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-full"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="relative aspect-[4/5] w-full"
        style={{ perspective: 1200 }}
        data-cursor="hover"
      >
        <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(120,200,255,0.08),transparent_60%)] blur-2xl animate-hud-pulse" />
        <motion.div
          className="relative h-full w-full rounded-2xl overflow-hidden glass-strong"
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        >
          <motion.img
            src={profileImg}
            alt="Vineet Singh — Software Engineer"
            className="absolute inset-0 h-full w-full object-cover object-center"
            initial={{ scale: 1.02 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Subtle responsive spotlight glow overlay */}
          {!isMobile && (
            <motion.div
              className="pointer-events-none absolute -inset-px z-30 transition-opacity duration-300"
              style={{
                opacity: hovered ? 1 : 0,
                background: useTransform(
                  [spotlightX, spotlightY],
                  ([xVal, yVal]) => `radial-gradient(280px circle at ${xVal}px ${yVal}px, rgba(140, 210, 255, 0.15), transparent 85%)`
                ),
              }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
