import Razorpay from 'razorpay'

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export const PROGRAMS: Record<
  string,
  {
    name: string
    amount: number // in paise
    originalAmount: number
    description: string
  }
> = {
  '4-week': {
    name: 'Soul Blueprint Intensive',
    amount: 599900, // ₹5,999
    originalAmount: 2500000, // ₹25,000
    description: '4-Week 1:1 Akashic + Coaching Program',
  },
  '8-week': {
    name: 'Soul Awakening: Empowered You',
    amount: 5100000, // ₹51,000
    originalAmount: 5610000, // ₹56,100
    description: '8-Week Complete Transformation Journey',
  },
}
