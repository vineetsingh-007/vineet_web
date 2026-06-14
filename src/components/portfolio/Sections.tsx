import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Github, Linkedin, Mail, MapPin, FileText, Download, ArrowRight, ArrowUpRight,
  Cpu, Cloud, Brain, Code2, Network, Boxes,
  GraduationCap, Award, FlaskConical, BriefcaseBusiness,
  Container, Compass, Leaf, Satellite as SatIcon,
  Sigma, Coffee, MonitorCog, Trophy,
  Lightbulb, Users, Layers, Sparkles, ShieldCheck, Rocket, Radar,
} from "lucide-react";
import { HolographicProfile } from "./HolographicProfile";
import {
  Magnetic, SpotlightTiltCard, ScrollReveal, ScrollRevealContainer, ScrollRevealItem
} from "./AnimationPrimitives";
import {
  CampusOneVisual, DroneFloodVisual, PGConnectVisual, MicroservicesVisual, ReforestationVisual, AerisAiVisual
} from "./ProjectVisuals";
import { SparklesCore } from "../ui/sparkles";

/* ----------------------------- shared bits ----------------------------- */

function SectionHeading({
  eyebrow, title, subtitle, align = "left",
}: { eyebrow: string; title: string; subtitle?: string; align?: "left" | "center" }) {
  return (
    <div className={`mb-14 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}>
      <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/80 ${align === "center" ? "justify-center" : ""}`}>
        <span className="inline-block h-px w-6 bg-cyan/50" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gradient">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}

/* -------------------------------- NAV --------------------------------- */

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const y = window.scrollY + window.innerHeight * 0.3;
      let cur = "hero";
      for (const s of [{ id: "hero" }, ...NAV_LINKS]) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-4">
      <div className={`mx-auto w-[min(1180px,94vw)] flex items-center gap-3 rounded-full px-4 py-2.5 transition-all ${scrolled ? "glass-strong shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]" : "glass"}`}>
        <Magnetic range={40} strength={0.25}>
          <a href="#hero" className="flex items-center gap-2.5">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-primary-foreground">
              VS
            </span>
            <span className="font-display text-sm font-semibold tracking-tight hidden sm:inline">Vineet Singh</span>
          </a>
        </Magnetic>
        <nav className="ml-6 hidden md:flex items-center gap-1 text-sm">
          {NAV_LINKS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative px-3 py-1.5 transition-colors duration-200 ${active === s.id ? "text-cyan font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              {active === s.id && (
                <motion.span
                  layoutId="active-nav-underline"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan to-violet"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {s.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto">
          <Magnetic range={50} strength={0.2}>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-medium hover:opacity-90 transition-opacity"
            >
              Get in touch <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------- HERO -------------------------------- */

const ROLES = [
  "Full Stack Developer",
  "Software Engineer",
  "Cloud & DevOps Enthusiast",
  "AI Systems Builder",
];

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % ROLES.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative h-7 overflow-hidden font-mono text-sm text-cyan/90">
      {ROLES.map((r, idx) => (
        <motion.div
          key={r}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: idx === i ? 0 : idx < i ? -28 : 28, opacity: idx === i ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
          className="absolute inset-0"
        >
          {r}
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]);
  const bgY2 = useTransform(scrollY, [0, 1000], [0, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 1.02, 0.43, 1.01] as const },
    },
  };

  const titleWordVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.21, 1.02, 0.43, 1.01] as const },
    },
  };

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center overflow-hidden pt-32 pb-20">
      {/* subtle background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 grid-bg opacity-60 pointer-events-none" />
      <motion.div style={{ y: bgY2 }} className="absolute -top-40 left-1/2 -translate-x-1/2 -z-10 h-[520px] w-[1100px] rounded-full bg-[radial-gradient(closest-side,rgba(80,160,230,0.18),transparent_70%)] blur-2xl animate-hud-pulse pointer-events-none" />
      <motion.div style={{ y: bgY }} className="absolute bottom-0 right-0 -z-10 h-[400px] w-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(160,120,255,0.12),transparent_70%)] blur-2xl pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-[min(1180px,94vw)] grid lg:grid-cols-12 gap-12 items-center"
      >
        <div className="lg:col-span-7">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-hud-pulse" />
            Available for internships & full-time roles
          </motion.div>

          <div className="relative mt-6 w-full max-w-4xl">
            {/* Gradients */}
            <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-cyan/60 to-transparent h-[2px] w-3/4 blur-sm z-30" />
            <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-cyan/60 to-transparent h-px w-3/4 z-30" />
            <div className="absolute inset-x-32 top-0 bg-gradient-to-r from-transparent via-violet/60 to-transparent h-[4px] w-1/4 blur-sm z-30" />
            <div className="absolute inset-x-32 top-0 bg-gradient-to-r from-transparent via-violet/60 to-transparent h-px w-1/4 z-30" />

            {/* Core component */}
            <div className="w-full h-32 absolute inset-0 -z-10">
              <SparklesCore
                id="tsparticleshero"
                background="transparent"
                minSize={0.4}
                maxSize={1.2}
                particleDensity={140}
                className="w-full h-full"
                particleColor="#ffffff"
                speed={0.8}
              />
            </div>

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] -z-10" />

            <motion.h1
              variants={containerVariants}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] sm:leading-[1.02] tracking-tight text-gradient flex flex-wrap relative z-20"
            >
              {["Building", "thoughtful", "software", "with"].map((word, idx) => (
                <span key={idx} className="mr-[0.22em] inline-block whitespace-nowrap py-1">
                  <motion.span variants={titleWordVariants} className="inline-block">{word}</motion.span>
                </span>
              ))}
              <span className="mr-[0.22em] inline-block text-cyan whitespace-nowrap py-1">
                <motion.span variants={titleWordVariants} className="inline-block">AI,</motion.span>
              </span>
              <span className="mr-[0.22em] inline-block text-cyan whitespace-nowrap py-1">
                <motion.span variants={titleWordVariants} className="inline-block">cloud</motion.span>
              </span>
              {["and"].map((word, idx) => (
                <span key={idx} className="mr-[0.22em] inline-block whitespace-nowrap py-1">
                  <motion.span variants={titleWordVariants} className="inline-block">{word}</motion.span>
                </span>
              ))}
              <span className="mr-[0.22em] inline-block text-violet whitespace-nowrap py-1">
                <motion.span variants={titleWordVariants} className="inline-block">full-stack</motion.span>
              </span>
              <span className="mr-[0.22em] inline-block whitespace-nowrap py-1">
                <motion.span variants={titleWordVariants} className="inline-block">craft.</motion.span>
              </span>
            </motion.h1>
          </div>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            I'm Vineet Singh — a Computer Science Engineering student at MIT ADT University focused
            on shipping scalable, real-world products across full-stack web, AI integrations, and
            cloud-native systems.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6"
          >
            <RotatingRole />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic range={50} strength={0.2}>
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity">
                View Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic range={50} strength={0.2}>
              <a href="https://drive.google.com/file/d/1cXaxbrnlApElDLINESxIPvYAnL-hKSXG/view?usp=share_link" target="_blank" rel="noopener" className="group inline-flex items-center gap-2 rounded-full border border-border text-foreground px-5 py-3 text-sm font-medium hover:bg-white/5 transition-colors">
                <FileText className="h-4 w-4" /> View Resume <Download className="h-3.5 w-3.5 ml-0.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center gap-5 text-muted-foreground"
          >
            {[
              { icon: Github, href: "https://github.com/vineetsingh-007", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/vineet-singh-76772b307", label: "LinkedIn" },
              { icon: Mail, href: "mailto:vineetsingh68220@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <Magnetic key={label} range={40} strength={0.25}>
                <a href={href} aria-label={label} target="_blank" rel="noopener"
                  className="group inline-flex items-center gap-2 text-sm hover:text-cyan transition-colors duration-300">
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="hidden sm:inline">{label}</span>
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="lg:col-span-5"
        >
          <div className="max-w-sm mx-auto">
            <HolographicProfile />
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {[
                { k: "CGPA", v: "8.88" },
                { k: "Projects", v: "8+" },
                { k: "Certs", v: "10+" },
              ].map((s) => (
                <SpotlightTiltCard key={s.k} maxTilt={4} className="rounded-xl glass p-2.5 sm:p-3 border border-border/50 hover:border-cyan/35">
                  <div className="font-display text-lg sm:text-xl font-semibold">{s.v}</div>
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-muted-foreground mt-0.5">{s.k}</div>
                </SpotlightTiltCard>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ----------------------------- HIGHLIGHTS ----------------------------- */

const HIGHLIGHTS = [
  { icon: GraduationCap, label: "CGPA", value: "8.88", note: "MIT ADT University" },
  { icon: BriefcaseBusiness, label: "Internship", value: "Prodigy Infotech", note: "Software Development" },
  { icon: FlaskConical, label: "Research", value: "ICCET 2024", note: "Published Paper" },
  { icon: Award, label: "Certifications", value: "10+", note: "NPTEL · Coursera · Cisco" },
  { icon: Boxes, label: "Projects", value: "8+", note: "Full Stack · AI · Cloud" },
  { icon: Trophy, label: "Hackathon", value: "SIH", note: "Smart India Hackathon" },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0; let started = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const t0 = performance.now(); const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const e2 = 1 - Math.pow(1 - p, 3);
          setV(to * e2);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [to]);
  const display = Number.isInteger(to) ? Math.floor(v) : v.toFixed(2);
  return <span ref={ref}>{display}{suffix}</span>;
}

export function Highlights() {
  return (
    <section className="relative py-20 px-4 md:px-8 border-t border-border/50">
      <div className="mx-auto w-[min(1180px,94vw)]">
        <ScrollRevealContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = h.icon;
            return (
              <ScrollRevealItem key={h.label}>
                <SpotlightTiltCard maxTilt={4} className="rounded-2xl glass p-5 h-full border border-border/50 hover:border-cyan/35 transition-colors duration-300">
                  <div className="group/highlight">
                    <Icon className="h-5 w-5 text-cyan transition-transform duration-300 group-hover/highlight:scale-110" />
                    <div className="mt-4 font-display text-xl font-semibold tracking-tight">
                      {h.value === "8.88" ? <Counter to={8.88} /> : h.value === "8+" ? <><Counter to={8} />+</> : h.value === "7+" ? <><Counter to={7} />+</> : h.value}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{h.label}</div>
                    <div className="mt-3 text-[11px] text-muted-foreground/70 leading-snug">{h.note}</div>
                  </div>
                </SpotlightTiltCard>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealContainer>
      </div>
    </section>
  );
}

/* -------------------------------- ABOUT ------------------------------- */

export function About() {
  return (
    <section id="about" className="relative py-28 px-4 md:px-8">
      <div className="mx-auto w-[min(1180px,94vw)]">
        <ScrollReveal>
          <SectionHeading
            eyebrow="About"
            title="Engineer at heart, builder by craft."
            subtitle="I love translating ambiguous problems into clean, scalable software — from intuitive UIs to backend systems and AI-driven features."
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6 text-foreground/85 leading-relaxed">
            <ScrollReveal delay={0.05}>
              <p>
                I'm a Computer Science Engineering student at <span className="text-foreground font-medium">MIT ADT University</span>,
                passionate about software engineering, full-stack development, cloud-native systems, AI integration,
                and the underlying fundamentals — DSA, networking, operating systems, and system design.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                My focus is on building products that feel reliable and obvious to use, while staying technically
                rigorous behind the scenes. I value clean code, thoughtful architecture, and shipping with intent.
              </p>
            </ScrollReveal>

            <ScrollRevealContainer className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                { k: "Location", v: "Pune, Maharashtra · India" },
                { k: "University", v: "MIT ADT University" },
                { k: "Focus", v: "AI · Cloud · Full Stack" },
                { k: "Status", v: "Open to opportunities" },
              ].map((d) => (
                <ScrollRevealItem key={d.k}>
                  <SpotlightTiltCard maxTilt={3} className="rounded-xl border border-border px-4 py-3 bg-white/[0.01]">
                    <div className="text-xs text-muted-foreground">{d.k}</div>
                    <div className="mt-0.5 text-sm font-medium">{d.v}</div>
                  </SpotlightTiltCard>
                </ScrollRevealItem>
              ))}
            </ScrollRevealContainer>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal delay={0.15}>
              <SpotlightTiltCard maxTilt={2.5} className="rounded-2xl glass-strong p-6 border border-border/50 hover:border-cyan/20">
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Currently exploring</div>
                <ul className="mt-4 space-y-3 text-sm">
                  {[
                    "Production-grade React + Node architectures",
                    "Containerization & microservices with Docker",
                    "Practical Machine Learning workflows",
                    "Systems thinking via DSA & OS fundamentals",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 group/explore">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan transition-transform duration-300 group-hover/explore:scale-125" />
                      <span className="text-foreground/85 transition-colors duration-300 group-hover/explore:text-foreground">{t}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightTiltCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- WHY WORK WITH ME ------------------------- */

const REASONS = [
  { icon: Lightbulb, title: "Problem Solver", desc: "I break down complex problems into clear, testable systems — and ship working solutions." },
  { icon: Layers, title: "Full Stack Development", desc: "Comfortable across React, Node, REST APIs, MongoDB and MySQL — frontend to backend." },
  { icon: Cpu, title: "Engineering Mindset", desc: "Strong foundation in OOP, system design, SDLC, and writing maintainable, scalable code." },
  { icon: Brain, title: "AI & Cloud Enthusiast", desc: "Hands-on with AI integrations, ML basics, Docker, containerization, and CI/CD workflows." },
  { icon: Sigma, title: "Strong DSA Foundation", desc: "Algorithmic thinking grounded in data structures, complexity analysis, and clean abstractions." },
  { icon: Users, title: "Team Collaboration", desc: "I work well with cross-functional teams and communicate technical ideas clearly." },
  { icon: Sparkles, title: "Continuous Learning", desc: "Always shipping side projects, reading papers, and exploring new tools and architectures." },
  { icon: ShieldCheck, title: "Quality First", desc: "Production-minded: I care about reliability, accessibility, performance, and good defaults." },
];

export function WhyWorkWithMe() {
  return (
    <section className="relative py-28 px-4 md:px-8 border-t border-border/50">
      <div className="mx-auto w-[min(1180px,94vw)]">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Why work with me"
            title="What I bring to a team."
            subtitle="A blend of fundamentals, modern stack fluency, and the discipline to ship."
          />
        </ScrollReveal>
        <ScrollRevealContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <ScrollRevealItem key={r.title}>
                <SpotlightTiltCard maxTilt={4} className="rounded-2xl glass p-5 h-full border border-border/50 hover:border-cyan/35 transition-colors duration-300">
                  <div className="group/reason">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-border transition-colors duration-300 group-hover/reason:bg-cyan/10 group-hover/reason:border-cyan/30">
                      <Icon className="h-5 w-5 text-cyan transition-transform duration-300 group-hover/reason:scale-110" />
                    </div>
                    <div className="mt-4 font-display text-base font-semibold transition-colors duration-300 group-hover/reason:text-cyan">{r.title}</div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                  </div>
                </SpotlightTiltCard>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealContainer>
      </div>
    </section>
  );
}

/* -------------------------------- SKILLS ------------------------------ */

const SKILL_GROUPS = [
  { title: "Programming", icon: Code2, skills: ["Java", "Python", "JavaScript", "C", "SQL"] },
  { title: "Full Stack", icon: Boxes, skills: ["React.js", "Node.js", "Express", "REST APIs", "MongoDB", "MySQL", "HTML", "CSS"] },
  { title: "Cloud & DevOps", icon: Cloud, skills: ["Docker", "Containerization", "CI/CD", "Kubernetes Basics", "Cloud Computing"] },
  { title: "Core CS", icon: Cpu, skills: ["DSA", "OOP", "Operating Systems", "Networking", "SDLC"] },
  { title: "AI / ML", icon: Brain, skills: ["AIML", "AI Chatbot Integration", "Machine Learning Basics"] },
  { title: "Tools", icon: Network, skills: ["GitHub", "Android Studio", "VS Code"] },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-28 px-4 md:px-8 border-t border-border/50">
      <div className="mx-auto w-[min(1180px,94vw)]">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Skills"
            title="The stack I build with."
            subtitle="Languages, frameworks, infrastructure and fundamentals — chosen for shipping real software."
          />
        </ScrollReveal>

        <ScrollRevealContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SKILL_GROUPS.map((g, idx) => {
            const Icon = g.icon;
            const floatDuration = 4 + (idx % 3) * 1.5;
            const floatDelay = (idx % 4) * 0.4;
            return (
              <ScrollRevealItem key={g.title}>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: floatDuration,
                    delay: floatDelay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-full"
                >
                  <SpotlightTiltCard maxTilt={4} className="rounded-2xl glass p-6 h-full border border-border/50 hover:border-cyan/35 transition-colors duration-300">
                    <div className="group/skill">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-border transition-colors duration-300 group-hover/skill:bg-cyan/10 group-hover/skill:border-cyan/30">
                          <Icon className="h-4 w-4 text-cyan transition-transform duration-300 group-hover/skill:rotate-12" />
                        </div>
                        <div className="font-display text-base font-semibold">{g.title}</div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {g.skills.map((s) => (
                          <span key={s} className="text-xs rounded-md border border-border bg-white/[0.03] px-2.5 py-1 text-foreground/85 transition-all duration-300 hover:bg-white/[0.08] hover:border-cyan/30 hover:text-cyan">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightTiltCard>
                </motion.div>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealContainer>
      </div>
    </section>
  );
}

/* ------------------------------- PROJECTS ----------------------------- */

const PROJECTS = [
  {
    id: "aeris",
    title: "AERIS AI",
    tag: "Autonomous Emergency Response & Intelligent Surveillance Platform",
    problem: "During natural disasters, rescue teams struggle to locate survivors quickly due to dangerous environments and rapidly changing conditions. Traditional navigation systems focus solely on distance and fail to prioritize areas with the highest density of survivors.",
    solution: "An AI-powered emergency response platform that combines intelligent routing, disaster simulation, and survivor detection to assist autonomous drones in identifying critical rescue zones and optimizing aid delivery.",
    features: ["Autonomous Drone Navigation", "AI-Based Route Optimization", "Disaster Environment Simulation", "Survivor Detection System", "Dynamic Hazard Avoidance"],
    challenges: "Training stable DQN reinforcement learning agents for battery-aware navigation under dynamic obstacles and synchronizing live telemetry streams on Streamlit.",
    outcome: "Developed a live decision-support system featuring route comparison analytics and an interactive emergency operations interface.",
    stack: ["Python", "PyTorch", "OpenCV", "Streamlit", "Gymnasium", "A* / Dijkstra", "SQLite"],
    glyph: Radar,
    demoLink: "https://pathfiner-vinu-007.streamlit.app/",
    sourceLink: "https://github.com/vineetsingh-007",
  },
  {
    id: "campusone",
    title: "CampusOne",
    tag: "AI-Powered Campus Management Platform",
    problem: "Campus services, academic resources and student communication were fragmented across multiple tools — hurting productivity and engagement.",
    solution: "A unified full-stack platform that centralizes services, resources and communication, enhanced by an AI chatbot for instant student support.",
    features: ["AI Chatbot Integration", "User Authentication", "Real-time Data", "Responsive UI/UX", "Web + Mobile Functions"],
    challenges: "Designing a clean information architecture, securing user data, and integrating an AI assistant on top of dynamic MongoDB-backed APIs.",
    outcome: "Published as a research paper at ICCET 2024 and used as a reference architecture for an AI-enabled campus platform.",
    stack: ["React", "Node.js", "Express", "MongoDB", "AI"],
    glyph: GraduationCap,
    demoLink: "https://campus-1-final-ltst.vercel.app/",
    sourceLink: "https://github.com/vineetsingh-007",
  },
  {
    id: "drone",
    title: "Drone Flood Response",
    tag: "Drone-based Disaster Management System",
    problem: "Flood-affected areas are often inaccessible to responders, delaying assessment and rescue coordination.",
    solution: "A drone system using GPS, IoT sensors and a modified A* algorithm for intelligent flight navigation and real-time terrain analytics.",
    features: ["Modified A* Algorithm", "GPS Integration", "IoT Sensor Comms", "Real-time Monitoring", "Path Optimization"],
    challenges: "Adapting A* for dynamic obstacle and water-level data, and synchronizing live sensor telemetry with flight decisions.",
    outcome: "Demonstrated a viable autonomous response prototype with optimized flight paths and live monitoring.",
    stack: ["Python", "IoT", "GPS", "A*", "Sensors"],
    glyph: SatIcon,
    demoLink: "https://pathfiner-vinu-007.streamlit.app/",
    sourceLink: "https://github.com/vineetsingh-007",
  },
  {
    id: "pgconnect",
    title: "PG Connect",
    tag: "Smart Accommodation Discovery Platform",
    problem: "Students and working professionals struggle to find trustworthy PG and hostel accommodations through fragmented listings.",
    solution: "A full-stack platform with structured listings, secure authentication, search and filtering, and a responsive browsing experience.",
    features: ["Authentication", "Search & Filtering", "Responsive Frontend", "Backend Integration", "Property Management"],
    challenges: "Modeling property data flexibly, securing user sessions, and keeping the interface fast on lower-end devices.",
    outcome: "Delivered an intuitive end-to-end product with a clean booking-style discovery flow.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    glyph: Compass,
    demoLink: "https://github.com/vineetsingh-007",
    sourceLink: "https://github.com/vineetsingh-007",
  },
  {
    id: "microservices",
    title: "Containerized Microservices Collab",
    tag: "Scalable Container-Based Collaboration System",
    problem: "Monolithic collaboration tools are hard to scale, deploy, and secure across independent teams.",
    solution: "A microservices-based collaboration platform with containerized services, secure service-to-service communication, and CI/CD-friendly deployment.",
    features: ["Docker Containerization", "Microservices Architecture", "REST API Integration", "Service-to-Service Comms", "Modular Deployment"],
    challenges: "Defining service boundaries, securing inter-service calls, and packaging services for portable cloud deployment.",
    outcome: "Built a modular, cloud-ready architecture that demonstrates production-style deployment patterns.",
    stack: ["Docker", "Node.js", "Express", "MongoDB", "REST", "CI/CD"],
    glyph: Container,
    demoLink: "https://github.com/vineetsingh-007",
    sourceLink: "https://github.com/vineetsingh-007",
  },
  {
    id: "reforestation",
    title: "Drone Reforestation & Seed Bombing",
    tag: "Autonomous Environmental Restoration System",
    problem: "Reforestation at scale is slow, manual, and hard to execute in barren or unsafe terrain.",
    solution: "An autonomous drone system that performs automated seed bombing using terrain scanning and AI-based route optimization.",
    features: ["Autonomous Navigation", "Automated Seed Bombing", "Smart Terrain Scanning", "AI Route Optimization", "Sustainable Deployment"],
    challenges: "Planning efficient coverage paths, modeling terrain constraints, and balancing payload with flight time.",
    outcome: "Conceptualized and prototyped a scalable, eco-positive deployment system for restoration use cases.",
    stack: ["Python", "Drone Sim", "GPS", "AI Nav", "GIS Mapping"],
    glyph: Leaf,
    demoLink: "https://github.com/vineetsingh-007",
    sourceLink: "https://github.com/vineetsingh-007",
  },
];

function ProjectCard({ p, index }: { p: typeof PROJECTS[number]; index: number }) {
  const Glyph = p.glyph;
  const [hovered, setHovered] = useState(false);

  const renderVisual = () => {
    switch (p.id) {
      case "aeris": return <AerisAiVisual isHovered={hovered} />;
      case "campusone": return <CampusOneVisual isHovered={hovered} />;
      case "drone": return <DroneFloodVisual isHovered={hovered} />;
      case "pgconnect": return <PGConnectVisual isHovered={hovered} />;
      case "microservices": return <MicroservicesVisual isHovered={hovered} />;
      case "reforestation": return <ReforestationVisual isHovered={hovered} />;
      default: return null;
    }
  };

  return (
    <ScrollReveal yOffset={35}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <SpotlightTiltCard
          maxTilt={1.5}
          className="group relative rounded-2xl glass border border-border/50 hover:border-cyan/35 overflow-hidden transition-colors duration-300"
        >
          <div className="grid lg:grid-cols-12 gap-0">
            {/* Info Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    Case Study · 0{index + 1}
                  </div>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-border group-hover:bg-cyan/10 group-hover:border-cyan/30 transition-colors duration-300">
                    <Glyph className="h-4 w-4 text-cyan transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-cyan">
                    {p.demoLink && p.demoLink !== "#" ? (
                      <a 
                        href={p.demoLink} 
                        target="_blank" 
                        rel="noopener" 
                        className="hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        {p.title}
                        <ArrowUpRight className="h-5 w-5 text-cyan opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <div className="mt-1 text-xs text-muted-foreground">{p.tag}</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-cyan/80 font-semibold">Problem</div>
                    <p className="mt-1 text-xs sm:text-sm text-foreground/85 leading-relaxed">{p.problem}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-cyan/80 font-semibold">Solution</div>
                    <p className="mt-1 text-xs sm:text-sm text-foreground/85 leading-relaxed">{p.solution}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 border-t border-border/50 pt-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-cyan/80 mb-2 font-semibold">Key Features</div>
                    <ul className="space-y-1.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-foreground/85 group/feat">
                          <span className="mt-1.5 inline-block h-1 w-1 rounded-full bg-cyan/80 transition-transform duration-300 group-hover/feat:scale-125" />
                          <span className="transition-colors duration-300 group-hover/feat:text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-cyan/80 font-semibold">Technical Challenges</div>
                      <p className="mt-1 text-xs text-foreground/80 leading-relaxed">{p.challenges}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-cyan/80 font-semibold">Outcome</div>
                      <p className="mt-1 text-xs text-foreground/80 leading-relaxed">{p.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3 border-t border-border/50">
                <Magnetic range={40} strength={0.2}>
                  <a 
                    href={p.demoLink || "#"} 
                    target={p.demoLink && p.demoLink !== "#" ? "_blank" : undefined}
                    rel={p.demoLink && p.demoLink !== "#" ? "noopener" : undefined}
                    onClick={p.demoLink && p.demoLink !== "#" ? undefined : (e) => e.preventDefault()}
                    className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                      p.demoLink && p.demoLink !== "#" 
                        ? "bg-primary text-primary-foreground hover:opacity-90 cursor-pointer" 
                        : "bg-white/5 text-muted-foreground cursor-not-allowed opacity-50"
                    }`}
                  >
                    <Rocket className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> Live Demo
                  </a>
                </Magnetic>
                <Magnetic range={40} strength={0.2}>
                  <a href={p.sourceLink || "https://github.com/vineetsingh-007"} target="_blank" rel="noopener" className="group inline-flex items-center gap-2 rounded-full border border-border text-foreground px-4 py-2 text-xs font-medium hover:bg-white/5 transition-colors">
                    <Github className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" /> View Details
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Visual Column */}
            {p.demoLink && p.demoLink !== "#" ? (
              <a 
                href={p.demoLink}
                target="_blank"
                rel="noopener"
                className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-white/[0.005] hover:bg-white/[0.015] transition-colors flex flex-col justify-between gap-6 cursor-pointer group/visual-link border-l border-border/50 lg:border-l-0"
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground w-full flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    Interactive Sandbox
                    <ArrowUpRight className="h-3.5 w-3.5 text-cyan opacity-60 group-hover/visual-link:opacity-100 transition-opacity duration-300" />
                  </span>
                  <span className="text-cyan/70 font-semibold">X-0{index + 1}</span>
                </div>

                <div className="w-full flex-1 flex items-center justify-center">
                  <div className="w-full">
                    {renderVisual()}
                  </div>
                </div>

                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/60 mb-2">Tech Stack</div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="text-[9px] font-mono rounded border border-border bg-white/[0.03] px-2 py-0.5 text-foreground/80 transition-all duration-300 hover:bg-white/[0.08] hover:border-cyan/35 hover:text-cyan hover:scale-105">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ) : (
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-white/[0.005] flex flex-col justify-between gap-6 border-l border-border/50 lg:border-l-0">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground w-full flex justify-between items-center">
                  <span>Interactive Sandbox</span>
                  <span className="text-cyan/70 font-semibold">X-0{index + 1}</span>
                </div>

                <div className="w-full flex-1 flex items-center justify-center">
                  <div className="w-full">
                    {renderVisual()}
                  </div>
                </div>

                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/60 mb-2">Tech Stack</div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="text-[9px] font-mono rounded border border-border bg-white/[0.03] px-2 py-0.5 text-foreground/80 transition-all duration-300 hover:bg-white/[0.08] hover:border-cyan/35 hover:text-cyan hover:scale-105">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </SpotlightTiltCard>
      </div>
    </ScrollReveal>
  );
}

export function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="projects" ref={targetRef} className="relative py-28 px-4 md:px-8 border-t border-border/50 overflow-hidden">
      {/* Parallax background elements */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 grid-bg opacity-30 pointer-events-none" />
      <motion.div style={{ y: bgY2 }} className="absolute top-1/4 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(80,160,230,0.06),transparent_70%)] blur-3xl pointer-events-none" />
      <motion.div style={{ y: bgY }} className="absolute bottom-1/4 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(160,120,255,0.04),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="mx-auto w-[min(1180px,94vw)]">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Selected projects"
            title="Real systems, shipped end-to-end."
            subtitle="Each project is a case study — the problem it solves, the architecture, the tradeoffs, and what I learned."
          />
        </ScrollReveal>
        <div className="space-y-6">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ EXPERIENCE ---------------------------- */

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  return (
    <section id="experience" ref={containerRef} className="relative py-28 px-4 md:px-8 border-t border-border/50">
      <div className="mx-auto w-[min(1180px,94vw)]">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Experience"
            title="Where I've shipped work."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <SpotlightTiltCard maxTilt={1.5} className="relative rounded-2xl glass-strong p-8 md:p-10 border border-border/50 hover:border-cyan/35 overflow-hidden transition-colors duration-300">
            {/* Scroll timeline tracking indicator */}
            <div className="absolute left-[12px] top-0 bottom-0 w-[3px] bg-white/[0.03]">
              <motion.div
                className="w-full h-full bg-gradient-to-b from-cyan via-violet to-cyan/80 origin-top"
                style={{ scaleY }}
              />
            </div>

            {/* Top Node */}
            <div className="absolute left-[12px] top-0 z-10 -translate-x-[35%] flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan/50 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
            </div>

            {/* Bottom Node */}
            <motion.div
              style={{
                scale: useTransform(scrollYProgress, [0.85, 1], [0, 1]),
                opacity: useTransform(scrollYProgress, [0.85, 1], [0, 1])
              }}
              className="absolute left-[12px] bottom-0 z-10 -translate-x-[35%] flex h-3 w-3 items-center justify-center"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet/50 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet" />
            </motion.div>

            <div className="grid md:grid-cols-[220px_1fr] gap-8 pl-8">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-border transition-colors duration-300 group-hover:bg-cyan/10">
                  <BriefcaseBusiness className="h-5 w-5 text-cyan" />
                </div>
                <div className="mt-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">Internship</div>
                <div className="mt-1 font-display text-xl font-semibold">Prodigy Infotech</div>
                <div className="text-sm text-muted-foreground mt-0.5">Software Development Intern</div>
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-hud-pulse" /> Completed
                </div>
              </div>
              <div>
                <ul className="space-y-4 text-foreground/85">
                  {[
                    "Built frontend interfaces with React.js using modern web tooling and component patterns.",
                    "Developed responsive, accessible web interfaces aligned to design specifications.",
                    "Shipped JavaScript features with reusable, well-typed components.",
                    "Integrated REST APIs into data-driven UI flows and validated edge cases.",
                  ].map((t, idx) => (
                    <motion.li
                      key={t}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-sm md:text-[15px] group/desc"
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan transition-transform duration-300 group-hover/desc:scale-125" />
                      <span className="transition-colors duration-300 group-hover/desc:text-foreground">{t}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </SpotlightTiltCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ------------------------------- RESEARCH ----------------------------- */

const CERTS = [
  { name: "NPTEL — Design & Analysis of Algorithms", icon: Sigma },
  { name: "Docker, Kubernetes & OpenShift", icon: Container },
  { name: "Advanced Java Programming", icon: Coffee },
  { name: "Networking Fundamentals (Cisco)", icon: Network },
  { name: "Operating Systems Basics", icon: MonitorCog },
  { name: "Practical Machine Learning (Coursera)", icon: Brain },
  { name: "Smart India Hackathon Participant", icon: Trophy },
];

export function Research() {
  return (
    <section id="research" className="relative py-28 px-4 md:px-8 border-t border-border/50">
      <div className="mx-auto w-[min(1180px,94vw)]">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Research & Credentials"
            title="Published work and verified learning."
          />
        </ScrollReveal>

        <ScrollRevealContainer className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <ScrollRevealItem className="col-span-1 lg:col-span-3">
            <SpotlightTiltCard maxTilt={1.5} className="h-full rounded-2xl glass-strong p-8 md:p-10 border border-border/50 hover:border-cyan/35 transition-colors duration-300">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-border transition-colors duration-300 group-hover:bg-cyan/10">
                <FlaskConical className="h-5 w-5 text-violet animate-hud-pulse" />
              </div>
              <div className="mt-5 text-xs font-mono uppercase tracking-widest text-muted-foreground">Publication · ICCET 2024</div>
              <h3 className="mt-2 font-display text-xl md:text-2xl font-semibold leading-snug transition-colors duration-300 group-hover:text-cyan">
                CampusOne: A Web-Based Platform for Enhancing Student Collaboration and Academic Resource Management
              </h3>
              <p className="mt-4 text-sm md:text-[15px] text-foreground/80 leading-relaxed">
                A peer-reviewed research effort exploring how unified web platforms can accelerate student
                collaboration and centralize academic resources at scale.
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {["Education-Tech", "Collaboration", "Full Stack", "System Design"].map((t) => (
                  <span key={t} className="text-[11px] rounded-md border border-border bg-white/[0.04] px-2 py-1 text-foreground/85 transition-all duration-300 hover:bg-white/[0.08] hover:border-cyan/20 hover:text-cyan">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <Magnetic range={40} strength={0.25}>
                  <a href="#" className="inline-flex items-center gap-1.5 text-sm text-cyan hover:underline group/paper-link">
                    Read paper <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/paper-link:translate-x-0.5 group-hover/paper-link:-translate-y-0.5" />
                  </a>
                </Magnetic>
              </div>
            </SpotlightTiltCard>
          </ScrollRevealItem>

          <ScrollRevealItem className="col-span-1 lg:col-span-2">
            <SpotlightTiltCard maxTilt={2} className="h-full rounded-2xl glass p-6 border border-border/50 hover:border-cyan/35 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-cyan" />
                <div className="font-display text-base font-semibold">Certifications</div>
              </div>
              <ul className="mt-5 space-y-2">
                {CERTS.map(({ name, icon: Icon }) => (
                  <li key={name} className="flex items-start gap-3 rounded-lg border border-border px-3 py-2.5 bg-white/[0.02] group/cert-item hover:border-cyan/20 hover:bg-white/[0.04] transition-all duration-300">
                    <Icon className="h-4 w-4 text-cyan mt-0.5 transition-transform duration-300 group-hover/cert-item:scale-110" />
                    <span className="text-sm text-foreground/85 leading-snug group-hover/cert-item:text-foreground transition-colors duration-300">{name}</span>
                  </li>
                ))}
              </ul>
            </SpotlightTiltCard>
          </ScrollRevealItem>
        </ScrollRevealContainer>
      </div>
    </section>
  );
}

/* -------------------------------- CONTACT ----------------------------- */

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const subject = encodeURIComponent(`Portfolio Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`
    );

    window.location.href = `mailto:vineetsingh68220@gmail.com?subject=${subject}&body=${body}`;

    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="relative py-28 px-4 md:px-8 border-t border-border/50">
      <div className="mx-auto w-[min(1180px,94vw)]">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something together."
            subtitle="I'm open to internships, full-time roles, and meaningful collaborations. The fastest way to reach me is email."
          />
        </ScrollReveal>

        <ScrollRevealContainer className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <ScrollRevealItem className="col-span-1 lg:col-span-3">
            <SpotlightTiltCard maxTilt={1.5} className="rounded-2xl glass-strong p-8 md:p-10 border border-border/50">
              <ScrollRevealContainer>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <ScrollRevealItem>
                      <div>
                        <label className="text-xs text-muted-foreground font-mono">Name</label>
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={status === "sending"}
                          className="mt-1.5 w-full bg-white/[0.03] border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-cyan/30 transition-all duration-300 disabled:opacity-50"
                          placeholder="Your name"
                        />
                      </div>
                    </ScrollRevealItem>
                    <ScrollRevealItem>
                      <div>
                        <label className="text-xs text-muted-foreground font-mono">Email</label>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={status === "sending"}
                          className="mt-1.5 w-full bg-white/[0.03] border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-cyan/30 transition-all duration-300 disabled:opacity-50"
                          placeholder="you@example.com"
                        />
                      </div>
                    </ScrollRevealItem>
                  </div>
                  <ScrollRevealItem>
                    <div>
                      <label className="text-xs text-muted-foreground font-mono">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={status === "sending"}
                        className="mt-1.5 w-full bg-white/[0.03] border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-cyan/30 transition-all duration-300 resize-none disabled:opacity-50"
                        placeholder="Tell me a bit about the role or project…"
                      />
                    </div>
                  </ScrollRevealItem>
                  <ScrollRevealItem className="pt-2">
                    <Magnetic range={50} strength={0.25}>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {status === "sending" ? "Opening mail client..." : "Send message"}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </button>
                    </Magnetic>
                  </ScrollRevealItem>
                  {status === "success" && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400 text-sm font-mono mt-3">
                      Opening your default mail client to send...
                    </motion.div>
                  )}
                </form>
              </ScrollRevealContainer>
            </SpotlightTiltCard>
          </ScrollRevealItem>

          <ScrollRevealItem className="col-span-1 lg:col-span-2 space-y-3">
            <SpotlightTiltCard maxTilt={2.5} className="rounded-2xl glass p-6 border border-border/50 hover:border-cyan/35 transition-colors duration-300">
              <div className="space-y-4 text-sm">
                {[
                  { icon: Mail, href: "mailto:vineetsingh68220@gmail.com", label: "vineetsingh68220@gmail.com" },
                  { icon: Github, href: "https://github.com/vineetsingh-007", label: "github.com/vineetsingh-007" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/vineet-singh-76772b307", label: "linkedin.com/in/vineet-singh-76772b307" },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target={label.includes("mailto") ? undefined : "_blank"} rel="noopener" className="flex items-center gap-3 text-foreground/90 hover:text-cyan transition-colors duration-300 group/contact-card-link">
                    <Icon className="h-4 w-4 text-cyan transition-transform duration-300 group-hover/contact-card-link:scale-110" /> {label}
                  </a>
                ))}
                <div className="flex items-center gap-3 text-muted-foreground border-t border-border/50 pt-3 mt-1">
                  <MapPin className="h-4 w-4 text-cyan" /> Pune, Maharashtra · India
                </div>
              </div>
            </SpotlightTiltCard>

            <SpotlightTiltCard maxTilt={2.5} className="rounded-2xl glass p-6 border border-border/50 hover:border-cyan/35 transition-colors duration-300">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Resume</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Magnetic range={45} strength={0.25}>
                  <a href="https://drive.google.com/file/d/1cXaxbrnlApElDLINESxIPvYAnL-hKSXG/view?usp=share_link" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-medium hover:bg-white/5 transition-colors">
                    <FileText className="h-3.5 w-3.5" /> View
                  </a>
                </Magnetic>
                <Magnetic range={45} strength={0.25}>
                  <a href="https://drive.google.com/uc?export=download&id=1cXaxbrnlApElDLINESxIPvYAnL-hKSXG" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-medium hover:bg-white/5 transition-colors">
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                </Magnetic>
              </div>
            </SpotlightTiltCard>
          </ScrollRevealItem>
        </ScrollRevealContainer>
      </div>
    </section>
  );
}

/* -------------------------------- FOOTER ------------------------------ */

export function Footer() {
  return (
    <footer className="relative py-10 px-4 md:px-8 border-t border-border">
      <div className="mx-auto w-[min(1180px,94vw)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} Vineet Singh. Crafted with care.
        </div>
        <div className="flex gap-4 text-muted-foreground">
          {[
            { icon: Github, href: "https://github.com/vineetsingh-007", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/vineet-singh-76772b307", label: "LinkedIn" },
            { icon: Mail, href: "mailto:vineetsingh68220@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <Magnetic key={label} range={35} strength={0.3}>
              <a href={href} aria-label={label} target="_blank" rel="noopener" className="hover:text-cyan transition-colors duration-300">
                <Icon className="h-4 w-4" />
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </footer>
  );
}
