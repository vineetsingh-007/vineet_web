import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ----------------------------- MAGNETIC EFFECT ----------------------------- */

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export function Magnetic({ children, range = 60, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 15, mass: 0.1 };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Only apply to pointer devices, not mobile/touch devices
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (isMobile) {
    return children;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: dx, y: dy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* -------------------------- SPOTLIGHT & TILT CARD -------------------------- */

interface SpotlightTiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number;
  disabledOnMobile?: boolean;
}

export function SpotlightTiltCard({
  children,
  className = "",
  glowColor = "rgba(140, 210, 255, 0.1)",
  maxTilt = 6,
  disabledOnMobile = true,
}: SpotlightTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Spotlight coordinates
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  // Tilt coordinates
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 18, mass: 0.5 };
  const rotateX = useSpring(tiltX, springConfig);
  const rotateY = useSpring(tiltY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || (isMobile && disabledOnMobile)) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spotlightX.set(x);
    spotlightY.set(y);

    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    tiltX.set(-normY * maxTilt);
    tiltY.set(normX * maxTilt);
  };

  const handleMouseEnter = () => {
    if (isMobile && disabledOnMobile) return;
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="w-full h-full rounded-[inherit]"
        style={{
          rotateX: isMobile && disabledOnMobile ? 0 : rotateX,
          rotateY: isMobile && disabledOnMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Spotlight gradient layer */}
        {!isMobile && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[inherit] z-30 transition-opacity duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              background: useTransform(
                [spotlightX, spotlightY],
                ([xVal, yVal]) => `radial-gradient(350px circle at ${xVal}px ${yVal}px, ${glowColor}, transparent 80%)`
              ),
            }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}

/* ----------------------------- SCROLL REVEAL ----------------------------- */

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  yOffset = 25,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 1.02, 0.43, 1.01],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = (yOffset: number, duration: number) => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: [0.21, 1.02, 0.43, 1.01] as const,
    },
  },
});

export function ScrollRevealContainer({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className = "",
  yOffset = 20,
  duration = 0.7,
}: {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}) {
  return (
    <motion.div
      variants={itemVariants(yOffset, duration)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------ TEXT REVEAL ------------------------------ */

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 1.02, 0.43, 1.01] as const,
      },
    },
    hidden: {
      opacity: 0,
      y: 12,
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {words.map((word, idx) => (
        <span key={idx} className="mr-[0.25em] inline-block">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* -------------------------- SCROLL PROGRESS BAR -------------------------- */

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan via-violet to-cyan/80 z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}
