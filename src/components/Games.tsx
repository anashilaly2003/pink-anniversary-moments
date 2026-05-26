import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, X, Gamepad2, Sparkles, Lock, MapPin, Activity, Disc3, HeartCrack, Radar } from "lucide-react";

type GameId = "breakup" | "spin" | "scanner" | "gps" | "password";

const games: { id: GameId; title: string; tagline: string; icon: typeof Heart; color: string }[] = [
  { id: "breakup",  title: "Yes or No?",                tagline: "The trickiest love quiz",          icon: HeartCrack, color: "from-rose-400 to-pink-600" },
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
        {games.map((g, idx) => {
          const Icon = g.icon;
          return (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              style={{ animationDelay: `${idx * 0.08}s` }}
              className="group relative overflow-hidden rounded-3xl p-6 text-left bg-white/80 backdrop-blur-md border border-pink-200 shadow-xl hover:scale-[1.04] hover:-translate-y-1 hover:shadow-[0_25px_60px_-15px_rgba(244,63,94,0.45)] transition-all duration-500 ease-out animate-card-rise"
            >
              <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${g.color} opacity-20 group-hover:opacity-60 group-hover:scale-125 blur-2xl transition-all duration-700`} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--mx,_50%)_var(--my,_50%),rgba(255,255,255,.4),transparent_60%)] transition-opacity duration-500" />
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${g.color} text-white shadow-lg mb-4 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-rose-700">{g.title}</h3>
              <p className="text-sm text-rose-600/70 mt-1">{g.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-rose-500 text-sm font-semibold group-hover:gap-3 transition-all">
                Play <Heart className="w-3.5 h-3.5 fill-rose-500 group-hover:animate-heart-beat" />
              </span>
            </button>
          );
        })}
      </div>

      {active && (
        <Modal onClose={() => setActive(null)}>
          {active === "breakup"  && <YesNoGame />}
          {active === "spin"     && <SpinWheelGame />}
          {active === "scanner"  && <LoveMeterScanner />}
          {active === "gps"      && <LoveGPSGame />}
          {active === "password" && <LovePasswordGame />}
        </Modal>
      )}

      <style>{`
        @keyframes card-rise {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-card-rise { animation: card-rise 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) backwards; }
        @keyframes modal-in {
          0%   { opacity: 0; transform: scale(0.5) rotateX(35deg); filter: blur(20px); }
          60%  { opacity: 1; transform: scale(1.03) rotateX(-3deg); filter: blur(0); }
          100% { opacity: 1; transform: scale(1) rotateX(0); }
        }
        .animate-modal-in { animation: modal-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1); transform-origin: center; }
        @keyframes shockwave {
          0%   { transform: scale(0); opacity: 0.9; }
          100% { transform: scale(8); opacity: 0; }
        }
        @keyframes ecg-line {
          from { stroke-dashoffset: 1000; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes slot-roll {
          0%   { transform: translateY(0); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        @keyframes flash-white {
          0%, 100% { background-color: rgba(255,255,255,0); }
          50%      { background-color: rgba(255,255,255,0.9); }
        }
        .animate-flash { animation: flash-white 0.25s ease-out; }
        @keyframes glitch-x {
          0%, 100% { transform: translate(0,0); }
          20% { transform: translate(-3px, 1px); }
          40% { transform: translate(3px, -1px); }
          60% { transform: translate(-2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        @keyframes zoom-reveal {
          0%   { transform: scale(0); opacity: 0; letter-spacing: 1em; filter: blur(20px); }
          60%  { transform: scale(1.15); opacity: 1; letter-spacing: 0; filter: blur(0); }
          100% { transform: scale(1); }
        }
        .animate-zoom-reveal { animation: zoom-reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
        @keyframes rgb-split {
          0%, 100% { text-shadow: 2px 0 #f0f, -2px 0 #0ff; }
          50%      { text-shadow: -3px 0 #f0f, 3px 0 #0ff; }
        }
      `}</style>
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
        className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-br from-pink-50 to-rose-100 border-4 border-pink-200 shadow-2xl overflow-hidden animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white hover:rotate-90 transition-transform duration-300 shadow"
        >
          <X className="w-5 h-5 text-rose-700" />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ============ 1. Yes / No Game (mixed) ============ */
type YN = "yes" | "no";
const YN_QUESTIONS: { q: string; good: YN }[] = [
  { q: "Are we going to break up?",             good: "no"  },
  { q: "Do you love me?",                       good: "yes" },
  { q: "Will you stop loving me?",              good: "no"  },
  { q: "Am I your favorite person?",            good: "yes" },
  { q: "Do you want to leave me?",              good: "no"  },
  { q: "Should we stay together forever?",      good: "yes" },
  { q: "Will our story end one day?",           good: "no"  },
];

function YesNoGame() {
  const [step, setStep] = useState(0);
  const [badPos, setBadPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = YN_QUESTIONS[step];
  const goodIsYes = current.good === "yes";

  const dodge = () => {
    const c = containerRef.current;
    if (!c) return;
    const w = c.clientWidth, h = c.clientHeight;
    setBadPos({
      x: (Math.random() - 0.5) * w * 0.8,
      y: (Math.random() - 0.5) * h * 0.6,
    });
    setScale((s) => Math.max(0.4, s - 0.08));
  };

  const onGood = () => {
    if (step < YN_QUESTIONS.length - 1) {
      setStep((s) => s + 1);
      setBadPos({ x: 0, y: 0 });
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
        <h3 className="mt-6 text-5xl font-serif font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent animate-zoom-reveal">
          Impossible ❤️
        </h3>
        <p className="mt-3 text-rose-700/80 italic animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          You said the right thing every single time.
        </p>
      </div>
    );
  }

  const YesBtn = (
    <button
      onClick={goodIsYes ? onGood : undefined}
      onMouseEnter={goodIsYes ? undefined : dodge}
      onFocus={goodIsYes ? undefined : dodge}
      style={
        goodIsYes
          ? {}
          : {
              transform: `translate(${badPos.x}px, ${badPos.y}px) scale(${scale})`,
              transition: "transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
              filter: scale < 0.7 ? "blur(2px)" : "none",
              opacity: scale < 0.5 ? 0.5 : 1,
            }
      }
      className={
        goodIsYes
          ? "px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 to-rose-500 text-white font-bold shadow-2xl hover:scale-110 transition-transform"
          : "px-6 py-3 rounded-full bg-gray-200 text-gray-500 font-semibold shadow"
      }
    >
      {goodIsYes ? "💚 Yes" : "❌ Yes"}
    </button>
  );

  const NoBtn = (
    <button
      onClick={!goodIsYes ? onGood : undefined}
      onMouseEnter={!goodIsYes ? undefined : dodge}
      onFocus={!goodIsYes ? undefined : dodge}
      style={
        !goodIsYes
          ? {}
          : {
              transform: `translate(${badPos.x}px, ${badPos.y}px) scale(${scale})`,
              transition: "transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
              filter: scale < 0.7 ? "blur(2px)" : "none",
              opacity: scale < 0.5 ? 0.5 : 1,
            }
      }
      className={
        !goodIsYes
          ? "px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold shadow-2xl hover:scale-110 transition-transform"
          : "px-6 py-3 rounded-full bg-gray-200 text-gray-500 font-semibold shadow"
      }
    >
      {!goodIsYes ? "❤️ No" : "❌ No"}
    </button>
  );

  return (
    <div ref={containerRef} className="relative min-h-[420px] p-10 text-center overflow-hidden">
      <p className="text-rose-500 uppercase tracking-widest text-xs mb-4">Question {step + 1} / {YN_QUESTIONS.length}</p>
      <h3 key={step} className="text-3xl md:text-4xl font-serif font-bold text-rose-700 mb-12 animate-fade-in-up">
        {current.q}
      </h3>
      <div className="relative flex items-center justify-center gap-8 h-40">
        {YesBtn}
        {NoBtn}
      </div>
      <p className="absolute bottom-4 left-0 right-0 text-xs text-rose-500/70 italic">Pick wisely 💕</p>
    </div>
  );
}

/* ============ 2. Spin Wheel — cinematic reveal ============ */
function SpinWheelGame() {
  const segments = [5, 12, 25, 42, 69, 75];
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [stage, setStage] = useState<"idle" | "spin" | "calc" | "shatter" | "twist">("idle");
  const [calcText, setCalcText] = useState("");

  const spin = () => {
    if (stage !== "idle") return;
    setStage("spin");
    setSpinning(true);
    const turns = 6 + Math.random() * 3;
    const finalAngle = rotation + turns * 360 + Math.random() * 360;
    setRotation(finalAngle);
    setTimeout(() => { setSpinning(false); setRevealed(true); setStage("calc"); }, 4200);
  };

  // calculation sequence
  useEffect(() => {
    if (stage !== "calc") return;
    const messages = [
      "Calculating love…",
      "ERROR — number too small",
      "Recalculating…",
      "999%… 9999%… ∞%",
      "Wheel cannot contain this love.",
      "Breaking the wheel…",
    ];
    let i = 0;
    const id = setInterval(() => {
      setCalcText(messages[i]);
      i++;
      if (i >= messages.length) {
        clearInterval(id);
        setTimeout(() => setStage("shatter"), 700);
        setTimeout(() => setStage("twist"), 1700);
      }
    }, 600);
    return () => clearInterval(id);
  }, [stage]);

  const colors = ["#f472b6", "#ec4899", "#db2777", "#f9a8d4", "#fb7185", "#e11d48"];

  if (stage === "twist") {
    return (
      <div className="relative min-h-[480px] flex flex-col items-center justify-center p-10 text-center overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-fuchsia-100">
        <FloatingHearts count={40} />
        <Confetti />
        <div className="absolute inset-0 animate-flash" />
        <Heart className="w-28 h-28 text-rose-500 fill-rose-500 animate-heart-beat drop-shadow-[0_0_40px_rgba(244,63,94,0.7)]" />
        <h3 className="mt-6 text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent animate-zoom-reveal">
          Really? You waited for the spin?
        </h3>
        <p className="mt-4 text-xl text-rose-700 italic animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          I love you to the moon and back ❤️
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[480px] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
      {stage === "shatter" && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-rose-400" style={{ animation: "shockwave 1s ease-out forwards" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-pink-300" style={{ animation: "shockwave 1s ease-out 0.2s forwards" }} />
        </div>
      )}
      <h3 className="text-2xl md:text-3xl font-serif font-bold text-rose-700 mb-2">How much I love you</h3>
      <p className="text-rose-600/70 mb-6 italic text-sm min-h-[1.25rem]">
        {stage === "calc" ? calcText : "Spin to find out…"}
      </p>

      <div className={`relative w-72 h-72 transition-all duration-700 ${stage === "shatter" ? "scale-0 opacity-0 rotate-180 blur-xl" : ""}`}>
        <div className="absolute inset-0 rounded-full blur-2xl bg-pink-400/40 animate-pulse" />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-rose-700 z-10" />
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.2, 1)" : "none",
            animation: stage === "calc" ? "glitch-x 0.18s infinite" : undefined,
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
        disabled={stage !== "idle"}
        className="mt-8 px-10 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold shadow-xl hover:scale-105 transition-transform disabled:opacity-60"
      >
        {stage === "idle" ? "Spin" : stage === "spin" ? "Spinning…" : "Wait for it…"}
      </button>
    </div>
  );
}

/* ============ 3. Love Meter Scanner — hacker terminal, infinite ============ */
const HACKER_LINES = [
  "Bypassing emotional firewall…",
  "Decrypting heart signal…",
  "Injecting devotion payload…",
  "Heartbeat sync: ESTABLISHED",
  "Memory dump: 1826 happy days",
  "Affection node compromised",
  "Loyalty index: OFF THE CHARTS",
  "Smile recognition: SUCCESS",
  "Soulmate handshake: OK",
  "WARN: cuteness overload",
  "Cross-referencing kiss database…",
  "WARN: stack overflow in heart.dll",
  "Tunneling through trust layer…",
  "Patch applied: forever.exe",
  "Synchronizing dreams… 100%",
  "ALERT: love.exe consumed all RAM",
  "Recompiling promises…",
  "Pinging soulmate@loubna.love",
  "Reply received in 0.0001ms",
  "Cache: 5 years of memories",
  "Backdoor: TRUE LOVE FOUND",
  "Heartbeat encryption: AES-LOVE-512",
  "WARN: meter exploded",
  "WARN: meter re-exploded",
  "Bypassing universe limits…",
];

function LoveMeterScanner() {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>(["> boot LOVE METER v6.71"]);
  const [phase, setPhase] = useState<"scan" | "explode" | "final">("scan");
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "scan") return;
    let p = 0;
    let lineIdx = 0;

    const tick = () => {
      // bigger increments → faster overall run
      const inc = p < 100 ? 4 + p * 0.05 : 6 + (p - 100) / 20;
      p += inc;
      if (p >= 671) {
        setProgress(671);
        setPhase("explode");
        return;
      }
      setProgress(Math.round(p));

      const msg = HACKER_LINES[lineIdx % HACKER_LINES.length];
      const prefix = p > 250 ? (p > 450 ? "[CRIT]" : "[WARN]") : "[ OK ]";
      setLines((prev) => {
        const next = [...prev, `> ${prefix} ${msg} (${Math.round(p)}%)`];
        return next.length > 40 ? next.slice(next.length - 40) : next;
      });
      lineIdx++;

      // faster vibration cadence overall
      const delay = Math.max(25, 110 - p * 0.18);
      timer = window.setTimeout(tick, delay);
    };
    let timer = window.setTimeout(tick, 120);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (linesRef.current) linesRef.current.scrollTop = linesRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (phase === "explode") {
      const t = setTimeout(() => setPhase("final"), 1800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "final") {
    return (
      <div className="relative min-h-[520px] flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-rose-950 via-pink-900 to-rose-800 text-white overflow-hidden">
        <FloatingHearts count={50} color="text-rose-300/60 fill-rose-300/40" />
        <Heart className="w-32 h-32 text-rose-400 fill-rose-400 animate-heart-beat drop-shadow-[0_0_60px_rgba(244,63,94,0.9)] animate-zoom-reveal" />
        <div className="mt-6 px-6 py-4 rounded-2xl border border-rose-400/50 bg-black/40 font-mono animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-red-400 text-2xl font-bold" style={{ animation: "rgb-split 0.6s infinite" }}>SYSTEM OVERLOAD ❤️</p>
          <p className="mt-2 text-pink-100">Love level: ∞ — exceeds all measurable limits</p>
        </div>
      </div>
    );
  }

  // intensity 0..1 — ramps up after the bar fills toward 100%
  const t = Math.min(1, Math.max(0, (progress - 50) / (671 - 50)));
  const shakeMagnitude = 2 + t * 18;
  const shakeDur = 0.4 - t * 0.35;
  const barPct = Math.min(100, progress);
  const barMaxed = progress >= 100;

  return (
    <div
      className="relative min-h-[520px] p-6 bg-gradient-to-br from-rose-950 via-pink-950 to-black text-pink-100 font-mono overflow-hidden"
      style={{
        animation: `meter-shake ${Math.max(0.05, shakeDur)}s linear infinite`,
        // @ts-expect-error custom var
        "--sm": `${shakeMagnitude}px`,
      }}
    >
      <style>{`
        @keyframes meter-shake {
          0%,100% { transform: translate(0,0) rotate(0); }
          25% { transform: translate(calc(var(--sm) * -1), calc(var(--sm) * 0.4)) rotate(-0.6deg); }
          50% { transform: translate(var(--sm), calc(var(--sm) * -0.4)) rotate(0.6deg); }
          75% { transform: translate(calc(var(--sm) * -0.6), var(--sm)) rotate(-0.4deg); }
        }
        @keyframes shimmer {
          0% { background-position: -50% 0; }
          100% { background-position: 150% 0; }
        }
      `}</style>

      {phase === "explode" && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="absolute inset-0 bg-white animate-flash" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-rose-400" style={{ animation: "shockwave 1.4s ease-out forwards" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-pink-300" style={{ animation: "shockwave 1.4s ease-out 0.2s forwards" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-fuchsia-400" style={{ animation: "shockwave 1.4s ease-out 0.4s forwards" }} />
          <Confetti />
        </div>
      )}

      <FloatingHearts count={20} color="text-rose-400/30 fill-rose-400/20" />
      <div className="relative z-10">
        <h3 className="text-center text-xl tracking-[0.3em] text-pink-300 mb-2" style={{ animation: t > 0.5 ? "rgb-split 0.3s infinite" : undefined }}>
          LOVE METER v6.71
        </h3>
        <p className="text-center text-pink-400/80 text-xs mb-6">// running unauthorized affection.exe</p>

        <div className="relative w-full h-6 rounded-full bg-pink-950 border border-pink-500/40 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-fuchsia-300 transition-all duration-100"
            style={{
              width: `${barPct}%`,
              boxShadow: `0 0 ${10 + t * 40}px rgba(244,63,94,${0.5 + t * 0.5})`,
            }}
          />
          {barMaxed && (
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)] bg-[length:50%_100%] animate-[shimmer_1.1s_linear_infinite]" />
          )}
        </div>
        {barMaxed && (
          <p className="text-center text-[10px] tracking-[0.3em] text-rose-300/80 mt-1 font-mono">
            ⚠ BAR LIMIT REACHED — VALUE STILL CLIMBING
          </p>
        )}
        <p
          className="text-center mt-2 text-3xl font-bold tabular-nums"
          style={{
            color: t > 0.6 ? "#fda4af" : "#fbcfe8",
            textShadow: `0 0 ${10 + t * 30}px rgba(244,63,94,${0.5 + t * 0.5})`,
            animation: t > 0.7 ? "rgb-split 0.2s infinite" : undefined,
          }}
        >
          {progress}%
        </p>

        <div
          ref={linesRef}
          className="mt-6 h-56 overflow-hidden rounded-lg border border-pink-500/30 bg-black/60 p-4 text-xs leading-relaxed"
        >
          {lines.map((l, i) => (
            <div key={i} className={l.includes("[CRIT]") ? "text-red-400" : l.includes("[WARN]") ? "text-yellow-300" : "text-emerald-300"}>
              {l}
            </div>
          ))}
          <span className="inline-block w-2 h-3 bg-pink-300 animate-pulse ml-1" />
        </div>
      </div>
    </div>
  );
}

/* ============ 4. Love GPS — radar + ECG ============ */
type GPSStep = { label: string; bpm: number; tier: "country" | "city" | "quartier" | "found" };
const GPS_SEQUENCE: GPSStep[] = [
  { label: "France",       bpm: 72, tier: "country" },
  { label: "Japan",        bpm: 74, tier: "country" },
  { label: "USA",          bpm: 73, tier: "country" },
  { label: "Brazil",       bpm: 75, tier: "country" },
  { label: "Morocco 🇲🇦",  bpm: 92, tier: "country" },
  { label: "Casablanca",   bpm: 95, tier: "city" },
  { label: "Rabat",        bpm: 96, tier: "city" },
  { label: "Marrakech",    bpm: 98, tier: "city" },
  { label: "Fes",          bpm: 100, tier: "city" },
  { label: "Tangier",      bpm: 120, tier: "city" },
  { label: "Dradeb",       bpm: 124, tier: "quartier" },
  { label: "Iberya",       bpm: 128, tier: "quartier" },
  { label: "Branes",       bpm: 132, tier: "quartier" },
  { label: "Mesnana",      bpm: 137, tier: "quartier" },
  { label: "Drissiya",     bpm: 142, tier: "quartier" },
  { label: "Merchan",      bpm: 148, tier: "quartier" },
  { label: "Mghogha 💗",   bpm: 175, tier: "found" },
];

function LoveGPSGame() {
  const [idx, setIdx] = useState(0);
  const [found, setFound] = useState(false);

  useEffect(() => {
    if (idx >= GPS_SEQUENCE.length) {
      const t = setTimeout(() => setFound(true), 1400);
      return () => clearTimeout(t);
    }
    const step = GPS_SEQUENCE[idx];
    // Slower overall + dramatic dwell on the "getting warmer" hits
    const isMorocco = step.label.startsWith("Morocco");
    const isTangier = step.label === "Tangier";
    const isMghogha = step.label.startsWith("Mghogha");
    const delay =
      isMghogha ? 2600 :
      isTangier ? 2200 :
      isMorocco ? 2000 :
      step.tier === "quartier" ? 1500 :
      step.tier === "city"     ? 1600 :
                                 1500;
    const t = setTimeout(() => setIdx((i) => i + 1), delay);
    return () => clearTimeout(t);
  }, [idx]);

  const current = GPS_SEQUENCE[Math.min(idx, GPS_SEQUENCE.length - 1)];
  const bpm = current.bpm;
  const tier = current.tier;
  const isMorocco = current.label.startsWith("Morocco");
  const isTangier = current.label === "Tangier";
  const isMghogha = current.label.startsWith("Mghogha");
  const lockOn = isMorocco || isTangier || isMghogha;
  const tierLabel =
    isMghogha          ? "💗 SOULMATE LOCATED" :
    isTangier          ? "🎯 LOCK ACQUIRED — homing in" :
    isMorocco          ? "🔥 SIGNAL FOUND — getting warmer" :
    tier === "country" ? "🌍 Scanning countries" :
    tier === "city"    ? "🏙️ Scanning cities of Morocco" :
    tier === "quartier"? "📍 Scanning Tangier quarters" :
                         "💗 Soulmate detected";

  // ECG generation — denser & taller as bpm grows
  const ecgPath = useMemo(() => buildEcgPath(bpm), [bpm]);
  const beatDuration = Math.max(0.32, 60 / bpm); // seconds per beat

  if (found) {
    return (
      <div className="relative min-h-[520px] flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-rose-100 to-pink-200 overflow-hidden">
        <FloatingHearts count={40} />
        <Confetti />
        <div className="relative animate-zoom-reveal">
          <Heart className="w-28 h-28 text-rose-500 fill-rose-500 animate-heart-beat drop-shadow-[0_0_40px_rgba(244,63,94,.8)]" />
        </div>
        <p className="mt-6 text-rose-500 uppercase tracking-[0.3em] text-xs">📍 Soulmate Located</p>
        <h3 className="mt-2 text-6xl font-serif font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent animate-zoom-reveal" style={{ animationDelay: "0.4s" }}>
          Loubna ❤️
        </h3>
        <p className="mt-3 text-rose-700/80 italic animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
          Mghogha, Tangier — exactly where my heart lives.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative min-h-[560px] flex flex-col items-center p-6 overflow-hidden transition-colors duration-500 ${lockOn ? "bg-gradient-to-br from-rose-200 via-pink-300 to-fuchsia-200" : "bg-gradient-to-br from-rose-100 to-pink-200"}`}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(244,63,94,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(244,63,94,.25) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      {lockOn && (
        <div className="absolute inset-0 pointer-events-none animate-flash" />
      )}

      <p className={`relative z-10 uppercase tracking-[0.3em] text-[10px] mb-2 mt-2 transition-all ${lockOn ? "text-rose-700 font-bold text-xs" : "text-rose-500"}`}>
        {tierLabel}
      </p>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-center">
        {/* RADAR */}
        <div className="flex flex-col items-center">
          <div
            className={`relative w-56 h-56 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${lockOn ? "border-rose-600 scale-110" : "border-rose-400/60"}`}
            style={{
              boxShadow: lockOn
                ? `0 0 ${isMghogha ? 120 : isTangier ? 90 : 70}px rgba(244,63,94,.9), inset 0 0 40px rgba(244,63,94,.4)`
                : "0 0 60px rgba(244,63,94,.5)",
              background: lockOn ? "rgba(255,200,210,.6)" : "rgba(255,228,235,.5)",
            }}
          >
            <div className="absolute inset-3 rounded-full border-2 border-rose-400/40" />
            <div className="absolute inset-8 rounded-full border-2 border-rose-400/30" />
            {lockOn && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-rose-500/70" style={{ animation: "shockwave 1.4s ease-out infinite" }} />
                <div className="absolute inset-0 rounded-full border-2 border-rose-400/60" style={{ animation: "shockwave 1.4s ease-out 0.5s infinite" }} />
              </>
            )}
            <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, transparent 70%, rgba(244,63,94,.6) 100%)", animation: `spin-slow ${Math.max(0.4, 2 - (bpm - 70) / 80)}s linear infinite` }} />
            {tier === "found" || isMghogha ? (
              <MapPin className="w-20 h-20 text-rose-600 fill-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,1)] relative z-10 animate-heart-beat" />
            ) : lockOn ? (
              <MapPin className="w-14 h-14 text-rose-600 fill-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,.9)] relative z-10 animate-heart-beat" />
            ) : (
              <Radar className="w-12 h-12 text-rose-500 animate-pulse relative z-10" />
            )}
          </div>
          <div
            key={current.label}
            className={`mt-4 px-4 py-2 rounded-full border shadow font-mono animate-fade-in-up ${lockOn ? "bg-rose-600 border-rose-700 text-white text-base font-bold tracking-wider shadow-[0_0_30px_rgba(244,63,94,.7)]" : "bg-white/70 border-rose-200 text-rose-600 text-sm"}`}
            style={lockOn ? { animation: "fade-in-up 0.4s ease-out, heart-beat 1s ease-in-out infinite" } : undefined}
          >
            {lockOn && "📍 "}{current.label}
          </div>
        </div>

        {/* ECG */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-xs rounded-2xl bg-black p-3 shadow-xl border-2 border-rose-400/60">
            <div className="flex items-center justify-between mb-1 text-[10px] font-mono">
              <span className="text-emerald-300 tracking-widest">♥ HR MONITOR</span>
              <span className="text-rose-300 tabular-nums">{bpm} BPM</span>
            </div>
            <svg viewBox="0 0 300 100" className="w-full h-24 bg-[radial-gradient(circle,#022,#000)] rounded">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0f3" strokeOpacity="0.15" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="300" height="100" fill="url(#grid)" />
              <path
                key={bpm}
                d={ecgPath}
                fill="none"
                stroke="#4ade80"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{
                  filter: "drop-shadow(0 0 4px #4ade80)",
                  strokeDasharray: 1000,
                  animation: `ecg-line ${Math.max(1.2, 3 - (bpm - 70) / 60)}s linear infinite`,
                }}
              />
            </svg>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Heart
              className="w-10 h-10 text-rose-500 fill-rose-500"
              style={{
                animation: `heart-beat ${beatDuration}s ease-in-out infinite`,
                filter: `drop-shadow(0 0 ${4 + (bpm - 70) / 4}px rgba(244,63,94,${0.4 + Math.min(0.5, (bpm - 70) / 200)}))`,
              }}
            />
            <span className="font-mono text-rose-700 text-sm">{bpm} bpm</span>
          </div>
        </div>
      </div>

      <p className={`relative z-10 mt-6 font-semibold italic transition-all duration-300 ${lockOn ? "text-rose-700 text-xl tracking-wide animate-heart-beat" : "text-rose-700/80"}`}>
        {isMghogha ? "💗 She's right here." : isTangier ? "Closing in on her neighborhood…" : isMorocco ? "Heart racing — she's in this country!" : "Searching for your soulmate…"}
      </p>
    </div>
  );
}

function buildEcgPath(bpm: number): string {
  // build a periodic ECG-like waveform across 0..300
  const beats = Math.max(3, Math.round(bpm / 18));
  const spacing = 300 / beats;
  const amp = 12 + Math.min(28, (bpm - 70) * 0.6); // taller QRS with higher bpm
  let d = "M 0 50";
  for (let i = 0; i < beats; i++) {
    const x = i * spacing;
    // baseline → small p → flat → QRS spike → small t → baseline
    d += ` L ${x + spacing * 0.15} 50`;
    d += ` L ${x + spacing * 0.22} 46`;
    d += ` L ${x + spacing * 0.28} 50`;
    d += ` L ${x + spacing * 0.42} 50`;
    d += ` L ${x + spacing * 0.46} 60`;
    d += ` L ${x + spacing * 0.5}  ${50 - amp}`;
    d += ` L ${x + spacing * 0.54} ${50 + amp * 0.5}`;
    d += ` L ${x + spacing * 0.58} 50`;
    d += ` L ${x + spacing * 0.72} 50`;
    d += ` L ${x + spacing * 0.78} 47`;
    d += ` L ${x + spacing * 0.84} 50`;
    d += ` L ${x + spacing} 50`;
  }
  return d;
}

/* ============ 5. Love Password — decrypt sequence ============ */
function LovePasswordGame() {
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState(false);
  const [stage, setStage] = useState<"input" | "decrypt" | "unlocked">("input");
  const [decryptLines, setDecryptLines] = useState<string[]>([]);

  const hints = [
    "💡 Hint: the password is what I called you for the first time…",
    "💡 Hint: a footballer's name — you'll get it 😉",
    "💡 Hint: 7 letters, starts with L.",
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === "lingard") {
      setStage("decrypt");
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      setTimeout(() => setError(false), 600);
    }
  };

  useEffect(() => {
    if (stage !== "decrypt") return;
    const seq = [
      "🔐 Verifying key…",
      "🔑 Key accepted.",
      "💞 Decrypting heart vault…",
      "🧬 Matching DNA: 100%",
      "🌹 Releasing love…",
      "✅ Access granted.",
    ];
    let i = 0;
    const id = setInterval(() => {
      setDecryptLines((p) => [...p, seq[i]]);
      i++;
      if (i >= seq.length) {
        clearInterval(id);
        setTimeout(() => setStage("unlocked"), 700);
      }
    }, 380);
    return () => clearInterval(id);
  }, [stage]);

  if (stage === "unlocked") {
    return (
      <div className="relative min-h-[460px] flex flex-col items-center justify-center p-10 text-center overflow-hidden">
        <FloatingHearts count={40} />
        <Confetti />
        <div className="absolute inset-0 animate-flash" />
        <div className="relative animate-zoom-reveal">
          <Heart className="w-28 h-28 text-rose-500 fill-rose-500 animate-heart-beat drop-shadow-[0_0_40px_rgba(244,63,94,.7)]" />
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 fill-yellow-300 animate-pulse" />
        </div>
        <h3 className="mt-6 text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent animate-zoom-reveal" style={{ animationDelay: "0.3s" }}>
          Access granted to my heart ❤️
        </h3>
        <p className="mt-3 text-rose-700/80 italic animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          You always knew the way in.
        </p>
      </div>
    );
  }

  if (stage === "decrypt") {
    return (
      <div className="relative min-h-[460px] flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-rose-950 via-pink-900 to-rose-800 text-pink-100">
        <Lock className="w-16 h-16 text-pink-200 mb-4 animate-pulse" />
        <div className="w-full max-w-sm rounded-xl bg-black/50 border border-pink-400/30 p-4 font-mono text-left text-sm">
          {decryptLines.map((l, i) => (
            <div key={i} className="text-emerald-300 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              &gt; {l}
            </div>
          ))}
          <span className="inline-block w-2 h-3 bg-pink-300 animate-pulse ml-1" />
        </div>
      </div>
    );
  }

  const strength = Math.min(value.length / 7, 1) * 100;

  return (
    <div className="relative min-h-[460px] flex flex-col items-center justify-center p-10 text-center">
      <div className={`relative mb-6 transition-transform duration-300 ${error ? "animate-shake" : ""}`}>
        <Lock className="w-20 h-20 text-rose-600 drop-shadow-[0_0_20px_rgba(244,63,94,.5)]" />
        <div className="absolute -inset-4 rounded-full border-2 border-rose-300/40 animate-pulse" />
      </div>
      <h3 className="text-2xl md:text-3xl font-serif font-bold text-rose-700">Enter the secret password</h3>
      <p className="text-rose-600/70 italic mt-2 text-sm">Only you know it.</p>

      <form onSubmit={submit} className="mt-6 flex flex-col gap-3 w-full max-w-sm">
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Password…"
          autoFocus
          className={`px-5 py-3 rounded-2xl border-2 bg-white/80 text-rose-800 text-center text-lg tracking-widest focus:outline-none transition-all duration-300 ${error ? "border-red-400 bg-red-50" : "border-pink-300 focus:border-rose-500 focus:scale-[1.02]"}`}
        />
        <div className="h-1.5 rounded-full bg-pink-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-fuchsia-500 transition-all duration-300"
            style={{ width: `${strength}%` }}
          />
        </div>
        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold shadow-xl hover:scale-105 transition-transform">
          Unlock 🔓
        </button>
      </form>

      {attempts > 0 && (
        <p className="mt-6 text-rose-500/80 text-sm italic animate-fade-in-up max-w-sm">
          {hints[Math.min(attempts - 1, hints.length - 1)]}
        </p>
      )}
      {attempts > 0 && (
        <p className="mt-2 text-rose-400/70 text-xs">Attempts: {attempts}</p>
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
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        color: ["#f472b6", "#ec4899", "#db2777", "#fb7185", "#fde68a", "#a78bfa"][i % 6],
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
