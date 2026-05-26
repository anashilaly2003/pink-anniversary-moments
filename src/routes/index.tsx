import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Heart, Mail, X, Sparkles, Calendar, Music2, Gift, Star } from "lucide-react";
import { GamesSection } from "@/components/Games";
// ⬇️ REPLACE these placeholder photos in src/assets/
import photo1 from "@/assets/photo1.jpg";
import photo2 from "@/assets/photo2.jpg";
import photo3 from "@/assets/photo3.jpg";
import photo4 from "@/assets/photo4.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

// 📅 ⬇️ CHANGE THE START DATE OF YOUR RELATIONSHIP HERE
const RELATIONSHIP_START = new Date("2021-05-26");

// 💌 Love messages — edit freely
const loveMessages = [
  { title: "5 years already 💕", text: "Every day by your side is a blessing. Thank you for lighting up my life for 5 years." },
  { title: "My soulmate", text: "You are the most beautiful thing that ever happened to me. I love you more than words can say." },
  { title: "Forever", text: "With you, every moment becomes a precious memory. I want to write a thousand more chapters together." },
  { title: "My smile", text: "You are the first thought of the morning and the last of the night. My heart belongs to you." },
  { title: "My refuge", text: "In your arms, I found my home. Thank you for being you — simply and beautifully." },
  { title: "You & Me", text: "Five years of laughter, adventures and love. And this is only the beginning of our story." },
  { title: "My muse", text: "You make every day special. I love you today, tomorrow and always. 💖" },
  { title: "My treasure", text: "If I had to start my life over, I would search for you sooner — to love you longer." },
  { title: "Our first time", text: "I still remember your look that day. My heart already knew." },
  { title: "Your voice", text: "Your voice is my favorite melody — the one that calms all my storms." },
  { title: "Your scent", text: "A thousand times I would breathe you in, a thousand times I would fall in love." },
  { title: "My dreams", text: "All my dreams begin and end with you. You are my most beautiful project." },
  { title: "Our stars", text: "If every star was an 'I love you', the sky still wouldn't be big enough." },
  { title: "My promise", text: "I promise to love you in the light and in the shadow. For life." },
  { title: "My happiness", text: "Happiness isn't a destination. It's you, by my side." },
  { title: "Happy anniversary 🎉", text: "5 years. And I want a thousand more. Happy anniversary, my love. You are my life." },
];

// ⏳ Timeline — edit these chapters
const timeline = [
  { year: "Year 1", emoji: "💞", title: "The encounter", text: "Love at first sight. It all began." },
  { year: "Year 2", emoji: "🏡", title: "Our nest", text: "First home, first memories." },
  { year: "Year 3", emoji: "✈️", title: "Adventures", text: "Trips, discoveries, laughter." },
  { year: "Year 4", emoji: "💍", title: "Promises", text: "Stronger than ever, hand in hand." },
  { year: "Year 5", emoji: "🌹", title: "Today", text: "And this is just the beginning..." },
];

// Scattered envelope positions
const envelopePositions = [
  { top: "5%", left: "4%", rotate: -12, anim: "envelope-float-a" },
  { top: "8%", left: "85%", rotate: 14, anim: "envelope-swing" },
  { top: "18%", left: "48%", rotate: 6, anim: "envelope-float-b" },
  { top: "22%", left: "12%", rotate: 18, anim: "envelope-wobble" },
  { top: "28%", left: "92%", rotate: -10, anim: "envelope-float-a" },
  { top: "38%", left: "3%", rotate: 8, anim: "envelope-swing" },
  { top: "42%", left: "70%", rotate: -16, anim: "envelope-wobble" },
  { top: "48%", left: "30%", rotate: 12, anim: "envelope-float-b" },
  { top: "55%", left: "90%", rotate: -8, anim: "envelope-float-a" },
  { top: "62%", left: "6%", rotate: 18, anim: "envelope-wobble" },
  { top: "68%", left: "55%", rotate: -14, anim: "envelope-swing" },
  { top: "74%", left: "82%", rotate: 10, anim: "envelope-float-b" },
  { top: "80%", left: "20%", rotate: -6, anim: "envelope-float-a" },
  { top: "86%", left: "60%", rotate: 14, anim: "envelope-wobble" },
  { top: "92%", left: "8%", rotate: -10, anim: "envelope-swing" },
  { top: "94%", left: "88%", rotate: 12, anim: "envelope-float-b" },
];

function useTimeTogether() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const diff = now.getTime() - RELATIONSHIP_START.getTime();
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Envelope({
  position,
  index,
  onClick,
  opened,
}: {
  position: (typeof envelopePositions)[number];
  index: number;
  onClick: () => void;
  opened: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`Open love letter ${index + 1}`}
      className="absolute z-40 group cursor-pointer transition-all duration-300 hover:scale-150 focus:outline-none"
      style={{
        top: position.top,
        left: position.left,
        animation: `${position.anim} ${4 + (index % 4)}s ease-in-out ${index * 0.15}s infinite`,
      }}
    >
      <div className="relative" style={{ transform: `rotate(${position.rotate}deg)` }}>
        <div className="absolute inset-0 bg-pink-400/50 blur-2xl rounded-full group-hover:bg-rose-500/70 transition-colors" />
        <div
          className={`relative p-3 md:p-4 rounded-lg shadow-2xl border-2 transition-all duration-500 ${
            opened
              ? "bg-gradient-to-br from-rose-200 to-pink-300 border-rose-300 opacity-70"
              : "bg-gradient-to-br from-pink-300 via-rose-400 to-pink-500 border-pink-100 group-hover:from-rose-400 group-hover:to-rose-600"
          }`}
        >
          <Mail className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow-md group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
          <Heart className="absolute -top-2 -right-2 w-5 h-5 text-rose-600 fill-rose-500 animate-heart-beat drop-shadow" />
          {opened && <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-yellow-400 fill-yellow-300" />}
        </div>
      </div>
    </button>
  );
}

function HeartBurst() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        angle: (i / 14) * Math.PI * 2,
        distance: 120 + Math.random() * 80,
        size: 16 + Math.random() * 16,
        delay: Math.random() * 0.1,
      })),
    []
  );
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="absolute text-rose-500 fill-rose-500"
          style={{
            width: h.size,
            height: h.size,
            animation: `burst 1s ease-out ${h.delay}s forwards`,
            // @ts-expect-error custom CSS vars
            "--tx": `${Math.cos(h.angle) * h.distance}px`,
            "--ty": `${Math.sin(h.angle) * h.distance}px`,
          }}
        />
      ))}
    </div>
  );
}

/** Client-only random background — avoids SSR hydration mismatch */
function BackgroundDecor() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const items = useMemo(() => {
    if (!mounted) return { hearts: [], petals: [] };
    return {
      hearts: Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        w: 10 + Math.random() * 22,
        h: 10 + Math.random() * 22,
        dur: 6 + Math.random() * 8,
        delay: Math.random() * 5,
      })),
      petals: Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        top: Math.random() * 20,
        left: Math.random() * 100,
        dur: 10 + Math.random() * 10,
        delay: Math.random() * 8,
      })),
    };
  }, [mounted]);

  if (!mounted) return <div className="fixed inset-0 pointer-events-none z-0" aria-hidden />;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {items.hearts.map((h) => (
        <Heart
          key={`h-${h.id}`}
          className="absolute text-pink-300/40 fill-pink-300/30"
          style={{
            top: `${h.top}%`,
            left: `${h.left}%`,
            width: `${h.w}px`,
            height: `${h.h}px`,
            animation: `float ${h.dur}s ease-in-out ${h.delay}s infinite`,
          }}
        />
      ))}
      {items.petals.map((p) => (
        <div
          key={`p-${p.id}`}
          className="absolute w-3 h-3 rounded-full bg-pink-300/60"
          style={{
            top: `-${p.top}%`,
            left: `${p.left}%`,
            animation: `petal-fall ${p.dur}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Index() {
  const [openMessage, setOpenMessage] = useState<number | null>(null);
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const [musicOn, setMusicOn] = useState(false);
  const [wish, setWish] = useState("");
  const [wishSent, setWishSent] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const time = useTimeTogether();

  const photos = [photo1, photo2, photo3, photo4];

  const handleOpen = (i: number) => {
    setOpenMessage(i);
    setOpened((prev) => new Set(prev).add(i));
  };

  const progress = (opened.size / envelopePositions.length) * 100;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200">
      <BackgroundDecor />

      {/* Scattered envelopes */}
      {envelopePositions.map((pos, i) => (
        <Envelope key={i} position={pos} index={i} opened={opened.has(i)} onClick={() => handleOpen(i)} />
      ))}

      {/* Progress bar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 bg-white/70 backdrop-blur-md px-5 py-2 rounded-full shadow-lg border border-pink-200 flex items-center gap-3">
        <Gift className="w-4 h-4 text-rose-500" />
        <div className="w-32 h-2 bg-pink-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs text-rose-700 font-semibold">{opened.size}/{envelopePositions.length}</span>
      </div>

      {/* Music toggle */}
      <button
        onClick={() => setMusicOn((m) => !m)}
        className="fixed top-4 right-4 z-30 bg-white/70 backdrop-blur-md p-3 rounded-full shadow-lg border border-pink-200 hover:scale-110 transition-transform"
        aria-label="Toggle music"
      >
        <Music2 className={`w-5 h-5 text-rose-500 ${musicOn ? "animate-spin-slow" : ""}`} />
      </button>

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center">
        <div className="mb-6 flex items-center gap-3 animate-fade-in-up">
          <Heart className="w-7 h-7 text-rose-500 fill-rose-500 animate-heart-beat" />
          <span className="text-rose-600 font-medium tracking-[0.3em] uppercase text-xs md:text-sm">Our story</span>
          <Heart className="w-7 h-7 text-rose-500 fill-rose-500 animate-heart-beat" />
        </div>

        <h1 className="text-6xl md:text-9xl font-serif font-bold mb-4 animate-shimmer bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-sm">
          5 years of love
        </h1>
        <p className="text-lg md:text-2xl text-rose-700/80 max-w-2xl mb-10 italic animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Five years of you, of us, of magic. Click the envelopes scattered around you to discover my love notes 💌
        </p>

        {/* Live counter */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          {[
            { label: "Days", value: time.days },
            { label: "Hours", value: time.hours },
            { label: "Minutes", value: time.minutes },
            { label: "Seconds", value: time.seconds },
          ].map((u) => (
            <div key={u.label} className="bg-white/70 backdrop-blur-md rounded-2xl px-3 md:px-6 py-3 md:py-4 shadow-xl border border-pink-200 min-w-[70px] md:min-w-[110px]">
              <div className="text-2xl md:text-4xl font-bold text-rose-600 tabular-nums">{u.value.toString().padStart(2, "0")}</div>
              <div className="text-[10px] md:text-xs text-rose-500/80 uppercase tracking-widest">{u.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
          className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-semibold shadow-2xl hover:scale-110 hover:shadow-rose-300 transition-all duration-300 flex items-center gap-2 animate-fade-in-up"
          style={{ animationDelay: "0.7s" }}
        >
          <Heart className="w-5 h-5 fill-white" />
          Discover our story
        </button>

        <p className="mt-12 text-rose-500/80 text-sm animate-pulse">
          ✨ Open all {envelopePositions.length} envelopes to read every love note ✨
        </p>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-center text-rose-700 mb-3">Our memories</h2>
        <p className="text-center text-rose-600/70 mb-12 italic">A few moments frozen forever</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {photos.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(src)}
              className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl border-4 border-white hover:scale-105 transition-all duration-500 group"
              style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
            >
              <img src={src} alt={`Memory ${i + 1}`} width={512} height={512} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                <Heart className="w-8 h-8 text-white fill-white animate-heart-beat" />
              </div>
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-rose-400/70 mt-6">
          💡 Replace the photos in <code className="bg-white/60 px-2 py-1 rounded">src/assets/</code>
        </p>
      </section>

      {/* GAMES */}
      <GamesSection />

      {/* TIMELINE */}
      <section className="relative z-10 px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-center text-rose-700 mb-3">Our journey</h2>
        <p className="text-center text-rose-600/70 mb-16 italic">5 chapters, a thousand memories</p>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-300 -translate-x-1/2 rounded-full" />
          {timeline.map((step, i) => (
            <div key={i} className={`relative flex items-center mb-10 ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
              <div className={`w-[45%] bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-pink-200 hover:scale-105 transition-transform ${i % 2 === 0 ? "mr-auto text-right" : "ml-auto text-left"}`}>
                <div className="text-3xl mb-1">{step.emoji}</div>
                <div className="text-xs uppercase tracking-widest text-rose-500 font-semibold">{step.year}</div>
                <h3 className="text-xl font-serif font-bold text-rose-700 mt-1">{step.title}</h3>
                <p className="text-rose-600/80 text-sm mt-1">{step.text}</p>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-rose-500 rounded-full border-4 border-white shadow-lg animate-heart-beat" />
            </div>
          ))}
        </div>
      </section>

      {/* WISH */}
      <section className="relative z-10 px-6 py-20 max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-white/80 to-pink-50/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-200 text-center">
          <Star className="w-12 h-12 text-rose-500 fill-rose-400 mx-auto mb-4 animate-spin-slow" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-700 mb-3">Make a wish for us</h2>
          <p className="text-rose-600/80 mb-6">Write your wish for the next 5 years 💫</p>
          {wishSent ? (
            <div className="py-6 animate-fade-in-up">
              <Heart className="w-16 h-16 mx-auto text-rose-500 fill-rose-500 animate-heart-beat" />
              <p className="mt-4 text-rose-700 font-semibold italic">Wish sent to the stars ✨ "{wish}"</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="My wish is..."
                rows={3}
                className="w-full p-4 rounded-2xl border-2 border-pink-200 bg-white/70 focus:border-rose-400 focus:outline-none text-rose-700 resize-none"
              />
              <button
                disabled={!wish.trim()}
                onClick={() => setWishSent(true)}
                className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-semibold shadow-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send my wish 💖
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 text-center py-10 text-rose-600/70 text-sm">
        <Calendar className="w-5 h-5 mx-auto mb-2 text-rose-500" />
        Together since {RELATIONSHIP_START.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
        <p className="mt-2 italic">Made with 💕</p>
      </footer>

      {/* MESSAGE POPUP */}
      {openMessage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-rose-900/50 backdrop-blur-md animate-fade-in p-4" onClick={() => setOpenMessage(null)}>
          <div className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 max-w-md w-full rounded-3xl p-8 md:p-10 shadow-2xl border-4 border-pink-200 animate-letter-open" onClick={(e) => e.stopPropagation()}>
            <HeartBurst />
            <button onClick={() => setOpenMessage(null)} aria-label="Close" className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-200/60 transition-colors z-10">
              <X className="w-5 h-5 text-rose-600" />
            </button>

            <div className="flex justify-center mb-4 relative z-10">
              <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-heart-beat" />
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-700 text-center mb-4 relative z-10">
              {loveMessages[openMessage % loveMessages.length].title}
            </h2>
            <p className="text-rose-800/90 text-lg text-center leading-relaxed italic relative z-10">
              "{loveMessages[openMessage % loveMessages.length].text}"
            </p>

            <div className="flex justify-center gap-1 mt-6 relative z-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart key={i} className="w-4 h-4 text-rose-400 fill-rose-400 animate-heart-beat" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>

            <p className="text-center text-xs text-rose-500/70 mt-4 relative z-10">
              Message {(openMessage % loveMessages.length) + 1} / {loveMessages.length}
            </p>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-rose-900/80 backdrop-blur-md animate-fade-in p-4" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Memory" className="max-w-full max-h-full rounded-3xl shadow-2xl border-4 border-white animate-letter-open" />
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 p-3 bg-white/90 rounded-full hover:scale-110 transition-transform" aria-label="Close">
            <X className="w-6 h-6 text-rose-700" />
          </button>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0); opacity: 0.4; }
          50% { transform: translateY(-40px) translateX(20px) rotate(15deg); opacity: 0.9; }
        }
        @keyframes petal-fall {
          0% { transform: translateY(0) rotate(0); opacity: 0; }
          10% { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes envelope-float-a {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(10px); }
        }
        @keyframes envelope-float-b {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-15px); }
        }
        @keyframes envelope-swing {
          0%, 100% { transform: rotate(-8deg) translateY(0); }
          50% { transform: rotate(8deg) translateY(-12px); }
        }
        @keyframes envelope-wobble {
          0%, 100% { transform: scale(1) rotate(0); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(0.95) rotate(5deg); }
        }
        @keyframes heart-beat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(0.95); }
          75% { transform: scale(1.15); }
        }
        .animate-heart-beat { animation: heart-beat 1.2s ease-in-out infinite; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out backwards; }
        @keyframes letter-open {
          0% { transform: scale(0.3) rotateZ(-20deg); opacity: 0; }
          60% { transform: scale(1.05) rotateZ(2deg); }
          100% { transform: scale(1) rotateZ(0); opacity: 1; }
        }
        .animate-letter-open { animation: letter-open 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes shimmer { to { background-position: 200% center; } }
        .animate-shimmer { animation: shimmer 4s linear infinite; }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        @keyframes burst {
          0% { transform: translate(0, 0) scale(0); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1.2); opacity: 0; }
        }
        @keyframes burst-up {
          0% { transform: translateY(20px) scale(0.6); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-80px) scale(1); opacity: 0; }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) rotate(0); opacity: 1; }
          100% { transform: translateY(520px) rotate(720deg); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px) rotate(-1deg); }
          40% { transform: translateX(8px) rotate(1deg); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </main>
  );
}
