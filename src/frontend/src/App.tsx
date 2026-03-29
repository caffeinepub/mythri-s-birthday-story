import { useCallback, useEffect, useRef, useState } from "react";
import { PolaroidFrame } from "./components/PolaroidFrame";

// --- Scroll section hook ---
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// --- Scroll down indicator ---
function ScrollDown() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "32px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        opacity: 0.55,
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          color: "#E7B7BE",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "sans-serif",
        }}
      >
        scroll down
      </span>
      <div className="scroll-arrow" />
    </div>
  );
}

// --- Section wrapper ---
function Section({
  children,
  className = "",
  id,
  showScrollCue = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  showScrollCue?: boolean;
}) {
  const ref = useScrollReveal();
  return (
    <section
      ref={ref}
      id={id}
      className={`scroll-section min-h-screen ${className}`}
      style={{ position: "relative" }}
    >
      {children}
      {showScrollCue && <ScrollDown />}
    </section>
  );
}

// --- Chapter section with 2-col layout ---
function ChapterSection({
  kicker,
  title,
  body,
  polaroid,
  id,
  reverse = false,
  showScrollCue = true,
}: {
  kicker: string;
  title: string;
  body: string;
  polaroid?: React.ReactNode;
  id?: string;
  reverse?: boolean;
  showScrollCue?: boolean;
}) {
  return (
    <Section
      id={id}
      className="flex items-center justify-center px-6 py-24"
      showScrollCue={showScrollCue}
    >
      <div
        className={`max-w-5xl w-full flex flex-col ${
          polaroid ? (reverse ? "md:flex-row-reverse" : "md:flex-row") : ""
        } gap-12 md:gap-20 items-center`}
      >
        <div className="flex-1 flex flex-col gap-5">
          <span
            style={{
              color: "#B8BBC2",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              fontFamily: "sans-serif",
            }}
          >
            {kicker}
          </span>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "#F2F2F2",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              color: "#B8BBC2",
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.9,
              whiteSpace: "pre-line",
              fontFamily: '"Playfair Display", serif',
              margin: 0,
            }}
          >
            {body}
          </p>
        </div>
        {polaroid && (
          <div className="flex-shrink-0 flex items-center justify-center">
            {polaroid}
          </div>
        )}
      </div>
    </Section>
  );
}

// --- Typewriter component ---
function Typewriter({ text, onDone }: { text: string; onDone: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    indexRef.current = 0;
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
        setDone(true);
        onDoneRef.current();
      }
    }, 45);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && <span className="cursor-blink">|</span>}
    </span>
  );
}

const FINAL_MESSAGE = `I didn't plan this story.
I didn't expect you to become this important.

But I'm glad you did.

No matter what changes,
you'll always be a part of my life.

Happy Birthday ❤️`;

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [started, setStarted] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const section3Ref = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(() => {
    if (password === "22012025") {
      setUnlocked(true);
      setError("");
    } else {
      setError("Try again 🙂");
    }
  }, [password]);

  const handleStart = useCallback(() => {
    setStarted(true);
    setTimeout(() => {
      section3Ref.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <div
      style={{ background: "#0B0C0E", minHeight: "100vh", color: "#F2F2F2" }}
    >
      {/* SECTION 1: Password */}
      {!unlocked && (
        <div
          className="fade-in-up"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "#0B0C0E",
          }}
        >
          <div
            style={{ textAlign: "center", maxWidth: "420px", width: "100%" }}
          >
            <h1
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "clamp(28px, 5vw, 48px)",
                fontWeight: 700,
                color: "#F2F2F2",
                letterSpacing: "0.02em",
                marginBottom: "16px",
                lineHeight: 1.3,
              }}
            >
              Only you know this date...
            </h1>
            <p
              style={{
                color: "#B8BBC2",
                fontSize: "18px",
                marginBottom: "48px",
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
              }}
            >
              The day everything changed ❤️
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="password-input"
                style={{
                  color: "#B8BBC2",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontFamily: "sans-serif",
                  alignSelf: "flex-start",
                }}
              >
                PASSWORD
              </label>
              <input
                id="password-input"
                data-ocid="password.input"
                type="password"
                placeholder="enter the date..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={{
                  width: "100%",
                  background: "#121317",
                  border: "1.5px solid #D7A6AE",
                  borderRadius: "8px",
                  padding: "14px 18px",
                  color: "#F2F2F2",
                  fontSize: "18px",
                  fontFamily: '"Playfair Display", serif',
                  outline: "none",
                  letterSpacing: "0.1em",
                }}
              />
              <button
                type="button"
                data-ocid="password.submit_button"
                onClick={handleSubmit}
                className="btn-blush"
                style={{
                  width: "100%",
                  background: "#E7B7BE",
                  color: "#1A1A1A",
                  border: "none",
                  borderRadius: "8px",
                  padding: "14px 24px",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                }}
              >
                SUBMIT
              </button>
              {error && (
                <span
                  data-ocid="password.error_state"
                  style={{
                    color: "#E7B7BE",
                    fontSize: "15px",
                    fontStyle: "italic",
                    marginTop: "4px",
                  }}
                >
                  {error}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Intro */}
      {unlocked && !started && (
        <div
          className="fade-in-up"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            textAlign: "center",
            background: "#0B0C0E",
          }}
        >
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 700,
              color: "#F2F2F2",
              lineHeight: 1.4,
              marginBottom: "24px",
              maxWidth: "680px",
            }}
          >
            We were never strangers…
            <br />
            Just people who never spoke.
          </h1>
          <p
            style={{
              color: "#B8BBC2",
              fontSize: "clamp(16px, 2vw, 20px)",
              fontFamily: '"Playfair Display", serif',
              fontStyle: "italic",
              marginBottom: "56px",
            }}
          >
            Until one day changed everything.
          </p>
          <button
            type="button"
            data-ocid="intro.primary_button"
            onClick={handleStart}
            className="btn-blush"
            style={{
              background: "#E7B7BE",
              color: "#1A1A1A",
              border: "none",
              borderRadius: "8px",
              padding: "16px 48px",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "sans-serif",
            }}
          >
            Start
          </button>
        </div>
      )}

      {/* SECTIONS 3-18 */}
      {started && (
        <>
          <div ref={section3Ref} />

          <ChapterSection
            id="section-3"
            kicker="Chapter One"
            title="Before all this…"
            body={`We were just college mates.
Different branches.
You knew me as someone who always studies…
And I knew you as someone I never really spoke to.
Just familiar faces… nothing more.`}
          />

          <ChapterSection
            id="section-4"
            kicker="Chapter Two"
            title="22.01.2025 – Habsiguda Metro"
            body={`That day…
we spoke for the first time.
Not as strangers,
but as two people from the same place,
finding comfort in something familiar.`}
          />

          <ChapterSection
            id="section-5"
            kicker="Chapter Three"
            title="5 Days. One Journey."
            body={`Same city.
Different homes.
But somehow…
we kept travelling together,
talking, sharing,
understanding things we never planned to.`}
          />

          {/* SECTION 6: Camp */}
          <ChapterSection
            id="section-6"
            kicker="Chapter Four"
            title="Voice4Girls – Where it grew"
            body={`Calls…
Chats…
Conversations that slowly became a habit.
Without realizing,
you became a part of my everyday.`}
            polaroid={
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <PolaroidFrame
                  src="/assets/uploads/camp_1-019d39bc-3c6c-7178-b11a-a25df53911cf-9.jpeg"
                  caption="Camp Day 🤍"
                  rotation={-3}
                  size="large"
                  portrait
                />
                <PolaroidFrame
                  src="/assets/uploads/camp_2-019d39bc-386e-763d-92c3-8ce75cf3ac7f-2.jpeg"
                  caption="Voice4Girls"
                  rotation={1}
                  size="large"
                  portrait
                />
                <PolaroidFrame
                  src="/assets/uploads/camp_3-019d39bc-39ea-74fa-8deb-87cf42f79249-4.jpeg"
                  caption="Together"
                  rotation={-2}
                  size="large"
                  portrait
                />
              </div>
            }
          />

          {/* SECTION 7: First Selfie */}
          <ChapterSection
            id="section-7"
            kicker="Chapter Five"
            title="07.02.2025 – First Selfie"
            body={`Our first picture together.
A simple moment…
but one I'll always remember.`}
            polaroid={
              <PolaroidFrame
                src="/assets/uploads/first_selfie-019d39bc-3b30-77f9-83b3-d4d247dc4629-7.jpeg"
                caption="07.02.2025"
                rotation={-3}
                size="large"
                portrait
              />
            }
          />

          <ChapterSection
            id="section-8"
            kicker="Chapter Six"
            title="The Deal"
            body={`We said…
if we ever see each other in college,
we should shake hands.

Funny thing is…
we never did.
Just smiles.
Always smiles.`}
          />

          <ChapterSection
            id="section-9"
            kicker="Chapter Seven"
            title="Somewhere in between…"
            body={`From random chats…
to talking every day.
Morning to night.
Slowly…
you became someone important.`}
          />

          {/* SECTION FUN (new) */}
          <ChapterSection
            id="section-fun"
            kicker="Chapter Fun"
            title="When we just… laughed"
            body={`Not every moment had a reason.
Sometimes we were just silly.
Just happy.
Just us.`}
            polaroid={
              <PolaroidFrame
                src="/assets/uploads/fun-019d39bc-36eb-7018-9152-a284c9846a8c-1.jpeg"
                caption="Fun times 😄"
                rotation={-2}
                size="large"
                portrait
              />
            }
          />

          <ChapterSection
            id="section-10"
            kicker="Chapter Eight"
            title="Fest 2k25"
            body={`You were there.
I was there.
We were right next to each other…

But still,
no photo.

Both waiting.
Both silent.`}
          />

          <ChapterSection
            id="section-11"
            kicker="Chapter Nine"
            title="Feelings vs Friendship"
            body={`At some point…
I started feeling more.
You saw me as just a friend.

It hurt.
But I stayed.`}
          />

          <ChapterSection
            id="section-12"
            kicker="Chapter Ten"
            title="The Little Things"
            body={`You said you liked a doll…
and I got it for you.
You didn't accept it at first…
but later,
you played with it.

That meant more than anything.`}
          />

          {/* SECTION SPECIAL – larger polaroids, portrait orientation to show faces */}
          <ChapterSection
            id="section-special"
            kicker="Chapter Special"
            title="Moments that stayed"
            body={`Some memories don't need words.
They just… stay.
Quietly.
Forever.`}
            polaroid={
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <PolaroidFrame
                  src="/assets/uploads/special_1-019d39bc-3a5b-76b2-bd5f-d17be80c915e-5.jpeg"
                  caption="Special 🤍"
                  rotation={-3}
                  size="large"
                  portrait
                />
                <PolaroidFrame
                  src="/assets/uploads/special_2-019d39bc-399c-7509-9fe6-656b6872d696-3.jpeg"
                  caption="Always"
                  rotation={2}
                  size="large"
                  portrait
                />
              </div>
            }
            reverse
          />

          {/* SECTION 13: Trips */}
          <ChapterSection
            id="section-13"
            kicker="Chapter Eleven"
            title="Trips we never planned"
            body={`From Tirupati…
to Arunachalam…
unexpected journeys,
unexpected happiness.

Those rides,
those laughs,
those moments…
they stayed.`}
            polaroid={
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  maxWidth: "800px",
                }}
              >
                <PolaroidFrame
                  src="/assets/uploads/trip_1-019d39bc-3ed6-700f-ae85-33c0e4d28976-11.jpeg"
                  caption="Tirupati 🤍"
                  rotation={3}
                  size="large"
                  portrait
                />
                <PolaroidFrame
                  src="/assets/uploads/trip_2-019d39bc-3ca0-773e-bbc7-4a22a70218d3-10.jpeg"
                  caption="Arunachalam"
                  rotation={-2}
                  size="large"
                  portrait
                />
                <PolaroidFrame
                  src="/assets/uploads/trip_3-019d39bc-3c20-7572-ad62-2df2f3e5adee-8.jpeg"
                  caption="Together 🌿"
                  rotation={4}
                  size="large"
                  portrait
                />
                <PolaroidFrame
                  src="/assets/uploads/trip_4-019d39bc-3ec5-71a2-9abc-866ac7556796-12.jpeg"
                  caption="Memories"
                  rotation={-3}
                  size="large"
                  portrait
                />
                <PolaroidFrame
                  src="/assets/uploads/trrip_5-019d39bc-4185-74b1-b1b3-b31d40f014ba-13.jpeg"
                  caption="The Journey"
                  rotation={2}
                  size="large"
                  portrait
                />
                <PolaroidFrame
                  src="/assets/uploads/trip_6-019d39bc-3a89-7734-91ab-d1ace03b38a6-6.jpeg"
                  caption="Us 🤍"
                  rotation={-4}
                  size="large"
                  portrait
                />
              </div>
            }
            reverse
          />

          <ChapterSection
            id="section-14"
            kicker="Chapter Twelve"
            title="Not everything was easy"
            body={`Fights.
Misunderstandings.
Silence.

But somehow…
we always found our way back.`}
          />

          <ChapterSection
            id="section-15"
            kicker="Chapter Thirteen"
            title="Acceptance"
            body={`I stopped chasing.
Stopped expecting.

If you stay…
you stay.
If not…
I'll still be okay.`}
          />

          <ChapterSection
            id="section-16"
            kicker="Chapter Fourteen"
            title="Now"
            body={`Now,
we smile when we see each other.
We talk,
without caring about anything else.

Simple.
Real.`}
          />

          {/* SECTION 17: Final message typewriter */}
          <Section id="section-17" className="p-0" showScrollCue>
            <div
              style={{
                background: "#121317",
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  maxWidth: "620px",
                  padding: "48px 24px",
                }}
              >
                <p
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: "clamp(18px, 2.5vw, 24px)",
                    lineHeight: 2,
                    color: "#F2F2F2",
                    whiteSpace: "pre-line",
                    minHeight: "320px",
                  }}
                >
                  <Typewriter
                    text={FINAL_MESSAGE}
                    onDone={() => setTypingDone(true)}
                  />
                </p>
                {typingDone && (
                  <p
                    className="fade-in-up"
                    style={{
                      marginTop: "32px",
                      color: "#E7B7BE",
                      fontFamily: '"Playfair Display", serif',
                      fontStyle: "italic",
                      fontSize: "22px",
                    }}
                  >
                    — Manishhh
                  </p>
                )}
              </div>
            </div>
          </Section>

          {/* SECTION 18: End screen */}
          <Section
            id="section-18"
            className="flex flex-col items-center justify-center px-6 py-24 text-center"
          >
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "clamp(32px, 5vw, 60px)",
                fontWeight: 700,
                color: "#F2F2F2",
                marginBottom: "24px",
                lineHeight: 1.3,
              }}
            >
              This is not the end…
            </h2>
            <p
              style={{
                color: "#B8BBC2",
                fontSize: "clamp(18px, 2.5vw, 26px)",
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                marginBottom: "64px",
              }}
            >
              Just a chapter.
            </p>
            <p
              style={{
                color: "#E7B7BE",
                fontSize: "18px",
                fontFamily: '"Playfair Display", serif',
              }}
            >
              Happy Birthday, Miss Mythriiii ❤️
            </p>
          </Section>

          {/* Footer */}
          <footer
            style={{
              background: "#000",
              padding: "20px 24px",
              textAlign: "center",
              color: "#666",
              fontSize: "12px",
              fontFamily: "sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            Made with <span style={{ color: "#E7B7BE" }}>❤️</span> by Manishhh
          </footer>
        </>
      )}
    </div>
  );
}
