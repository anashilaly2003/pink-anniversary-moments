import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, X, Gamepad2, Sparkles, Lock, MapPin, Activity, Disc3, HeartCrack } from "lucide-react";

type GameId = "breakup" | "spin" | "scanner" | "gps" | "password";

const games: { id: GameId; title: string; tagline: string; icon: typeof Heart; color: string }[] = [
  { id: "breakup",  title: "Will We Break Up?",        tagline: "The impossible question",          icon: HeartCrack, color: "from-rose-400 to-pink-600" },
  { id: "spin",     title: "How Much I Love You",      tagline: "Spin the wheel of love",           icon: Disc3,      color: "from-pink-400 to-fuchsia-500" },
  { id: "scanner",  title: "Love Meter Scanner",       tagline: "Cinematic love analysis",          icon: Activity,   color: "from-rose-500 to-red-500" },
  { id: "gps",      title: "Love GPS",                 tagline: "Searching for your soulmate…",     icon: MapPin,     color: "from-pink-500 to-rose-600" },
  { id: "password", title: "Love Password",            tagline: "Unlock my heart",                  icon: Lock,       color: "from-fuchsia-500 to-pink-600" },
];

export function GamesSection() {
  const [active, setActive] = useState<GameId | null>(null);

  return (
    <section id="games" className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-3 text-rose-500 uppercase tracking-[0.3em] text-xs">
          <Gamepad2 className="w-4 h-4" /> Play with my heart
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-rose-700 mb-3">
          Love Games
        </h2>
        <p className="text-rose-600/70 italic">Five little games. Five ways to say I love you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((g) => {
          const Icon = g.icon;
          return (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              className="group relative overflow-hidden rounded-3xl p-6 text-left bg-white/80 backdrop-blur-md border border-pink-200 shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${g.color} opacity-20 group-hover:opacity-40 blur-2xl transition-opacity`} />
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${g.color} text-white shadow-lg mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-rose-700">{g.title}</h3>
              <p className="text-sm text-rose-600/70 mt-1">{g.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-rose-500 text-sm font-semibold">
                Play <Heart className="w-3.5 h-3.5 fill-rose-500" />
              </span>
            </button>
          );
        })}
      </div>

      {active && (
        <Modal onClose={() => setActive(null)}>
          {active === "breakup"  && <BreakUpGame />}
          {active === "spin"     && <SpinWheelGame />}
          {active === "scanner"  && <LoveMeterScanner />}
          {active === "gps"      && <LoveGPSGame />}
          {active === "password" && <LovePasswordGame />}
        </Modal>
      )}
    </section>
  );
}

/* ============ Modal ============ */
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/70 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-br from-pink-50 to-rose-100 border-4 border-pink-200 shadow-2xl overflow-hidden animate-letter-open"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow"
        >
          <X className="w-5 h-5 text-rose-700" />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ============ 1. BreakUp Game ============ */
const BREAKUP_QUESTIONS = [
  "Are we going to break up?",
  "Will you stop loving me?",
  "Do you prefer someone else?",
  "Do you want to leave me?",
  "Will our story end?",
];

function BreakUpGame() {
  const [step, setStep] = useState(0);
  const [yesPos, setYesPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dodge = () => {
    const c = containerRef.current;
    if (!c) return;
    const w = c.clientWidth, h = c.clientHeight;
    setYesPos({
      x: (Math.random() - 0.5) * w * 0.8,
      y: (Math.random() - 0.5) * h * 0.6,
    });
    setScale((s) => Math.max(0.4, s - 0.08));
  };

  const onNo = () => {
    if (step < BREAKUP_QUESTIONS.length - 1) {
      setStep((s) => s + 1);
      setYesPos({ x: 0, y: 0 });
      setScale(1);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div ref={containerRef} className="relative min-h-[420px] flex flex-col items-center justify-center p-10 text-center">
        <FloatingHearts count={30} />
        <Heart className="w-24 h-24 text-rose-500 fill-rose-500 animate-heart-beat drop-shadow-[0_0_30px_rgba(244,63,94,0.6)]" />
        <h3 className="mt-6 text-5xl font-serif font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
          Impossible ❤️
        </h3>
        <p className="mt-3 text-rose-700/80 italic">Forever yours.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative min-h-[420px] p-10 text-center overflow-hidden">
      <p className="text-rose-500 uppercase tracking-widest text-xs mb-4">Question {step + 1} / {BREAKUP_QUESTIONS.length}</p>
      <h3 className="text-3xl md:text-4xl font-serif font-bold text-rose-700 mb-12">
        {BREAKUP_QUESTIONS[step]}
      </h3>
      <div className="relative flex items-center justify-center gap-8 h-40">
        <button
          onMouseEnter={dodge}
          onFocus={dodge}
          onClick={dodge}
          style={{
            transform: `translate(${yesPos.x}px, ${yesPos.y}px) scale(${scale})`,
            transition: "transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
            filter: scale < 0.7 ? "blur(2px)" : "none",
            opacity: scale < 0.5 ? 0.5 : 1,
          }}
          className="px-6 py-3 rounded-full bg-gray-200 text-gray-500 font-semibold shadow"
        >
          ❌ Yes
        </button>
        <button
          onClick={onNo}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold shadow-2xl hover:scale-110 transition-transform"
        >
          ❤️ No
        </button>
      </div>
    </div>
  );
}

/* ============ 2. Spin Wheel ============ */
function SpinWheelGame() {
  const segments = [5, 12, 25, 42, 69, 75];
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [twist, setTwist] = useState(false);

  const spin = () => {
    if (spinning || revealed) return;
    setSpinning(true);
    const turns = 6 + Math.random() * 3;
    const finalAngle = rotation + turns * 360 + Math.random() * 360;
    setRotation(finalAngle);
    setTimeout(() => { setSpinning(false); setRevealed(true); }, 4200);
    setTimeout(() => setTwist(true), 5400);
  };

  const colors = ["#f472b6", "#ec4899", "#db2777", "#f9a8d4", "#fb7185", "#e11d48"];

  if (twist) {
    return (
      <div className="relative min-h-[480px] flex flex-col items-center justify-center p-10 text-center overflow-hidden">
        <FloatingHearts count={40} />
        <Confetti />
        <Heart className="w-28 h-28 text-rose-500 fill-rose-500 animate-heart-beat drop-shadow-[0_0_40px_rgba(244,63,94,0.7)]" />
        <h3 className="mt-6 text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
          Really? You waited for the spin?
        </h3>
        <p className="mt-4 text-xl text-rose-700 italic">
          I love you to the moon and back ❤️
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[480px] flex flex-col items-center justify-center p-8 text-center">
      <h3 className="text-2xl md:text-3xl font-serif font-bold text-rose-700 mb-2">How much I love you</h3>
      <p className="text-rose-600/70 mb-6 italic text-sm">Spin to find out…</p>

      <div className="relative w-72 h-72">
        <div className="absolute inset-0 rounded-full blur-2xl bg-pink-400/40 animate-pulse" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-rose-700 z-10" />
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.2, 1)" : "none",
          }}
        >
          {segments.map((val, i) => {
            const a = (Math.PI * 2) / segments.length;
            const start = i * a - Math.PI / 2;
            const end = start + a;
            const x1 = 100 + 100 * Math.cos(start);
            const y1 = 100 + 100 * Math.sin(start);
            const x2 = 100 + 100 * Math.cos(end);
            const y2 = 100 + 100 * Math.sin(end);
            const mid = start + a / 2;
            const tx = 100 + 60 * Math.cos(mid);
            const ty = 100 + 60 * Math.sin(mid);
            return (
              <g key={i}>
                <path d={`M100,100 L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`} fill={colors[i]} stroke="#fff" strokeWidth="1.5" />
                <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="14" fontWeight="bold" transform={`rotate(${(mid * 180) / Math.PI + 90}, ${tx}, ${ty})`}>
                  {val}%
                </text>
              </g>
            );
          })}
          <circle cx="100" cy="100" r="14" fill="white" stroke="#e11d48" strokeWidth="3" />
        </svg>
      </div>

      <button
        onClick={spin}
        disabled={spinning || revealed}
        className="mt-8 px-10 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold shadow-xl hover:scale-105 transition-transform disabled:opacity-60"
      >
        {spinning ? "Spinning…" : revealed ? "Wait for it…" : "Spin"}
      </button>
    </div>
  );
}

/* ============ 4. Love Meter Scanner ============ */
const SCAN_LINES = [
  { text: "Analyzing smile...",                   ok: "✅ Smile detected" },
  { text: "Analyzing loyalty...",                 ok: "✅ Loyalty level: 100%" },
  { text: "Analyzing memories...",                ok: "✅ 1826 days detected" },
  { text: "Analyzing soulmate compatibility...",  ok: "✅ Perfect match found" },
  { text: "Analyzing cuteness...",                ok: "⚠️  Cuteness overload detected" },
  { text: "Analyzing heart connection...",        ok: "✅ Synchronized heartbeat" },
];

function LoveMeterScanner() {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<"scan" | "chaos" | "infinity" | "final">("scan");
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let p = 0;
    let lineIdx = 0;
    const tick = setInterval(() => {
      p += phase === "scan" ? 3 + Math.random() * 4 : 12 + Math.random() * 18;
      setProgress(Math.round(p));
      if (lineIdx < SCAN_LINES.length && p > (lineIdx + 1) * 15) {
        const l = SCAN_LINES[lineIdx];
        setLines((prev) => [...prev, l.text, l.ok]);
        lineIdx++;
      }
      if (p >= 100 && phase === "scan") {
        setPhase("chaos");
        setLines((prev) => [...prev, "⚠️  WARNING: Energy level increasing...", "⚠️  WARNING: System instability detected...", "⚠️  WARNING: Maximum capacity exceeded..."]);
        setGlitch(true);
      }
      if (p >= 687) {
        clearInterval(tick);
        setPhase("infinity");
        setTimeout(() => setPhase("final"), 2200);
      }
    }, 220);
    return () => clearInterval(tick);
  }, [phase]);

  if (phase === "final") {
    return (
      <div className="relative min-h-[520px] flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-rose-950 via-pink-900 to-rose-800 text-white overflow-hidden">
        <FloatingHearts count={40} color="text-rose-300/60 fill-rose-300/40" />
        <Heart className="w-32 h-32 text-rose-400 fill-rose-400 animate-heart-beat drop-shadow-[0_0_50px_rgba(244,63,94,0.9)]" />
        <div className="mt-6 px-6 py-4 rounded-2xl border border-rose-400/50 bg-black/40 font-mono">
          <p className="text-red-400 text-2xl font-bold">ERROR ❌</p>
          <p className="mt-2 text-pink-100">Love level exceeds measurable limits</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-[520px] p-6 bg-gradient-to-br from-rose-950 via-pink-950 to-black text-pink-100 font-mono overflow-hidden ${glitch ? "animate-shake" : ""}`}>
      <FloatingHearts count={15} color="text-rose-400/30 fill-rose-400/20" />
      <div className="relative z-10">
        <h3 className="text-center text-xl tracking-[0.3em] text-pink-300 mb-2">LOVE METER v2.6</h3>
        <p className="text-center text-pink-400/80 text-xs mb-6">Scanning your love…</p>

        <div className="relative w-full h-6 rounded-full bg-pink-950 border border-pink-500/40 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-300 transition-all duration-200"
            style={{
              width: `${Math.min(progress, 100)}%`,
              boxShadow: "0 0 20px rgba(244,63,94,0.8)",
            }}
          />
        </div>
        <p
          className={`text-center mt-2 text-2xl font-bold ${progress > 100 ? "text-rose-300 animate-pulse" : "text-pink-200"}`}
          style={{ textShadow: progress > 100 ? "0 0 20px #f472b6" : "none" }}
        >
          {phase === "infinity" ? "∞%" : `${progress}%`}
        </p>

        <div className="mt-6 h-56 overflow-hidden rounded-lg border border-pink-500/30 bg-black/40 p-4 text-xs leading-relaxed">
          {lines.map((l, i) => (
            <div key={i} className={l.startsWith("⚠️") ? "text-yellow-300" : l.startsWith("✅") ? "text-emerald-300" : "text-pink-200/80"}>
              &gt; {l}
            </div>
          ))}
          <span className="inline-block w-2 h-3 bg-pink-300 animate-pulse ml-1" />
        </div>
      </div>
    </div>
  );
}

/* ============ 5. Love GPS ============ */
const GPS_LOCATIONS = ["Paris, France", "Tokyo, Japan", "New York, USA", "Mars 🚀", "...zooming in"];

function LoveGPSGame() {
  const [idx, setIdx] = useState(0);
  const [found, setFound] = useState(false);

  useEffect(() => {
    if (idx >= GPS_LOCATIONS.length) { setFound(true); return; }
    const t = setTimeout(() => setIdx((i) => i + 1), 1100);
    return () => clearTimeout(t);
  }, [idx]);

  return (
    <div className="relative min-h-[480px] flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-rose-100 to-pink-200 overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(244,63,94,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(244,63,94,.25) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative w-64 h-64 rounded-full border-4 border-rose-400/60 shadow-[0_0_60px_rgba(244,63,94,.5)] bg-pink-100/50 flex items-center justify-center">
        <div className="absolute inset-4 rounded-full border-2 border-rose-400/40" />
        <div className="absolute inset-12 rounded-full border-2 border-rose-400/30" />
        {!found && (
          <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, transparent 70%, rgba(244,63,94,.6) 100%)", animation: "spin-slow 2s linear infinite" }} />
        )}
        {found ? (
          <div className="relative z-10 animate-letter-open">
            <MapPin className="w-20 h-20 text-rose-600 fill-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,.8)]" />
          </div>
        ) : (
          <MapPin className="w-12 h-12 text-rose-500 animate-pulse" />
        )}
      </div>

      {found ? (
        <div className="mt-8 animate-fade-in-up">
          <p className="text-rose-500 uppercase tracking-[0.3em] text-xs mb-2">📍 Found</p>
          <h3 className="text-5xl font-serif font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
            Loubna ❤️
          </h3>
          <p className="mt-3 text-rose-700/80 italic">Soulmate located.</p>
        </div>
      ) : (
        <>
          <p className="mt-8 text-rose-700 font-semibold">Searching for your soulmate…</p>
          <p className="mt-2 text-rose-500 font-mono text-sm">{GPS_LOCATIONS[idx] ?? "..."}</p>
        </>
      )}
    </div>
  );
}

/* ============ 6. Love Password ============ */
function LovePasswordGame() {
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === "lingard") {
      setUnlocked(true);
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      setTimeout(() => setError(false), 600);
    }
  };

  if (unlocked) {
    return (
      <div className="relative min-h-[460px] flex flex-col items-center justify-center p-10 text-center overflow-hidden">
        <FloatingHearts count={30} />
        <div className="relative">
          <Heart className="w-28 h-28 text-rose-500 fill-rose-500 animate-heart-beat drop-shadow-[0_0_40px_rgba(244,63,94,.7)]" />
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 fill-yellow-300 animate-pulse" />
        </div>
        <h3 className="mt-6 text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
          Access granted to my heart ❤️
        </h3>
      </div>
    );
  }

  return (
    <div className="relative min-h-[460px] flex flex-col items-center justify-center p-10 text-center">
      <div className={`relative mb-6 ${error ? "animate-shake" : ""}`}>
        <Lock className="w-20 h-20 text-rose-600 drop-shadow-[0_0_20px_rgba(244,63,94,.5)]" />
      </div>
      <h3 className="text-2xl md:text-3xl font-serif font-bold text-rose-700">Enter the secret password</h3>
      <p className="text-rose-600/70 italic mt-2 text-sm">Only you know it.</p>

      <form onSubmit={submit} className="mt-6 flex flex-col gap-3 w-full max-w-sm">
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Password…"
          className={`px-5 py-3 rounded-2xl border-2 bg-white/80 text-rose-800 text-center text-lg focus:outline-none transition-colors ${error ? "border-red-400" : "border-pink-300 focus:border-rose-500"}`}
        />
        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold shadow-xl hover:scale-105 transition-transform">
          Unlock 🔓
        </button>
      </form>

      {attempts >= 2 && (
        <p className="mt-6 text-rose-500/80 text-sm italic animate-fade-in-up max-w-sm">
          💡 Hint: the password is what I called you for the first time…
        </p>
      )}
    </div>
  );
}

/* ============ Helpers ============ */
function FloatingHearts({ count = 20, color = "text-rose-400/60 fill-rose-400/50" }: { count?: number; color?: string }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 10 + Math.random() * 24,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
      })),
    [count]
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className={`absolute ${color}`}
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
            width: h.size,
            height: h.size,
            animation: `burst-up ${h.duration}s ease-out ${h.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        color: ["#f472b6", "#ec4899", "#db2777", "#fb7185", "#fde68a"][i % 5],
        rot: Math.random() * 360,
      })),
    []
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bits.map((b) => (
        <div
          key={b.id}
          className="absolute w-2 h-3 top-0"
          style={{
            left: `${b.left}%`,
            background: b.color,
            transform: `rotate(${b.rot}deg)`,
            animation: `confetti-fall ${2 + Math.random() * 2}s linear ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
