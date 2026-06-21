'use client'

import { Divider, SectionLabel } from '@/components/website/Shared'

const NOTE_PARA_1 =
  'I believe healing should feel supported, safe, and compassionate. That is why I create a very safe emotional space for people — a space where they do not feel judged, alone, or misunderstood.'
const NOTE_PARA_2 =
  'Many people silently carry emotional pain for years because they feel nobody truly understands them. Through my sessions and coaching work, I try to provide hand-holding and guidance in a way where clients feel supported throughout their healing journey.'
const NOTE_PARA_3 =
  'For me, this work is deeply personal. Because the same journey that once helped me reconnect with myself, heal emotionally, and feel connected to my father beyond the physical world… is now helping me guide others towards their own healing and answers.'

export default function AboutPersonalNote(): React.JSX.Element {
  return (
    <section className='section-sm'>
      <Divider />
      <div className='mt-10 max-w-2xl mx-auto text-center space-y-4 animate-[fadeUp_0.55s_ease_forwards]'>
        <SectionLabel>A Personal Note</SectionLabel>
        <p className='text-sm text-ink-500 leading-relaxed font-light'>
          {NOTE_PARA_1}
        </p>
        <p className='text-sm text-ink-500 leading-relaxed font-light'>
          {NOTE_PARA_2}
        </p>
        <p className='text-sm text-ink-500 leading-relaxed font-light'>
          {NOTE_PARA_3}
        </p>
        <blockquote className='border border-rose-100 bg-bg-muted rounded-xl px-8 py-6 mt-6'>
          <p className='text-base italic text-ink-700 leading-relaxed font-serif'>
            &ldquo;Whether someone is struggling with relationships, emotional
            pain, fear, self-worth, confusion, or repeating life patterns — my
            intention is to help them move towards clarity, healing, emotional
            freedom, and empowerment.&rdquo;
          </p>
          <p className='text-xs text-ink-300 mt-3'>— Sapna Lamba</p>
        </blockquote>
      </div>
    </section>
  )
}
