import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Heart, Mail, X, Sparkles, Gift, Music2 } from "lucide-react";
import { GamesSection } from "@/components/Games";
import photo1 from "@/assets/photo1.jpg";
import photo2 from "@/assets/photo2.jpg";
import photo3 from "@/assets/photo3.jpg";
import photo4 from "@/assets/photo4.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const RELATIONSHIP_START = new Date("2021-05-28");

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

const timeline = [
  { year: "Year 1", emoji: "💞", title: "The encounter", text: "Love at first sight. It all began." },
  { year: "Year 2", emoji: "🏡", title: "Our nest", text: "First home, first memories." },
  { year: "Year 3", emoji: "✈️", title: "Adventures", text: "Trips, discoveries, laughter." },
  { year: "Year 4", emoji: "💍", title: "Promises", text: "Stronger than ever, hand in hand." },
  { year: "Year 5", emoji: "🌹", title: "Today", text: "And this is just the beginning..." },
];

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
        <div className="absolute inset-0 bg-rose-400/40 blur-2xl rounded-full group-hover:bg-rose-600/60 transition-colors" />
        <div
          className={`relative p-3 md:p-4 rounded-lg shadow-2xl border-2 transition-all duration-500 ${
            opened
              ? "bg-gradient-to-br from-rose-200 to-rose-300 border-rose-200 opacity-70"
              : "bg-gradient-to-br from-rose-500 via-rose-600 to-rose-800 border-rose-100 group-hover:from-rose-600 group-hover:to-rose-900"
          }`}
        >
          <Mail className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow-md group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
          <Heart className="absolute -top-2 -right-2 w-5 h-5 text-rose-700 fill-rose-500 animate-heart-beat drop-shadow" />
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

function BackgroundDecor() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const items = useMemo(() => {
    if (!mounted) return { hearts: [] as { id: number; top: number; left: number; w: number; h: number; dur: number; delay: number }[] };
    return {
      hearts: Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        w: 12 + Math.random() * 26,
        h: 12 + Math.random() * 26,
        dur: 6 + Math.random() * 8,
        delay: Math.random() * 5,
      })),
    };
  }, [mounted]);

  if (!mounted) return <div className="fixed inset-0 pointer-events-none z-0" aria-hidden />;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {items.hearts.map((h) => (
        <Heart
          key={`h-${h.id}`}
          className="absolute text-rose-300/30 fill-rose-300/20"
          style={{
            top: `${h.top}%`,
            left: `${h.left}%`,
            width: `${h.w}px`,
            height: `${h.h}px`,
            animation: `float ${h.dur}s ease-in-out ${h.delay}s infinite`,
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
    <main
      className="relative min-h-screen overflow-x-hidden bg-[#fffcfc] text-[#5a1818]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Ethereal backdrop */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-rose-200/50 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-200/40 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>
      <BackgroundDecor />

      {/* Scattered envelopes */}
      {envelopePositions.map((pos, i) => (
        <Envelope key={i} position={pos} index={i} opened={opened.has(i)} onClick={() => handleOpen(i)} />
      ))}

      {/* Progress bar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 bg-white/80 backdrop-blur-xl px-5 py-2 rounded-full shadow-xl border border-rose-100 flex items-center gap-3">
        <Gift className="w-4 h-4 text-rose-600" />
        <div className="w-32 h-1.5 bg-rose-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-rose-800 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[11px] text-rose-900 font-bold tabular-nums tracking-wider">
          {opened.size}/{envelopePositions.length}
        </span>
      </div>

      {/* Music toggle */}
      <button
        onClick={() => setMusicOn((m) => !m)}
        className="fixed top-4 right-4 z-30 bg-white/80 backdrop-blur-xl p-3 rounded-full shadow-xl border border-rose-100 hover:scale-110 transition-transform"
        aria-label="Toggle music"
      >
        <Music2 className={`w-5 h-5 text-rose-600 ${musicOn ? "animate-spin-slow" : ""}`} />
      </button>

      <div className="relative max-w-5xl mx-auto px-6 py-24 space-y-32 md:space-y-48 z-10">
        {/* CINEMATIC HERO */}
        <header className="text-center space-y-12 relative pt-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-400 blur-xl opacity-30 animate-pulse" />
              <Heart className="w-11 h-11 fill-rose-500 text-rose-500 animate-heart-beat relative" />
            </div>
            <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-rose-500/80 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100">
              Mon Trésor Éternel
            </span>
          </div>

          <div className="relative inline-block px-4">
            <div
              className="absolute -top-10 -left-6 md:-top-12 md:-left-8 text-4xl md:text-5xl text-rose-300 opacity-60 -rotate-12"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              Always
            </div>
            <h1
              className="text-6xl md:text-[10rem] italic font-black text-rose-950 leading-none tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              5 Years{" "}
              <span className="text-rose-600 block md:inline md:ml-[-20px] not-italic">of Us</span>
            </h1>
            <div
              className="absolute -bottom-6 right-0 md:-bottom-8 text-3xl md:text-4xl text-rose-500 rotate-2"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              &amp; infinity more...
            </div>
          </div>

          <div className="max-w-xl mx-auto space-y-6 pt-6">
            <p
              className="text-rose-800/90 font-light text-lg md:text-xl leading-relaxed italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "Every heartbeat is a love letter written specifically for you. These five years are
              just the first few verses of our forever."
            </p>
            <div className="h-px w-24 bg-rose-200 mx-auto" />
          </div>

          {/* Jewelry-inspired countdown */}
          <div className="flex justify-center gap-3 md:gap-6 pt-8 flex-wrap">
            {[
              { label: "Days", value: time.days, highlight: false },
              { label: "Hours", value: time.hours, highlight: false },
              { label: "Mins", value: time.minutes, highlight: true },
              { label: "Secs", value: time.seconds, highlight: false },
            ].map((u) => (
              <div key={u.label} className={`group relative ${u.highlight ? "transform scale-110" : ""}`}>
                {u.highlight && <div className="absolute inset-0 bg-rose-500 blur-xl opacity-25" />}
                <div
                  className={`relative flex flex-col items-center rounded-full w-20 h-20 md:w-28 md:h-28 justify-center transition-transform group-hover:scale-105 ${
                    u.highlight
                      ? "bg-rose-600 text-white shadow-2xl shadow-rose-500/40 ring-4 ring-rose-200 ring-offset-2 ring-offset-rose-50"
                      : "bg-white/80 backdrop-blur-xl border border-rose-100 shadow-xl shadow-rose-200/30 ring-4 ring-rose-50/50"
                  }`}
                >
                  <div
                    className={`text-2xl md:text-4xl font-black tabular-nums ${u.highlight ? "text-white" : "text-rose-950"}`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {u.value.toString().padStart(2, "0")}
                  </div>
                  <div
                    className={`text-[9px] uppercase tracking-widest font-bold ${u.highlight ? "text-rose-100" : "text-rose-400"}`}
                  >
                    {u.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-10 px-10 py-4 bg-gradient-to-r from-rose-700 to-rose-900 text-white rounded-full font-semibold tracking-widest uppercase text-xs shadow-2xl hover:shadow-rose-300 hover:scale-105 transition-all duration-500 inline-flex items-center gap-3"
          >
            <Heart className="w-4 h-4 fill-white" />
            Discover our story
          </button>

          <p className="text-rose-500/70 text-xs tracking-wider italic">
            ✨ Open all {envelopePositions.length} envelopes to read every love note ✨
          </p>
        </header>

        {/* INTIMATE SCRAPBOOK */}
        <section id="gallery" className="space-y-16">
          <div className="text-center space-y-3">
            <h2
              className="text-5xl md:text-6xl italic text-rose-950"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Soulmates
            </h2>
            <p
              className="text-2xl md:text-3xl text-rose-500"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              Captured whispers of our journey
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 px-2 md:px-8">
            {photos.map((src, i) => {
              const rotations = ["-rotate-2", "rotate-3", "-rotate-3", "rotate-2"];
              const offsets = ["", "mt-8 md:mt-12", "", "mt-10 md:mt-16"];
              const tapeRotations = ["-rotate-1", "rotate-2", "-rotate-3", "rotate-1"];
              const captions = ["Summer '21", "The First Kiss", "Paris Skies", "Our Present"];
              return (
                <button
                  key={i}
                  onClick={() => setLightbox(src)}
                  className={`group aspect-[4/5] bg-[#fffdfa] p-3 md:p-5 shadow-2xl transform hover:rotate-0 hover:scale-105 transition-all duration-700 ring-1 ring-black/5 relative ${rotations[i]} ${offsets[i]}`}
                >
                  <div
                    className={`absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-12 md:w-16 h-6 md:h-8 bg-rose-100/80 backdrop-blur-sm shadow-sm ${tapeRotations[i]}`}
                  />
                  <div className="w-full h-[80%] md:h-[85%] overflow-hidden bg-rose-50">
                    <img
                      src={src}
                      alt={`Memory ${i + 1}`}
                      width={512}
                      height={640}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div
                    className="mt-2 md:mt-4 text-center text-rose-800 text-base md:text-xl font-bold"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    {captions[i]}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* GAMES */}
        <GamesSection />

        {/* HEART'S NARRATIVE TIMELINE */}
        <section className="space-y-16">
          <div className="text-center space-y-3">
            <h2
              className="text-5xl md:text-6xl italic font-black text-rose-950"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Timeline of Love
            </h2>
            <p
              className="text-2xl md:text-3xl text-rose-500"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              Destined from the start
            </p>
          </div>

          <div className="relative px-4">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-rose-300 to-transparent" />
            <div className="space-y-20 md:space-y-32 relative">
              {timeline.map((step, i) => {
                const isLeft = i % 2 === 0;
                const isLast = i === timeline.length - 1;
                return (
                  <div
                    key={i}
                    className={`flex flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center group`}
                  >
                    <div
                      className={`md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} text-center space-y-2`}
                    >
                      <span
                        className={`text-[10px] font-black uppercase tracking-[0.4em] ${isLast ? "text-rose-600" : "text-rose-400/80"}`}
                      >
                        {isLast ? "5 Years & Forever" : step.year}
                      </span>
                      <h4
                        className={`${isLast ? "text-3xl md:text-4xl font-black" : "text-2xl md:text-3xl font-bold"} text-rose-950 mt-1`}
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {step.title}
                      </h4>
                      <p
                        className={`text-rose-800/70 leading-relaxed font-light italic ${isLast ? "text-xl md:text-2xl text-rose-900 font-semibold not-italic" : ""}`}
                        style={{
                          fontFamily: isLast ? "'Dancing Script', cursive" : "'Playfair Display', serif",
                        }}
                      >
                        {step.text}
                      </p>
                    </div>
                    <div
                      className={`${isLast ? "w-16 h-16 bg-rose-600 shadow-rose-500 ring-rose-100 animate-heart-beat" : "w-12 h-12 md:w-14 md:h-14 bg-white border border-rose-100 shadow-rose-200 ring-rose-50/50"} rounded-full flex items-center justify-center relative z-10 my-6 md:my-0 shadow-2xl ring-8 transition-transform group-hover:scale-125`}
                    >
                      <Heart
                        className={`${isLast ? "w-6 h-6 fill-white text-white" : "w-5 h-5 fill-rose-500 text-rose-500"}`}
                      />
                    </div>
                    <div className="md:w-1/2 hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ENCHANTED WISH LETTER */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-[#fffdfb] rounded-[3rem] md:rounded-[4rem] p-10 md:p-16 shadow-[0_50px_100px_-20px_rgba(255,182,193,0.4)] border-b-8 border-rose-100 text-center space-y-10 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-50 rounded-full blur-3xl opacity-60" />
            <div className="absolute top-6 left-6 text-rose-200 rotate-12">
              <Heart className="w-10 h-10 fill-current" />
            </div>

            <div className="space-y-4 relative z-10">
              <h2
                className="text-4xl md:text-5xl italic font-black text-rose-950"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                A Promise to Us
              </h2>
              <p
                className="text-2xl md:text-3xl text-rose-500"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Pour your heart into these words
              </p>
            </div>

            {wishSent ? (
              <div className="py-6 animate-fade-in-up relative z-10">
                <Heart className="w-16 h-16 mx-auto text-rose-500 fill-rose-500 animate-heart-beat" />
                <p
                  className="mt-6 text-rose-800 text-2xl md:text-3xl"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Wish sealed with love ✨
                </p>
                <p className="mt-3 text-rose-700/80 italic font-light">"{wish}"</p>
              </div>
            ) : (
              <>
                <div className="relative group z-10">
                  <div className="absolute -inset-1 bg-rose-100 rounded-[2rem] md:rounded-[2.5rem] blur opacity-25 group-focus-within:opacity-50 transition duration-500" />
                  <textarea
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    rows={4}
                    placeholder="In our next chapter, I promise to..."
                    className="relative w-full bg-rose-50/20 border-2 border-rose-100/50 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 text-rose-950 placeholder-rose-300 focus:border-rose-400 focus:ring-0 outline-none transition-all resize-none text-xl md:text-2xl"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  />
                </div>
                <button
                  disabled={!wish.trim()}
                  onClick={() => setWishSent(true)}
                  className="w-full bg-gradient-to-r from-rose-700 to-rose-900 text-white font-black py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl hover:shadow-rose-300 hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-4 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative z-10"
                >
                  <span className="text-sm md:text-base tracking-[0.25em] uppercase">Seal with Love</span>
                  <Heart className="w-5 h-5 fill-white animate-heart-beat" />
                </button>
              </>
            )}
          </div>
        </section>

        {/* ROMANTIC SIGN-OFF */}
        <footer className="text-center pb-12 space-y-6">
          <div className="flex justify-center items-center gap-6 opacity-30">
            <div className="h-px w-16 bg-rose-900" />
            <Heart className="w-4 h-4 text-rose-900 fill-current" />
            <div className="h-px w-16 bg-rose-900" />
          </div>
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.6em] font-black text-rose-400">
              Together since {RELATIONSHIP_START.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })} — Into Forever
            </p>
            <p
              className="text-4xl md:text-5xl text-rose-950 drop-shadow-sm"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              Your Soulmate
            </p>
          </div>
        </footer>
      </div>

      {/* MESSAGE POPUP */}
      {openMessage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/60 backdrop-blur-md animate-fade-in p-4" onClick={() => setOpenMessage(null)}>
          <div className="relative bg-[#fffdfb] max-w-md w-full rounded-[3rem] p-10 md:p-12 shadow-2xl border-b-8 border-rose-100 animate-letter-open" onClick={(e) => e.stopPropagation()}>
            <HeartBurst />
            <button onClick={() => setOpenMessage(null)} aria-label="Close" className="absolute top-4 right-4 p-2 rounded-full hover:bg-rose-100/60 transition-colors z-10">
              <X className="w-5 h-5 text-rose-700" />
            </button>

            <div className="flex justify-center mb-4 relative z-10">
              <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-heart-beat" />
            </div>

            <h2
              className="text-3xl md:text-4xl italic font-black text-rose-950 text-center mb-4 relative z-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {loveMessages[openMessage % loveMessages.length].title}
            </h2>
            <p
              className="text-rose-800/90 text-lg md:text-xl text-center leading-relaxed italic relative z-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "{loveMessages[openMessage % loveMessages.length].text}"
            </p>

            <div className="flex justify-center gap-1 mt-6 relative z-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart key={i} className="w-4 h-4 text-rose-400 fill-rose-400 animate-heart-beat" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>

            <p className="text-center text-[10px] uppercase tracking-[0.4em] text-rose-400 mt-6 font-bold relative z-10">
              Message {(openMessage % loveMessages.length) + 1} / {loveMessages.length}
            </p>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/80 backdrop-blur-md animate-fade-in p-4" onClick={() => setLightbox(null)}>
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
          15% { transform: scale(1.18); }
          30% { transform: scale(1); }
          45% { transform: scale(1.28); }
          60% { transform: scale(1); }
        }
        .animate-heart-beat { animation: heart-beat 1.4s ease-in-out infinite; }
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
