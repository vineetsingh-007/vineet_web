import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Bot, Send, Navigation, MapPin, Star, Terminal, ShieldAlert, Cpu, Check, Compass, Eye, ShieldCheck } from "lucide-react";

interface VisualProps {
  isHovered: boolean;
}

/* ----------------------------- 1. CAMPUSONE ----------------------------- */

export function CampusOneVisual({ isHovered }: VisualProps) {
  const [messages, setMessages] = useState([
    { role: "user", text: "Where is the Seminar Hall?" },
    { role: "bot", text: "Building B, 2nd Floor. I've sent the directions to your map." }
  ]);

  useEffect(() => {
    if (isHovered) {
      const timeout = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { role: "user", text: "Thanks, is it open today?" },
          { role: "bot", text: "Yes, open until 8:00 PM." }
        ]);
      }, 800);
      return () => clearTimeout(timeout);
    } else {
      setMessages([
        { role: "user", text: "Where is the Seminar Hall?" },
        { role: "bot", text: "Building B, 2nd Floor. I've sent the directions to your map." }
      ]);
    }
  }, [isHovered]);

  return (
    <div className="relative w-full h-[220px] bg-black/20 rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between p-4">
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-cyan/10 flex items-center justify-center border border-cyan/20">
            <Bot className="h-3.5 w-3.5 text-cyan" />
          </div>
          <span className="text-xs font-mono font-medium tracking-tight text-foreground/80">CampusOne AI</span>
        </div>
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-hud-pulse" />
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-3 space-y-2.5 flex flex-col justify-end text-[11px] leading-relaxed">
        <AnimatePresence>
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex max-w-[85%] rounded-lg p-2 ${
                m.role === "user"
                  ? "bg-white/5 border border-white/5 self-end text-right text-foreground/90 rounded-br-none"
                  : "bg-cyan/10 border border-cyan/10 text-cyan self-start text-left rounded-bl-none"
              }`}
            >
              {m.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div className="mt-2 flex items-center gap-1.5 bg-white/[0.03] border border-white/5 rounded-full px-3 py-1.5">
        <div className="text-[10px] text-muted-foreground flex-1 font-sans">
          {isHovered ? "AI is responding..." : "Ask CampusOne assistant..."}
        </div>
        <Send className="h-3 w-3 text-muted-foreground" />
      </div>
    </div>
  );
}

/* ----------------------------- 2. DRONE FLOOD ----------------------------- */

export function DroneFloodVisual({ isHovered }: VisualProps) {
  // A* grid navigation simulation
  const [dronePos, setDronePos] = useState({ x: 0, y: 0 });
  const [step, setStep] = useState(0);

  const path = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 4, y: 3 },
    { x: 4, y: 4 }
  ];

  const obstacles = [
    { x: 2, y: 0 },
    { x: 1, y: 2 },
    { x: 3, y: 1 },
    { x: 2, y: 3 }
  ];

  useEffect(() => {
    const intervalTime = isHovered ? 400 : 850;
    const interval = setInterval(() => {
      setStep(prev => {
        const next = (prev + 1) % path.length;
        setDronePos(path[next]);
        return next;
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="relative w-full h-[220px] bg-black/20 rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <Navigation className="h-3.5 w-3.5 text-cyan animate-pulse" />
          <span className="text-xs font-mono font-medium tracking-tight text-foreground/80">A* Path Navigation</span>
        </div>
        <span className="text-[10px] font-mono text-cyan/70">Telemetry Active</span>
      </div>

      {/* Visual Grid */}
      <div className="flex-1 flex items-center justify-center p-2">
        <div className="grid grid-cols-5 gap-2 relative">
          {Array.from({ length: 5 }).map((_, r) => (
            <div key={r} className="flex gap-2">
              {Array.from({ length: 5 }).map((_, c) => {
                const isObstacle = obstacles.some(o => o.x === c && o.y === r);
                const isStart = r === 0 && c === 0;
                const isEnd = r === 4 && c === 4;
                const isPath = path.some(p => p.x === c && p.y === r);
                const isDrone = dronePos.x === c && dronePos.y === r;

                return (
                  <div
                    key={c}
                    className={`h-6 w-6 rounded-md flex items-center justify-center relative border transition-all duration-300 ${
                      isDrone
                        ? "bg-cyan border-cyan/40 shadow-[0_0_12px_rgba(34,211,238,0.5)] z-20"
                        : isObstacle
                        ? "bg-blue-950/60 border-blue-900/30 text-blue-500/80"
                        : isEnd
                        ? "bg-rose-500/10 border-rose-500/30"
                        : isStart
                        ? "bg-emerald-500/10 border-emerald-500/30"
                        : isPath
                        ? "bg-cyan/5 border-cyan/15"
                        : "bg-white/[0.01] border-white/5"
                    }`}
                  >
                    {isDrone && (
                      <motion.div
                        layoutId="drone-active"
                        className="h-2.5 w-2.5 bg-black rounded-full flex items-center justify-center"
                      >
                        <span className="block h-1.5 w-1.5 rounded-full bg-cyan" />
                      </motion.div>
                    )}
                    {isEnd && !isDrone && <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />}
                    {isObstacle && <span className="text-[8px] font-mono select-none">H₂O</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Info status */}
      <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground border-t border-white/5 pt-2">
        <div>COORDS: X={dronePos.x}, Y={dronePos.y}</div>
        <div className="text-cyan">STATUS: NAVIGATION_ON</div>
      </div>
    </div>
  );
}

/* ----------------------------- 3. PG CONNECT ----------------------------- */

export function PGConnectVisual({ isHovered }: VisualProps) {
  return (
    <div className="relative w-full h-[220px] bg-black/20 rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between p-4">
      {/* Card UI */}
      <div className="flex-1 flex flex-col justify-center gap-3">
        {/* Search bar simulation */}
        <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-lg px-2.5 py-1.5 text-[10px] text-muted-foreground font-mono">
          <MapPin className="h-3.5 w-3.5 text-cyan" />
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Pune, Near MIT ADT...
          </motion.span>
        </div>

        {/* Dynamic Card listing */}
        <motion.div
          animate={{
            y: isHovered ? -3 : 0,
            scale: isHovered ? 1.01 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-xl glass border border-white/5 p-3 flex gap-3 relative"
        >
          {/* Mini map or visual proxy */}
          <div className="h-14 w-14 rounded-lg bg-white/[0.02] border border-white/5 overflow-hidden flex items-center justify-center relative">
            <Compass className="h-6 w-6 text-muted-foreground/30 animate-spin" style={{ animationDuration: isHovered ? "10s" : "30s" }} />
            <span className="absolute bottom-1 right-1 h-1.5 w-1.5 bg-cyan rounded-full animate-ping" />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 text-[10px] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-display font-semibold text-foreground/80 tracking-tight">Skyline Heights</span>
              <span className="flex items-center gap-0.5 text-cyan">
                <Star className="h-2.5 w-2.5 fill-cyan text-cyan" /> 4.8
              </span>
            </div>
            <p className="text-muted-foreground text-[9px] truncate">Single sharing, food, Wi-Fi included</p>
            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-foreground font-medium">₹8,500/mo</span>
              <span className="text-[8px] bg-cyan/10 border border-cyan/20 text-cyan rounded-md px-1.5 py-0.5 font-mono">Verified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ----------------------------- 4. MICROSERVICES COLLAB ----------------------------- */

export function MicroservicesVisual({ isHovered }: VisualProps) {
  const [logs, setLogs] = useState<string[]>([
    "docker-compose.yml parsed successfully.",
    "Container db-mongo starting...",
    "Container auth-node starting...",
    "Container db-mongo ready. [OK]",
    "Container auth-node ready. [OK]"
  ]);

  const allLogs = [
    "docker-compose.yml parsed successfully.",
    "Container db-mongo starting...",
    "Container auth-node starting...",
    "Container db-mongo ready. [OK]",
    "Container auth-node ready. [OK]",
    "Container gateway starting...",
    "Container gateway ready. [OK]",
    "Inter-service RPC channels initialized.",
    "Gateway proxying on port 8080. [READY]",
    "Running integration health-checks...",
    "All containers verified. STATUS: UP."
  ];

  useEffect(() => {
    if (isHovered) {
      let currentIdx = 5;
      const interval = setInterval(() => {
        if (currentIdx < allLogs.length) {
          setLogs(prev => [...prev.slice(1), allLogs[currentIdx]]);
          currentIdx++;
        } else {
          setLogs([
            "Container db-mongo ready. [OK]",
            "Container auth-node ready. [OK]",
            "Gateway proxying on port 8080. [READY]",
            "Running integration health-checks...",
            "All containers verified. STATUS: UP."
          ]);
          currentIdx = 5;
        }
      }, 550);
      return () => clearInterval(interval);
    } else {
      setLogs([
        "docker-compose.yml parsed successfully.",
        "Container db-mongo starting...",
        "Container auth-node starting...",
        "Container db-mongo ready. [OK]",
        "Container auth-node ready. [OK]"
      ]);
    }
  }, [isHovered]);

  return (
    <div className="relative w-full h-[220px] bg-black/40 rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between p-4 font-mono text-[9px] text-muted-foreground leading-relaxed">
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-foreground/80">
        <div className="flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5 text-cyan" />
          <span>microservices-gateway</span>
        </div>
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Terminal log streams */}
      <div className="flex-1 py-3 space-y-1.5 flex flex-col justify-end">
        {logs.map((l, idx) => (
          <div key={idx} className="flex gap-2 items-start">
            <span className="text-cyan font-bold select-none">&gt;</span>
            <span className={l.includes("[OK]") || l.includes("STATUS: UP") ? "text-emerald-400" : "text-muted-foreground"}>
              {l}
            </span>
          </div>
        ))}
        <div className="flex gap-1 items-center">
          <span className="text-cyan font-bold select-none">&gt;</span>
          <span className="h-3 w-1.5 bg-cyan animate-pulse" />
        </div>
      </div>
    </div>
  );
}


/* ----------------------------- 6. AERIS AI ----------------------------- */

export function AerisAiVisual({ isHovered }: VisualProps) {
  const [dronePos, setDronePos] = useState({ x: 10, y: 90 });
  const [step, setStep] = useState(0);
  const [battery, setBattery] = useState(100);
  const [survivorsFound, setSurvivorsFound] = useState(0);
  const [inferenceTime, setInferenceTime] = useState(12);

  // Path coordinates for the drone simulation
  const path = [
    { x: 10, y: 90, status: "Takeoff" },
    { x: 30, y: 80, status: "Scanning Area A" },
    { x: 50, y: 70, status: "Avoiding Wildfire" },
    { x: 60, y: 45, status: "Survivor Located" },
    { x: 80, y: 35, status: "Dropping Aid" },
    { x: 90, y: 20, status: "Heading to Base" },
  ];

  useEffect(() => {
    const intervalTime = isHovered ? 600 : 1200;
    const interval = setInterval(() => {
      setStep(prev => {
        const next = (prev + 1) % path.length;
        setDronePos(path[next]);
        
        // Dynamic stats
        setBattery(b => {
          if (next === 0) return 100;
          return Math.max(15, b - Math.floor(Math.random() * 5) - 3);
        });
        
        setSurvivorsFound(s => {
          if (next === 0) return 0;
          if (next === 3) return s + 2;
          if (next === 4) return s + 1;
          return s;
        });

        setInferenceTime(() => Math.floor(Math.random() * 6) + 8);
        
        return next;
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isHovered]);

  const currentPoint = path[step];

  return (
    <div className="relative w-full min-h-[220px] h-auto bg-black/40 rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between p-3 font-mono text-[9px] text-muted-foreground leading-relaxed">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-1.5 text-[10px] text-foreground/80">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          <span className="font-semibold tracking-wide text-rose-400">AERIS MISSION CONTROL</span>
        </div>
        <span className="text-cyan font-semibold">DQN_AGENT_V2</span>
      </div>

      {/* Main split display: Map preview left, Stats right */}
      <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-3 my-1.5 sm:my-2 overflow-hidden">
        {/* Drone Map visualization (left) */}
        <div className="flex-[2] rounded bg-white/[0.01] border border-white/5 relative overflow-hidden flex flex-col justify-between p-1.5 sm:p-2 min-h-[95px] sm:min-h-0">
          {/* Grid lines overlay */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] pointer-events-none">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border-t border-l border-white" />
            ))}
          </div>

          {/* Map Status indicator */}
          <div className="text-[7px] text-cyan/70 z-10 flex justify-between">
            <span>ALT: 45m</span>
            <span className="text-amber-500 animate-pulse">{currentPoint.status}</span>
          </div>

          {/* SVG Flight Path visualization */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg className="w-full h-full p-2.5 sm:p-4" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Path lines */}
              <polyline
                points={path.map(p => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="rgba(34, 211, 238, 0.15)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <polyline
                points={path.slice(0, step + 1).map(p => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="rgb(34, 211, 238)"
                strokeWidth="2"
              />
              {/* Fire/Hazard zone */}
              <circle cx="50" cy="65" r="10" fill="rgba(244, 63, 94, 0.1)" stroke="rgba(244, 63, 94, 0.3)" strokeWidth="0.8" />
              {/* Survivor hot spots */}
              <circle cx="60" cy="45" r="4" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="0.5" />
              <circle cx="80" cy="35" r="4" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="0.5" />

              {/* Active Drone Node */}
              <circle
                cx={dronePos.x}
                cy={dronePos.y}
                r="3.5"
                fill="#22d3ee"
                className="transition-all duration-300"
              />
            </svg>
          </div>

          {/* Telemetry bottom */}
          <div className="z-10 text-[7px] flex justify-between items-center text-muted-foreground/80 mt-auto">
            <span>LAT: 18.5204° N</span>
            <span>LNG: 73.8567° E</span>
          </div>
        </div>

        {/* Live Mission Statistics (right) */}
        <div className="w-full sm:w-[100px] flex flex-row sm:flex-col gap-1 sm:gap-1.5 justify-between sm:justify-center">
          {/* Stat Box 1 */}
          <div className="flex-1 sm:flex-none bg-white/[0.02] border border-white/5 rounded p-1 sm:p-1.5 flex flex-col justify-center">
            <span className="text-[6px] sm:text-[7px] text-muted-foreground uppercase tracking-wider">Survivors</span>
            <span className="text-[9px] sm:text-[11px] font-bold text-emerald-400 mt-0.5 flex items-center justify-between">
              {survivorsFound} LOC
              <span className="hidden sm:inline h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
          </div>
          {/* Stat Box 2 */}
          <div className="flex-1 sm:flex-none bg-white/[0.02] border border-white/5 rounded p-1 sm:p-1.5 flex flex-col justify-center">
            <span className="text-[6px] sm:text-[7px] text-muted-foreground uppercase tracking-wider">Battery</span>
            <span className={`text-[9px] sm:text-[11px] font-bold mt-0.5 flex items-center justify-between ${battery < 30 ? "text-rose-500" : "text-cyan"}`}>
              {battery}%
              <span className={`hidden sm:flex h-1.5 w-3 rounded-sm border ${battery < 30 ? "border-rose-500/50" : "border-cyan/50"} items-center p-[1px]`}>
                <span className={`h-full ${battery < 30 ? "bg-rose-500" : "bg-cyan"}`} style={{ width: `${battery}%` }} />
              </span>
            </span>
          </div>
          {/* Stat Box 3 */}
          <div className="flex-1 sm:flex-none bg-white/[0.02] border border-white/5 rounded p-1 sm:p-1.5 flex flex-col justify-center">
            <span className="text-[6px] sm:text-[7px] text-muted-foreground uppercase tracking-wider">Inference</span>
            <span className="text-[9px] sm:text-[11px] font-bold text-foreground/90 mt-0.5">
              {inferenceTime} ms
            </span>
          </div>
        </div>
      </div>

      {/* EOC Footer Status */}
      <div className="flex items-center justify-between text-[8px] border-t border-white/5 pt-1.5">
        <div className="flex items-center gap-1">
          <ShieldAlert className="h-3 w-3 text-amber-500 animate-pulse" />
          <span className="text-muted-foreground">HAZARD AVOIDANCE:</span>
          <span className="text-emerald-400 font-bold">READY</span>
        </div>
        <div className="text-cyan/80">GRID: 100x100</div>
      </div>
    </div>
  );
}

/* ----------------------------- 7. SIGNVERSE AI ----------------------------- */

export function SignVerseVisual({ isHovered }: VisualProps) {
  const [detectedChar, setDetectedChar] = useState("H");
  const [word, setWord] = useState("");
  const [step, setStep] = useState(0);
  const [confidence, setConfidence] = useState(99.4);
  const [fps, setFps] = useState(30);

  // Simulation sequence: Spells H-E-L-L-O
  const sequence = [
    { char: "H", word: "H", handState: "two_fingers" },
    { char: "E", word: "HE", handState: "fist" },
    { char: "L", word: "HEL", handState: "l_shape" },
    { char: "L", word: "HELL", handState: "l_shape" },
    { char: "O", word: "HELLO", handState: "o_shape" },
    { char: " ", word: "HELLO 👋", handState: "open_hand" }
  ];

  useEffect(() => {
    const intervalTime = isHovered ? 800 : 1600;
    const interval = setInterval(() => {
      setStep(prev => {
        const next = (prev + 1) % sequence.length;
        const current = sequence[next];
        setDetectedChar(current.char);
        setWord(current.word);
        setConfidence(Number((95 + Math.random() * 4.9).toFixed(1)));
        setFps(Math.floor(Math.random() * 3) + 29);
        return next;
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isHovered]);

  const current = sequence[step];

  // Define simple coordinates for hand shapes to simulate hand landmarks
  const getHandLandmarks = (state: string) => {
    // Base wrist position
    const wrist = { x: 50, y: 85 };
    
    // Default relative fingertip coordinates based on gesture state
    let fingers = [
      { x: 30, y: 60 }, // Thumb
      { x: 40, y: 35 }, // Index
      { x: 50, y: 30 }, // Middle
      { x: 60, y: 35 }, // Ring
      { x: 70, y: 45 }  // Pinky
    ];

    if (state === "fist" || state === "o_shape") {
      fingers = [
        { x: 42, y: 65 },
        { x: 45, y: 58 },
        { x: 50, y: 58 },
        { x: 55, y: 60 },
        { x: 58, y: 65 }
      ];
    } else if (state === "two_fingers") {
      fingers = [
        { x: 35, y: 65 },
        { x: 45, y: 30 }, // Index up
        { x: 55, y: 32 }, // Middle up
        { x: 60, y: 65 },
        { x: 65, y: 70 }
      ];
    } else if (state === "l_shape") {
      fingers = [
        { x: 25, y: 55 }, // Thumb out
        { x: 45, y: 25 }, // Index up
        { x: 52, y: 62 },
        { x: 58, y: 65 },
        { x: 64, y: 68 }
      ];
    }

    return { wrist, fingers };
  };

  const { wrist, fingers } = getHandLandmarks(current.handState);

  return (
    <div className="relative w-full min-h-[220px] h-auto bg-black/40 rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between p-3 font-mono text-[9px] text-muted-foreground leading-relaxed">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-1.5 text-[10px] text-foreground/80">
        <div className="flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5 text-cyan animate-pulse" />
          <span className="font-semibold tracking-wide text-cyan">SIGNVERSE CV ENGINE</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-emerald-400 font-semibold">{fps} GEST/S</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-3 my-1.5 sm:my-2 overflow-hidden">
        {/* Camera Feed view (left) */}
        <div className="flex-[2] rounded bg-white/[0.01] border border-white/5 relative overflow-hidden flex flex-col justify-between p-1.5 sm:p-2 min-h-[95px] sm:min-h-0">
          {/* Target Box corners overlay */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan/50" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan/50" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan/50" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan/50" />

          {/* HUD status */}
          <div className="text-[7px] text-cyan/70 z-10 flex justify-between">
            <span>WEBCAM: OK</span>
            <span>GESTURE: {current.handState.toUpperCase()}</span>
          </div>

          {/* SVG Hand Landmark Drawing */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg className="w-full h-full p-2.5 sm:p-4" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Hand connections (skeleton lines) */}
              {fingers.map((f, i) => (
                <line
                  key={i}
                  x1={wrist.x}
                  y1={wrist.y}
                  x2={f.x}
                  y2={f.y}
                  stroke="rgba(34, 211, 238, 0.4)"
                  strokeWidth="1.5"
                />
              ))}

              {/* Wrist node */}
              <circle cx={wrist.x} cy={wrist.y} r="2.5" fill="#22d3ee" />

              {/* Finger Tip nodes */}
              {fingers.map((f, i) => (
                <circle
                  key={i}
                  cx={f.x}
                  cy={f.y}
                  r="2.5"
                  fill={i === 1 ? "#34d399" : "#22d3ee"} // highlight index tip
                />
              ))}
            </svg>
          </div>

          {/* Live Translation bubble */}
          <div className="absolute bottom-2 left-2 right-2 bg-black/75 border border-cyan/20 rounded-md p-1 z-10 text-[9px] text-center font-sans text-foreground font-semibold flex items-center justify-center gap-1.5">
            <span className="text-[7px] font-mono text-cyan uppercase tracking-wide">Output:</span>
            <span className="text-cyan tracking-wider">{word || "_"}</span>
          </div>
        </div>

        {/* Inference details (right) */}
        <div className="w-full sm:w-[100px] flex flex-row sm:flex-col gap-1 sm:gap-1.5 justify-between sm:justify-center">
          {/* Stat Box 1 */}
          <div className="flex-1 sm:flex-none bg-white/[0.02] border border-white/5 rounded p-1 sm:p-1.5 flex flex-col justify-center">
            <span className="text-[6px] sm:text-[7px] text-muted-foreground uppercase tracking-wider">Prediction</span>
            <span className="text-[10px] sm:text-[14px] font-bold text-cyan mt-0.5 text-center bg-cyan/5 border border-cyan/10 rounded py-0.5">
              "{detectedChar === " " ? "SPACE" : detectedChar}"
            </span>
          </div>
          {/* Stat Box 2 */}
          <div className="flex-1 sm:flex-none bg-white/[0.02] border border-white/5 rounded p-1 sm:p-1.5 flex flex-col justify-center">
            <span className="text-[6px] sm:text-[7px] text-muted-foreground uppercase tracking-wider">Confidence</span>
            <span className="text-[9px] sm:text-[11px] font-bold text-emerald-400 mt-0.5">
              {confidence}%
            </span>
          </div>
          {/* Stat Box 3 */}
          <div className="flex-1 sm:flex-none bg-white/[0.02] border border-white/5 rounded p-1 sm:p-1.5 flex flex-col justify-center min-w-0">
            <span className="text-[6px] sm:text-[7px] text-muted-foreground uppercase tracking-wider">Models</span>
            <span className="text-[7px] sm:text-[8px] font-semibold text-foreground/80 mt-0.5 truncate">
              MediaPipe + PyTorch
            </span>
          </div>
        </div>
      </div>

      {/* EOC Footer Status */}
      <div className="flex items-center justify-between text-[8px] border-t border-white/5 pt-1.5">
        <div className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-emerald-400" />
          <span className="text-muted-foreground">LOCAL INFERENCE:</span>
          <span className="text-emerald-400 font-bold">100% PRIVATE</span>
        </div>
        <span className="text-muted-foreground/60">DEVICE: CPU</span>
      </div>
    </div>
  );
}
