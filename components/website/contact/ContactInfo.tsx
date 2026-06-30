'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* ─── SCROLL REVEAL HOOK ─── */
function useReveal(direction: 'up' | 'left' | 'right' = 'up') {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const base = 'transition-all duration-700 ease-out'
  const hidden =
    direction === 'left'
      ? 'opacity-0 -translate-x-8'
      : direction === 'right'
        ? 'opacity-0 translate-x-8'
        : 'opacity-0 translate-y-8'
  return {
    ref,
    cls: `${base} ${visible ? 'opacity-100 translate-x-0 translate-y-0' : hidden}`,
  }
}

/* ─── PAIN POINTS ─── */
const painPoints = [
  {
    icon: '🔄',
    title: 'Trapped in the Same Cycle?',
    desc: "Different job. Different partner. Different city. But somehow — the same pain keeps finding you. You wonder if you're the problem. You're not. But there is a root.",
  },
  {
    icon: '💔',
    title: 'People-Pleasing & Shrinking?',
    desc: 'You say yes when every part of you wants to say no. You keep the peace at the cost of your own soul — and wake up exhausted, invisible, and depleted.',
  },
  {
    icon: '😔',
    title: 'Anxiety, Overthinking, Overwhelm?',
    desc: "Replaying conversations. Anticipating rejection. Trapped in self-doubt spirals that never resolve — no matter how much journaling or therapy you've tried.",
  },
  {
    icon: '💸',
    title: 'Working Hard but Going Nowhere?',
    desc: "You've achieved things on paper. But the financial blocks, stalled growth, and that hollow feeling of 'why is nothing working?' — it doesn't make sense.",
  },
]

const marqueeItems = [
  '✦ Freedom from old patterns',
  '💛 Emotional clarity',
  '🌸 Healthy boundaries',
  '✨ Soul-level understanding',
  '🔥 Renewed sense of purpose',
  '💌 Aligned relationships',
  '🌿 Inner peace & stability',
  '🦋 Empowered identity',
  '💫 Financial unblocking',
  '🙏 Root cause healing',
]

const weeks = [
  {
    num: '01',
    icon: '🔍',
    title: 'Awareness',
    tag: 'Week One',
    desc: 'We go into your Akashic Records to uncover karmic patterns, past life experiences, and limiting beliefs carried across lifetimes. Pinpoint exactly where your patterns broke down.',
  },
  {
    num: '02',
    icon: '🌊',
    title: 'Release',
    tag: 'Week Two',
    desc: 'Let go of heavy conditioning, subconscious fears, unresolved emotional wounds, and old relationship contracts that do not serve your highest good.',
  },
  {
    num: '03',
    icon: '✨',
    title: 'Rewire',
    tag: 'Week Three',
    desc: 'Replace repetitive, painful patterns with a new identity. Bring soul-level clearing into daily life using practical mindset work, self-awareness practices, and reflection exercises.',
  },
  {
    num: '04',
    icon: '🦋',
    title: 'Rise',
    tag: 'Week Four',
    desc: "Step fully into your power. Set clear boundaries, break the cycle of people-pleasing, and show up as the aligned, peaceful, empowered version of yourself you've been hiding.",
  },
]

const includes = [
  {
    icon: '🎯',
    title: '4 Live 1:1 Deep-Dive Sessions',
    desc: "Combining Akashic Record Readings with tactical life coaching — personalized to your soul's exact story.",
  },
  {
    icon: '📋',
    title: 'Tailored Worksheets & Reflection Exercises',
    desc: 'Custom tools designed around your unique patterns, wounds, and goals — not generic templates.',
  },
  {
    icon: '💬',
    title: 'Continuous WhatsApp Support',
    desc: "Ongoing integration support between sessions — so you're never alone in the middle of a shift.",
  },
  {
    icon: '🎧',
    title: 'Guided Healing Audios & Forgiveness Prayers',
    desc: 'Deep-healing tools to use between sessions — you keep these forever.',
  },
  {
    icon: '🌸',
    title: 'Spiritual Remedies & Energy Healing Support',
    desc: 'Powerful soul-level clearing practices woven through your entire 4-week journey.',
  },
]

const valueStack = [
  { label: '4-Week 1:1 Coaching + Akashic Reading Program', price: '₹15,000' },
  { label: 'Personalized Soul Blueprint Exploration Session', price: '₹3,000' },
  { label: 'Weekly Growth Tracker & Alignment Tools', price: '₹2,000' },
  {
    label: 'Customized Healing Audio + Deep-Work Reflection Workbook',
    price: '₹5,000',
  },
  {
    label: 'Ongoing WhatsApp Support & Safe-Space Hand-Holding',
    price: 'Priceless',
    special: true,
  },
]

const testimonials = [
  {
    initial: 'P',
    name: 'Priya Sharma',
    loc: 'Delhi · Program Participant',
    quote:
      "I had been in therapy for two years and couldn't understand why I kept choosing the same kind of unavailable man. One session with Sapna revealed a past-life contract I didn't even know I was carrying. I cried — and then I felt free.",
  },
  {
    initial: 'R',
    name: 'Ritu Mehta',
    loc: 'Mumbai · Program Participant',
    quote:
      "I came in for relationship healing and left with clarity about my career, my money blocks, and why I'd been exhausted for years. The WhatsApp support alone was worth everything — Sapna held me through the hardest moments.",
  },
  {
    initial: 'A',
    name: 'Ananya Kapoor',
    loc: 'Pune · Program Participant',
    quote:
      "I was skeptical. I am an engineer. But after my Akashic Reading, the pattern Sapna described — about my father, my abandonment fear, my people-pleasing — was so specific, so accurate, I couldn't deny it. Life feels different now.",
  },
]

const faqs = [
  {
    q: 'What exactly is an Akashic Record Reading?',
    a: "The Akashic Records are the energetic archive of your soul's complete journey — every experience, contract, and pattern across all lifetimes. During a reading, we access the specific root causes of your repeating patterns — not generic spiritual insights, but precise, personal information about why your story keeps playing out the way it does.",
  },
  {
    q: 'Do I need to be spiritual or believe in past lives?',
    a: "Not at all. Many of Sapna's most profound transformations have happened with self-described skeptics — engineers, lawyers, scientists. The work operates on a level that transcends belief systems. What matters is that you are open, willing, and genuinely ready to look at the root of your patterns.",
  },
  {
    q: 'What should I expect to feel during and after?',
    a: "During sessions, most participants experience emotional release, deep recognition ('this is exactly why'), and a profound sense of being seen at a soul level. In the weeks following, clients consistently report less anxiety, healthier relationship choices, stronger boundaries, more clarity, and a lightness they haven't felt in years.",
  },
  {
    q: 'How are the sessions conducted?',
    a: 'All sessions are conducted online via video call — so you can join from anywhere in the world. Each session is approximately 60–75 minutes, and you will have WhatsApp access to Sapna throughout the 4 weeks for integration support between sessions.',
  },
  {
    q: "What if I don't feel a shift?",
    a: 'Sapna stands behind this work completely. If you show up fully and feel no meaningful inner shift by the end of your 4-week journey, she will offer you an additional private session at no cost. That is her personal guarantee.',
  },
  {
    q: 'How do I book and what happens next?',
    a: "Click any 'Book Your Session' button to reach Sapna directly via WhatsApp. She will personally respond, answer any remaining questions, and walk you through the next steps. Spots are limited each month to ensure every client receives Sapna's full attention.",
  },
]

/* ─── MAIN PAGE ─── */
export default function SapnaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [navOpen, setNavOpen] = useState(false)

  return (
    <main
      style={{
        background: 'var(--magenta-900)',
        color: 'var(--ash-white, #FAF0FB)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 300,
        lineHeight: 1.7,
        overflowX: 'hidden',
      }}
    >
      {/* ── ANNOUNCEMENT STRIP ── */}
      <div
        className='announce-strip'
        style={{
          background:
            'linear-gradient(90deg, var(--pink-500), var(--pink-300), var(--pink-500))',
          backgroundSize: '200% 100%',
          animation: 'shimmerStrip 4s linear infinite',
          color: '#fff',
          textAlign: 'center',
          padding: '11px 20px',
          fontFamily: 'var(--font-serif)',
          fontSize: '0.75rem',
          letterSpacing: '0.14em',
          fontWeight: 600,
        }}
      >
        ✦ Akashic Record Reading + Soul Coaching · Break Your Patterns. Finally
        Heal. · Limited Spots Available ✦
      </div>

      {/* ── NAV ── */}
      <nav
        className='navbar'
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(30,5,23,0.92)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(196,56,138,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 48px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.95rem',
            color: 'var(--pink-200)',
            letterSpacing: '0.08em',
          }}
        >
          ✦ Soul Awakening with Sapna
        </div>
        <ul
          className='nav-links'
          style={{
            display: 'flex',
            gap: 32,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {['#story', '#program', '#testimonials', '#offer'].map((href, i) => (
            <li key={i}>
              <a
                href={href}
                style={{
                  color: 'var(--ink-400)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  letterSpacing: '0.06em',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--pink-200)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--ink-400)')
                }
              >
                {
                  [
                    "Sapna's Story",
                    'The Program',
                    'Transformations',
                    'Book Now',
                  ][i]
                }
              </a>
            </li>
          ))}
        </ul>
        <a
          href='#offer'
          className='nav-cta'
          style={{
            background:
              'linear-gradient(135deg, var(--pink-500), var(--pink-300))',
            color: '#fff',
            padding: '10px 22px',
            borderRadius: 4,
            fontFamily: 'var(--font-serif)',
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(196,56,138,0.35)',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
        >
          Book Your Session
        </a>
        <button
          className='nav-hamburger'
          onClick={() => setNavOpen((o) => !o)}
          aria-label='Toggle menu'
          style={{
            display: 'none',
            background: 'transparent',
            border: '1px solid rgba(196,56,138,0.4)',
            borderRadius: 4,
            width: 38,
            height: 38,
            color: 'var(--pink-200)',
            fontSize: '1.1rem',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {navOpen ? '✕' : '☰'}
        </button>
        {navOpen && (
          <div
            className='nav-mobile-menu'
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(30,5,23,0.98)',
              borderBottom: '1px solid rgba(196,56,138,0.2)',
              display: 'flex',
              flexDirection: 'column',
              padding: '8px 20px 20px',
            }}
          >
            {['#story', '#program', '#testimonials', '#offer'].map(
              (href, i) => (
                <a
                  key={i}
                  href={href}
                  onClick={() => setNavOpen(false)}
                  style={{
                    color: 'var(--ink-200)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    padding: '14px 4px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {
                    [
                      "Sapna's Story",
                      'The Program',
                      'Transformations',
                      'Book Now',
                    ][i]
                  }
                </a>
              ),
            )}
            <a
              href='#offer'
              onClick={() => setNavOpen(false)}
              style={{
                marginTop: 16,
                textAlign: 'center',
                background:
                  'linear-gradient(135deg, var(--pink-500), var(--pink-300))',
                color: '#fff',
                padding: '12px 22px',
                borderRadius: 4,
                fontFamily: 'var(--font-serif)',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Book Your Session
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className='hero-section'
        style={{
          minHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 24px 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Orbs */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 700,
            height: 700,
            background:
              'radial-gradient(ellipse at center bottom, rgba(196,56,138,0.22) 0%, rgba(224,96,192,0.1) 40%, transparent 70%)',
            pointerEvents: 'none',
            borderRadius: '50%',
            filter: 'blur(1px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            background:
              'radial-gradient(ellipse, rgba(224,96,192,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
            borderRadius: '50%',
          }}
        />

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            color: 'var(--pink-300)',
            marginBottom: 24,
            textTransform: 'uppercase',
            position: 'relative',
            zIndex: 1,
          }}
        >
          ✦ Akashic Record Reading · Life & Relationship Coaching ✦
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 6vw, 5rem)',
            fontWeight: 300,
            lineHeight: 1.15,
            color: '#FAF0FB',
            maxWidth: 840,
            marginBottom: 18,
            position: 'relative',
            zIndex: 1,
          }}
        >
          You have tried everything.
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--pink-200)' }}>
            And it keeps happening again.
          </em>
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            fontStyle: 'italic',
            color: 'var(--pink-300)',
            marginBottom: 10,
            position: 'relative',
            zIndex: 1,
          }}
        >
          Same job. Same fights. Same heartbreak.
          <br />
          Different people. Same story.
        </p>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--ink-400)',
            maxWidth: 560,
            marginBottom: 48,
            fontWeight: 300,
            lineHeight: 1.85,
            position: 'relative',
            zIndex: 1,
          }}
        >
          There is a reason — and it lives{' '}
          <strong style={{ color: 'var(--pink-200)', fontWeight: 500 }}>
            deeper than you think.
          </strong>
          <br />
          You are not unlucky. You are not broken. You are not cursed.
          <br />
          You are carrying{' '}
          <strong style={{ color: 'var(--pink-200)', fontWeight: 500 }}>
            patterns
          </strong>{' '}
          — old, deep, invisible ones — that keep pulling you back into the same
          place.
        </p>
        <div
          style={{
            fontSize: '1.4rem',
            marginBottom: 48,
            letterSpacing: '0.5em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          ✦ ✦ ✦
        </div>
        <a
          href='#offer'
          className='hero-cta'
          style={{
            display: 'inline-block',
            background:
              'linear-gradient(135deg, var(--pink-500), var(--pink-300))',
            color: '#fff',
            padding: '18px 52px',
            borderRadius: 4,
            fontFamily: 'var(--font-serif)',
            fontSize: '0.88rem',
            letterSpacing: '0.12em',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 8px 40px rgba(196,56,138,0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            position: 'relative',
            zIndex: 1,
          }}
        >
          I Want to Understand Why →
        </a>
        <p
          style={{
            marginTop: 18,
            fontSize: '0.78rem',
            color: 'var(--ink-400)',
            letterSpacing: '0.04em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          1:1 with Sapna · Soul-level reading + practical coaching ·{' '}
          <span style={{ color: 'var(--pink-300)', fontWeight: 500 }}>
            Limited spots
          </span>
        </p>
      </section>

      {/* ── TRUST BAR ── */}
      <div
        className='trust-bar'
        style={{
          background: 'rgba(35,10,28,0.9)',
          borderTop: '1px solid rgba(196,56,138,0.15)',
          borderBottom: '1px solid rgba(196,56,138,0.15)',
          padding: '28px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          {[
            ['🎓', 'Certified', 'Akashic Record Reader'],
            ['💛', 'Life & Relationship', 'Coach'],
            ['✨', 'Soul Healing', 'Guide'],
            ['🔒', 'Safe Space', '· Confidential'],
            ['📱', 'WhatsApp', 'Support Included'],
          ].map(([icon, bold, rest], i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: '0.82rem',
                color: 'var(--ink-400)',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{icon}</span>
              <span>
                <strong style={{ color: 'var(--pink-200)', fontWeight: 500 }}>
                  {bold}
                </strong>{' '}
                {rest}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PAIN SECTION ── */}
      <section
        className='section-pad'
        style={{
          background: 'rgba(35,10,28,0.8)',
          padding: '96px 24px',
          textAlign: 'center',
          borderTop: '1px solid rgba(196,56,138,0.15)',
          borderBottom: '1px solid rgba(196,56,138,0.15)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.6rem, 4vw, 3rem)',
            fontWeight: 300,
            color: '#FAF0FB',
            maxWidth: 780,
            margin: '0 auto 48px',
            lineHeight: 1.35,
          }}
        >
          Say goodbye to{' '}
          <strong style={{ color: 'var(--pink-200)', fontWeight: 400 }}>
            self-doubt, repeated heartbreaks, and feeling permanently stuck
          </strong>{' '}
          — and finally understand why it keeps happening.
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
            maxWidth: 960,
            margin: '0 auto',
          }}
        >
          {painPoints.map((p, i) => {
            const r = useReveal(i % 2 === 0 ? 'left' : 'right')
            return (
              <div
                key={i}
                ref={r.ref}
                className={r.cls}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(196,56,138,0.15)',
                  borderRadius: 8,
                  padding: '32px 28px',
                  textAlign: 'left',
                  transition: 'border-color 0.3s, transform 0.3s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(196,56,138,0.4)'
                  ;(e.currentTarget as HTMLDivElement).style.transform =
                    'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(196,56,138,0.15)'
                  ;(e.currentTarget as HTMLDivElement).style.transform =
                    'translateY(0)'
                }}
              >
                <div style={{ fontSize: '1.6rem', marginBottom: 16 }}>
                  {p.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    color: 'var(--pink-300)',
                    marginBottom: 10,
                    fontWeight: 400,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--ink-400)',
                    lineHeight: 1.75,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section
        style={{
          padding: '60px 0',
          overflow: 'hidden',
          background: 'var(--magenta-900)',
        }}
      >
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            color: 'var(--pink-300)',
            marginBottom: 32,
          }}
        >
          ✦ What Women Carry Away From This Work ✦
        </p>
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              gap: 18,
              animation: 'scrollLeft 32s linear infinite',
              width: 'max-content',
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(196,56,138,0.08)',
                  border: '1px solid rgba(196,56,138,0.2)',
                  borderRadius: 6,
                  padding: '14px 24px',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'var(--ink-200)',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAPNA'S STORY ── */}
      <section
        id='story'
        className='section-pad'
        style={{
          background: 'var(--magenta-900)',
          borderTop: '1px solid rgba(196,56,138,0.1)',
          padding: '100px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
          className='grid-story'
        >
          {(() => {
            const r = useReveal('left')
            return (
              <div
                ref={r.ref}
                className={r.cls}
                style={{ position: 'relative' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: -2,
                    borderRadius: 8,
                    background:
                      'linear-gradient(135deg, rgba(196,56,138,0.4), transparent 60%)',
                    zIndex: 0,
                    filter: 'blur(8px)',
                  }}
                />
                <img
                  src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
                  alt='Sapna Lamba'
                  style={{
                    width: '100%',
                    borderRadius: 6,
                    display: 'block',
                    filter: 'saturate(1.15)',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 6,
                    background:
                      'linear-gradient(to top, rgba(26,5,20,0.6) 0%, transparent 60%)',
                    zIndex: 2,
                  }}
                />
                <div
                  className='story-quote-card'
                  style={{
                    position: 'absolute',
                    bottom: -24,
                    right: -24,
                    background: 'rgba(35,10,28,0.92)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(196,56,138,0.3)',
                    borderRadius: 8,
                    padding: '20px 22px',
                    maxWidth: 220,
                    zIndex: 3,
                    animation: 'floatY 5s ease-in-out infinite',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '0.9rem',
                      color: 'var(--ink-100)',
                      lineHeight: 1.6,
                      marginBottom: 10,
                    }}
                  >
                    "Finding the root cause is only the first step. You still
                    have to live and transform your everyday human life."
                  </p>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--pink-300)',
                      fontWeight: 500,
                    }}
                  >
                    — Sapna Lamba
                  </span>
                </div>
              </div>
            )
          })()}

          {(() => {
            const r = useReveal('right')
            return (
              <div ref={r.ref} className={r.cls}>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.22em',
                    color: 'var(--pink-300)',
                    marginBottom: 12,
                    textTransform: 'uppercase',
                  }}
                >
                  ✦ The Story Behind the Work ✦
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                    fontWeight: 300,
                    color: '#FAF0FB',
                    lineHeight: 1.3,
                    marginBottom: 24,
                  }}
                >
                  From logic to{' '}
                  <em style={{ color: 'var(--pink-200)', fontStyle: 'italic' }}>
                    soul-level truth.
                  </em>
                </h2>
                {[
                  <>
                    Professionally, I come from a world of logic — I qualified
                    as an engineer, studied law, and explored teaching. But deep
                    within,{' '}
                    <strong style={{ color: '#FAF0FB', fontWeight: 500 }}>
                      nothing felt truly aligned.
                    </strong>
                  </>,
                  null, // highlight block
                  <>
                    That painful turning point led me to the{' '}
                    <strong
                      style={{ color: 'var(--pink-200)', fontWeight: 500 }}
                    >
                      Akashic Records
                    </strong>{' '}
                    — and for the first time, I began understanding life from a
                    soul perspective rather than just a human one. I felt my
                    father's love, guidance, and presence. Life had not ended.
                  </>,
                  <>
                    <strong style={{ color: '#FAF0FB', fontWeight: 500 }}>
                      Finding the soul-level root cause is only the first step.
                    </strong>{' '}
                    You still have to live and transform your everyday human
                    life. This is why I also mastered Life and Relationship
                    Coaching.
                  </>,
                  <>
                    Today, I blend the deep spiritual wisdom of the Akashic
                    Records with highly practical, human-level transformation
                    tools — to help you{' '}
                    <strong style={{ color: '#FAF0FB', fontWeight: 500 }}>
                      break free, step into your power, and finally heal.
                    </strong>
                  </>,
                ].map((content, i) =>
                  i === 1 ? (
                    <div
                      key={i}
                      style={{
                        padding: '18px 22px',
                        background: 'rgba(196,56,138,0.07)',
                        borderLeft: '3px solid var(--pink-300)',
                        borderRadius: '0 6px 6px 0',
                        margin: '20px 0',
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: '1rem',
                        color: 'var(--pink-200)',
                        lineHeight: 1.7,
                      }}
                    >
                      A few years ago, my life changed completely when I lost my
                      father to cancer. He was my biggest emotional support — my
                      absolute strength. The pain was so paralyzing I simply
                      could not accept that he was gone.
                    </div>
                  ) : (
                    <p
                      key={i}
                      style={{
                        color: 'var(--ink-400)',
                        fontSize: '0.92rem',
                        lineHeight: 1.9,
                        marginBottom: 16,
                      }}
                    >
                      {content}
                    </p>
                  ),
                )}
                <div
                  style={{
                    marginTop: 28,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  {[
                    'Certified Akashic Record Reader',
                    'Life & Relationship Coach',
                    'Soul Healing Guide',
                  ].map((b) => (
                    <span
                      key={b}
                      style={{
                        background: 'rgba(196,56,138,0.1)',
                        border: '1px solid rgba(196,56,138,0.25)',
                        borderRadius: 20,
                        padding: '6px 14px',
                        fontSize: '0.75rem',
                        color: 'var(--pink-300)',
                        letterSpacing: '0.04em',
                        fontFamily: 'var(--font-serif)',
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ── WHY IT WORKS ── */}
      <section
        className='section-pad'
        style={{
          padding: '100px 24px',
          background: 'rgba(35,10,28,0.8)',
          borderTop: '1px solid rgba(196,56,138,0.12)',
          borderBottom: '1px solid rgba(196,56,138,0.12)',
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
          className='grid-story'
        >
          {(() => {
            const r = useReveal('left')
            return (
              <div ref={r.ref} className={r.cls}>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                    fontWeight: 300,
                    color: '#FAF0FB',
                    lineHeight: 1.3,
                    marginBottom: 24,
                  }}
                >
                  This isn't more therapy.
                  <br />
                  This isn't another course.
                  <br />
                  <em style={{ color: 'var(--pink-200)', fontStyle: 'italic' }}>
                    This is soul-level root work.
                  </em>
                </h2>
                {[
                  'Most approaches address the symptoms — the anxiety, the relationship pattern, the stuck feeling. They give you tools to manage. But the pattern keeps returning because the root is untouched.',
                  "The Akashic Records are the energetic archive of your soul's journey — every experience, every contract, every belief pattern carried across lifetimes. When we access your records, we identify exactly where your blocks were formed.",
                  'Then comes the work that makes it real: Life and Relationship Coaching brings that soul-level awareness into your daily choices, your relationships, your self-talk, your boundaries.',
                ].map((text, i) => (
                  <p
                    key={i}
                    style={{
                      color: 'var(--ink-400)',
                      fontSize: '0.92rem',
                      lineHeight: 1.85,
                      marginBottom: 16,
                    }}
                  >
                    {text}
                  </p>
                ))}
                <p
                  style={{
                    color: 'var(--pink-300)',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                  }}
                >
                  "You don't need to believe in anything. You just need to be
                  willing to look deeper than you have before."
                </p>
              </div>
            )
          })()}

          {(() => {
            const r = useReveal('right')
            return (
              <div
                ref={r.ref}
                className={r.cls}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 20,
                }}
              >
                {[
                  ['Root', 'Cause healing — not symptom management'],
                  ['4', 'Weeks. Awareness → Release → Rewire → Rise'],
                  ['1:1', 'Deeply personal — no generic group sessions'],
                  ['∞', 'WhatsApp support throughout your journey'],
                ].map(([num, label], i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(196,56,138,0.07)',
                      border: '1px solid rgba(196,56,138,0.2)',
                      borderRadius: 8,
                      padding: '28px 24px',
                      textAlign: 'center',
                      transition: 'border-color 0.3s, transform 0.3s',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLDivElement).style.borderColor =
                        'rgba(196,56,138,0.45)'
                      ;(e.currentTarget as HTMLDivElement).style.transform =
                        'translateY(-3px)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLDivElement).style.borderColor =
                        'rgba(196,56,138,0.2)'
                      ;(e.currentTarget as HTMLDivElement).style.transform =
                        'translateY(0)'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '2.4rem',
                        color: 'var(--pink-200)',
                        fontWeight: 300,
                        display: 'block',
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      {num}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--ink-400)',
                        letterSpacing: '0.06em',
                        lineHeight: 1.4,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section
        className='section-pad'
        style={{ padding: '100px 24px', maxWidth: 960, margin: '0 auto' }}
      >
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            color: 'var(--pink-300)',
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
        >
          ✦ The Shift ✦
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            color: '#FAF0FB',
            textAlign: 'center',
            maxWidth: 640,
            margin: '0 auto 0',
            lineHeight: 1.3,
          }}
        >
          Before this work vs. after.
        </h2>
        {(() => {
          const r = useReveal()
          return (
            <div
              ref={r.ref}
              className={`${r.cls} grid-compare`}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                borderRadius: 12,
                overflow: 'hidden',
                marginTop: 48,
              }}
            >
              <div
                style={{
                  padding: '48px 40px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    marginBottom: 32,
                    textTransform: 'uppercase',
                    color: 'var(--ink-400)',
                  }}
                >
                  Before Soul Awakening
                </h3>
                {[
                  'Same painful patterns repeating — different people, same heartbreak',
                  'Saying yes when you mean no — shrinking to keep the peace',
                  'Constant overthinking, anxiety spirals, emotional exhaustion',
                  'Financial struggles and stalled growth despite genuine hard work',
                  'Achieving things externally but feeling hollow and disconnected inside',
                ].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.18)',
                        flexShrink: 0,
                        marginTop: 8,
                      }}
                    />
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--ink-400)',
                        lineHeight: 1.65,
                      }}
                    >
                      {t}
                    </p>
                  </div>
                ))}
                <p
                  style={{
                    paddingTop: 24,
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    color: 'var(--ink-400)',
                  }}
                >
                  😔 Stuck. Exhausted. Searching.
                </p>
              </div>
              <div
                style={{
                  padding: '48px 40px',
                  background: 'rgba(196,56,138,0.07)',
                  border: '1px solid rgba(196,56,138,0.25)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    marginBottom: 32,
                    textTransform: 'uppercase',
                    color: 'var(--pink-300)',
                  }}
                >
                  After Soul Awakening
                </h3>
                {[
                  'Patterns understood at the root — and finally broken for good',
                  'Clear, loving boundaries — you show up as yourself without apology',
                  'Emotional stability, inner calm, and a mind that feels like home again',
                  'Energetic blocks cleared — aligned action feels natural and fruitful',
                  'Deep sense of purpose, alignment, and genuine inner peace',
                ].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--pink-300)',
                        flexShrink: 0,
                        marginTop: 8,
                      }}
                    />
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: '#FAF0FB',
                        lineHeight: 1.65,
                      }}
                    >
                      {t}
                    </p>
                  </div>
                ))}
                <p
                  style={{
                    paddingTop: 24,
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    color: 'var(--pink-300)',
                  }}
                >
                  ✨ Healed. Aligned. Empowered.
                </p>
              </div>
            </div>
          )
        })()}
      </section>

      {/* ── 4-WEEK PROGRAM ── */}
      <section
        id='program'
        className='section-pad'
        style={{
          background: 'rgba(35,10,28,0.8)',
          padding: '100px 24px',
          borderTop: '1px solid rgba(196,56,138,0.12)',
          borderBottom: '1px solid rgba(196,56,138,0.12)',
        }}
      >
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            color: 'var(--pink-300)',
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
        >
          ✦ The Program ✦
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            color: '#FAF0FB',
            textAlign: 'center',
            maxWidth: 640,
            margin: '0 auto',
            lineHeight: 1.3,
          }}
        >
          Inside the 4-Week Journey
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--ink-400)',
            fontSize: '0.92rem',
            maxWidth: 560,
            margin: '20px auto 0',
            lineHeight: 1.85,
          }}
        >
          We don't just look at the surface-level problem. We bridge the gap
          between{' '}
          <strong style={{ color: 'var(--pink-200)', fontWeight: 500 }}>
            soul-level awareness
          </strong>{' '}
          and{' '}
          <strong style={{ color: 'var(--pink-200)', fontWeight: 500 }}>
            practical daily transformation
          </strong>{' '}
          across Health, Wealth, and Relationships.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 2,
            maxWidth: 960,
            margin: '48px auto 0',
          }}
        >
          {weeks.map((w, i) => {
            const r = useReveal()
            return (
              <div
                key={i}
                ref={r.ref}
                className={r.cls}
                style={{
                  padding: '40px 30px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(196,56,138,0.12)',
                  position: 'relative',
                  transition: 'background 0.3s, border-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.background = 'rgba(196,56,138,0.05)'
                  el.style.borderColor = 'rgba(196,56,138,0.3)'
                  ;(
                    el.querySelector('.week-accent') as HTMLElement
                  ).style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.background = 'rgba(255,255,255,0.02)'
                  el.style.borderColor = 'rgba(196,56,138,0.12)'
                  ;(
                    el.querySelector('.week-accent') as HTMLElement
                  ).style.opacity = '0'
                }}
              >
                <div
                  className='week-accent'
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background:
                      'linear-gradient(90deg, var(--pink-500), var(--pink-300))',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '3.5rem',
                    color: 'rgba(196,56,138,0.15)',
                    fontWeight: 300,
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  {w.num}
                </div>
                <div style={{ fontSize: '1.6rem', marginBottom: 12 }}>
                  {w.icon}
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    color: 'var(--pink-300)',
                    marginBottom: 4,
                    fontWeight: 400,
                  }}
                >
                  {w.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.14em',
                    color: 'var(--ink-400)',
                    textTransform: 'uppercase',
                    marginBottom: 14,
                  }}
                >
                  {w.tag}
                </p>
                <p
                  style={{
                    fontSize: '0.83rem',
                    color: 'var(--ink-400)',
                    lineHeight: 1.7,
                  }}
                >
                  {w.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Includes */}
        {(() => {
          const r = useReveal()
          return (
            <div
              ref={r.ref}
              className={`${r.cls} includes-card`}
              style={{
                maxWidth: 960,
                margin: '64px auto 0',
                background: 'rgba(196,56,138,0.05)',
                border: '1px solid rgba(196,56,138,0.2)',
                borderRadius: 12,
                padding: '48px 40px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.18em',
                  color: 'var(--pink-300)',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  marginBottom: 36,
                }}
              >
                ✦ Everything That's Included ✦
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 20,
                }}
              >
                {includes.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        fontSize: '1.3rem',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h5
                        style={{
                          fontSize: '0.88rem',
                          color: '#FAF0FB',
                          fontWeight: 500,
                          marginBottom: 3,
                        }}
                      >
                        {item.title}
                      </h5>
                      <p
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--ink-400)',
                          lineHeight: 1.55,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })()}
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        id='testimonials'
        className='section-pad'
        style={{
          padding: '100px 24px',
          borderTop: '1px solid rgba(196,56,138,0.12)',
          borderBottom: '1px solid rgba(196,56,138,0.12)',
        }}
      >
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            color: 'var(--pink-300)',
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
        >
          ✦ Voices From the Work ✦
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            color: '#FAF0FB',
            textAlign: 'center',
            maxWidth: 640,
            margin: '0 auto 64px',
            lineHeight: 1.3,
          }}
        >
          Real women. Real patterns broken. Real lives changed.
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 22,
            maxWidth: 1000,
            margin: '0 auto',
          }}
        >
          {testimonials.map((t, i) => {
            const r = useReveal(i === 0 ? 'left' : i === 2 ? 'right' : 'up')
            return (
              <div
                key={i}
                ref={r.ref}
                className={r.cls}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(196,56,138,0.15)',
                  borderRadius: 10,
                  padding: 32,
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(196,56,138,0.35)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(196,56,138,0.15)')
                }
              >
                <div
                  style={{
                    color: 'var(--pink-300)',
                    fontSize: '0.9rem',
                    marginBottom: 16,
                    letterSpacing: '0.1em',
                  }}
                >
                  ★★★★★
                </div>
                <blockquote
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    color: 'var(--ink-200)',
                    lineHeight: 1.75,
                    marginBottom: 24,
                  }}
                >
                  "{t.quote}"
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      background:
                        'linear-gradient(135deg, var(--pink-500), var(--pink-300))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.9rem',
                      color: '#fff',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: '#FAF0FB',
                        fontWeight: 500,
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{ fontSize: '0.75rem', color: 'var(--ink-400)' }}
                    >
                      {t.loc}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section
        className='section-pad'
        style={{
          padding: '100px 24px',
          textAlign: 'center',
          background:
            'radial-gradient(ellipse at center, rgba(196,56,138,0.1) 0%, transparent 70%)',
        }}
      >
        {(() => {
          const r = useReveal()
          return (
            <div
              ref={r.ref}
              className={`${r.cls} guarantee-card`}
              style={{
                maxWidth: 680,
                margin: '0 auto',
                border: '1px solid var(--pink-300)',
                borderRadius: 12,
                padding: '64px 48px',
                position: 'relative',
              }}
            >
              <div
                className='guarantee-badge'
                style={{
                  position: 'absolute',
                  top: -18,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background:
                    'linear-gradient(135deg, var(--pink-500), var(--pink-300))',
                  color: '#fff',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  padding: '8px 20px',
                  borderRadius: 20,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                ✦ Sapna's Sacred Promise ✦
              </div>
              <div style={{ fontSize: '3rem', marginBottom: 24 }}>💛</div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                  fontWeight: 300,
                  color: '#FAF0FB',
                  marginBottom: 20,
                  lineHeight: 1.3,
                }}
              >
                Feel the shift — or I will{' '}
                <em style={{ color: 'var(--pink-200)', fontStyle: 'italic' }}>
                  personally make it right.
                </em>
              </h2>
              <p
                style={{
                  color: 'var(--ink-400)',
                  fontSize: '0.92rem',
                  lineHeight: 1.85,
                  maxWidth: 520,
                  margin: '0 auto',
                }}
              >
                I believe in this work so deeply that if you show up fully,
                engage with an open heart, and feel no meaningful inner shift by
                the end of the 4 weeks — I will offer you an additional private
                session at no extra cost. That is my promise to you.
              </p>
            </div>
          )
        })()}
      </section>

      {/* ── OFFER / PRICING ── */}
      <section
        id='offer'
        className='section-pad'
        style={{
          padding: '100px 24px',
          background: 'rgba(35,10,28,0.8)',
          borderTop: '1px solid rgba(196,56,138,0.12)',
        }}
      >
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            color: 'var(--pink-300)',
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
        >
          ✦ Reserve Your Spot ✦
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            color: '#FAF0FB',
            textAlign: 'center',
            maxWidth: 640,
            margin: '0 auto 48px',
            lineHeight: 1.3,
          }}
        >
          Your investment in{' '}
          <em style={{ color: 'var(--pink-200)', fontStyle: 'italic' }}>
            finally breaking free.
          </em>
        </h2>
        {(() => {
          const r = useReveal()
          return (
            <div
              ref={r.ref}
              className={`${r.cls} offer-card`}
              style={{
                maxWidth: 820,
                margin: '0 auto',
                border: '2px solid var(--pink-300)',
                borderRadius: 14,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background:
                    'linear-gradient(135deg, var(--pink-500), var(--pink-300))',
                  padding: '14px 24px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.14em',
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                ✦ LIMITED SPOTS AVAILABLE — ENROLL TODAY ✦
              </div>
              <div
                className='offer-card-inner'
                style={{ padding: '52px 48px' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    color: '#FAF0FB',
                    fontWeight: 300,
                    marginBottom: 6,
                  }}
                >
                  4-Week 1:1 Soul Awakening Program
                </div>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--ink-400)',
                    marginBottom: 36,
                  }}
                >
                  Akashic Record Reading + Life & Relationship Coaching —
                  personalized, deep, and completely transformative.
                </p>

                {valueStack.map((v, i) => (
                  <div
                    key={i}
                    className='value-row'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '14px 0',
                      borderBottom:
                        i < valueStack.length - 1
                          ? '1px solid rgba(255,255,255,0.05)'
                          : 'none',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontSize: '0.88rem',
                        color: '#FAF0FB',
                      }}
                    >
                      <span
                        style={{ color: 'var(--pink-300)', fontSize: '0.8rem' }}
                      >
                        ✦
                      </span>
                      {v.label}
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        color: v.special ? 'var(--pink-300)' : 'var(--ink-400)',
                        textDecoration: v.special ? 'none' : 'line-through',
                        fontWeight: v.special ? 500 : 300,
                      }}
                    >
                      {v.price}
                    </div>
                  </div>
                ))}

                <div
                  className='price-box'
                  style={{
                    margin: '32px 0',
                    background: 'rgba(196,56,138,0.07)',
                    border: '1px solid rgba(196,56,138,0.2)',
                    borderRadius: 10,
                    padding: '28px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 24,
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--ink-400)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        marginBottom: 4,
                      }}
                    >
                      Total Value
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.8rem',
                        fontWeight: 300,
                        textDecoration: 'line-through',
                        color: 'var(--ink-400)',
                      }}
                    >
                      ₹25,000
                    </div>
                  </div>
                  <div
                    className='price-divider'
                    style={{
                      width: 1,
                      background: 'rgba(196,56,138,0.2)',
                      height: 60,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--pink-300)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        marginBottom: 4,
                      }}
                    >
                      Your Investment Today
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(2.2rem, 7vw, 3rem)',
                        fontWeight: 300,
                        background:
                          'linear-gradient(135deg, var(--pink-200), var(--pink-400))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        lineHeight: 1,
                      }}
                    >
                      ₹5,999
                    </div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--ink-400)',
                        marginTop: 4,
                      }}
                    >
                      You save{' '}
                      <span
                        style={{ color: 'var(--pink-200)', fontWeight: 500 }}
                      >
                        ₹19,001
                      </span>{' '}
                      · One-time investment
                    </div>
                  </div>
                </div>

                <a
                  href='https://wa.me/91XXXXXXXXXX'
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    background:
                      'linear-gradient(135deg, var(--pink-500), var(--pink-300))',
                    color: '#fff',
                    padding: '18px 32px',
                    borderRadius: 6,
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 8px 32px rgba(196,56,138,0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.transform =
                      'translateY(-2px)'
                    ;(e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      '0 12px 44px rgba(196,56,138,0.55)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.transform =
                      'translateY(0)'
                    ;(e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      '0 8px 32px rgba(196,56,138,0.4)'
                  }}
                >
                  Yes, I'm Ready to Break My Patterns →
                </a>
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--ink-400)',
                    marginTop: 16,
                  }}
                >
                  Book via WhatsApp · Secure your spot today · Limited
                  availability each month
                </p>
              </div>
            </div>
          )
        })()}
      </section>

      {/* ── FAQ ── */}
      <section
        className='section-pad'
        style={{ padding: '100px 24px', maxWidth: 720, margin: '0 auto' }}
      >
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            color: 'var(--pink-300)',
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
        >
          ✦ Questions ✦
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            color: '#FAF0FB',
            textAlign: 'center',
            maxWidth: 640,
            margin: '0 auto 64px',
            lineHeight: 1.3,
          }}
        >
          Everything you want to know before you begin
        </h2>
        {faqs.map((f, i) => (
          <div
            key={i}
            style={{
              borderBottom: '1px solid rgba(196,56,138,0.12)',
              padding: '28px 0',
              cursor: 'pointer',
            }}
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                color: openFaq === i ? 'var(--pink-200)' : '#FAF0FB',
                fontWeight: 400,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 16,
                transition: 'color 0.2s',
              }}
            >
              {f.q}
              <span
                style={{
                  color: 'var(--pink-300)',
                  flexShrink: 0,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize: '1.3rem',
                  lineHeight: '1.1',
                }}
              >
                {openFaq === i ? '−' : '+'}
              </span>
            </h4>
            {openFaq === i && (
              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--ink-400)',
                  lineHeight: 1.85,
                  marginTop: 18,
                }}
              >
                {f.a}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className='section-pad'
        style={{
          padding: '120px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, rgba(196,56,138,0.16) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 5vw, 4rem)',
            fontWeight: 300,
            color: '#FAF0FB',
            maxWidth: 740,
            margin: '0 auto 24px',
            lineHeight: 1.2,
            position: 'relative',
            zIndex: 1,
          }}
        >
          The pattern doesn't have to
          <br />
          <em style={{ color: 'var(--pink-200)', fontStyle: 'italic' }}>
            repeat one more time.
          </em>
        </h2>
        <p
          style={{
            color: 'var(--ink-400)',
            fontSize: '0.95rem',
            maxWidth: 520,
            margin: '0 auto 48px',
            lineHeight: 1.85,
            position: 'relative',
            zIndex: 1,
          }}
        >
          You've been searching long enough — the right help, the right
          explanation, the right way through. This is it. The root is reachable.
          The healing is real. And you are not alone in this anymore.
        </p>
        <a
          href='#offer'
          style={{
            display: 'inline-block',
            background:
              'linear-gradient(135deg, var(--pink-500), var(--pink-300))',
            color: '#fff',
            padding: '18px 52px',
            borderRadius: 4,
            fontFamily: 'var(--font-serif)',
            fontSize: '0.88rem',
            letterSpacing: '0.12em',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 8px 40px rgba(196,56,138,0.4)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Yes — I'm Ready to Break Free →
        </a>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            color: 'var(--pink-300)',
            marginTop: 40,
            position: 'relative',
            zIndex: 1,
          }}
        >
          "Uncover the Root. Release the Pattern. Rise into Yourself." ✦ 💛 ✦
        </p>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: '#0e0410',
          borderTop: '1px solid rgba(196,56,138,0.1)',
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--pink-200)',
            fontSize: '1rem',
            letterSpacing: '0.1em',
            marginBottom: 16,
          }}
        >
          ✦ Soul Awakening with Sapna Lamba
        </div>
        <div
          style={{
            display: 'flex',
            gap: 28,
            justifyContent: 'center',
            marginBottom: 24,
            flexWrap: 'wrap',
          }}
        >
          {[
            ['#about', 'The Work'],
            ['#story', "Sapna's Story"],
            ['#program', 'The Program'],
            ['#testimonials', 'Transformations'],
            ['#offer', 'Book Now'],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              style={{
                fontSize: '0.8rem',
                color: 'var(--ink-400)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--pink-200)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--ink-400)')
              }
            >
              {label}
            </a>
          ))}
        </div>
        <p style={{ fontSize: '0.75rem', color: 'rgba(155,107,142,0.45)' }}>
          © {new Date().getFullYear()} Sapna Lamba · Certified Akashic Record
          Reader · Life & Relationship Coach · Soul Healing Guide
        </p>
      </footer>

      {/* ── KEYFRAMES + RESPONSIVE OVERRIDES (global inject) ── */}
      <style>{`
        @keyframes shimmerStrip {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .nav-hamburger { display: none; }

        @media (max-width: 900px) {
          .grid-story { grid-template-columns: 1fr !important; gap: 48px !important; }
          .grid-compare { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
          .navbar { padding: 12px 16px !important; position: relative !important; }
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }

          .announce-strip { font-size: 0.65rem !important; padding: 9px 12px !important; letter-spacing: 0.06em !important; }

          .hero-section { min-height: auto !important; padding: 56px 18px 48px !important; }

          .trust-bar { padding: 20px 14px !important; }
          .trust-bar > div { gap: 18px !important; justify-content: flex-start !important; }

          .section-pad { padding-left: 18px !important; padding-right: 18px !important; padding-top: 64px !important; padding-bottom: 64px !important; }

          .story-quote-card { position: static !important; max-width: 100% !important; margin-top: -40px !important; margin-bottom: 8px !important; }

          .includes-card { padding: 32px 22px !important; }

          .guarantee-card { padding: 56px 26px !important; }
          .guarantee-badge { font-size: 0.6rem !important; padding: 7px 14px !important; }

          .offer-card-inner { padding: 36px 22px !important; }
          .price-box { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .price-divider { display: none !important; }
          .value-row { flex-wrap: wrap !important; }
          .value-row > div:first-child { font-size: 0.82rem !important; }
        }

        @media (max-width: 480px) {
          .hero-cta { padding: 15px 32px !important; font-size: 0.8rem !important; }
          .section-pad { padding-left: 14px !important; padding-right: 14px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </main>
  )
}
